import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { BLUEPRINT_LOGO } from '../data/constants';
import { useSignupModal } from '../context/SignupModal';
import styles from './Nav.module.css';

interface NavLink {
  id: 'about' | 'showcase' | 'schedule' | 'organizers' | 'merch' | 'faq' | 'rsvp';
  label: 'About' | 'Builds' | 'Schedule' | 'Organizers' | 'Merch' | 'FAQ' | 'RSVP';
}

const navLinks: NavLink[] = [
  { id: 'about', label: 'About' },
  { id: 'showcase', label: 'Builds' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'organizers', label: 'Organizers' },
  { id: 'merch', label: 'Merch' },
  { id: 'faq', label: 'FAQ' },
  { id: 'rsvp', label: 'RSVP' },
];

function Nav() {
  const { open } = useSignupModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [activeSection, setActiveSection] = useState<NavLink['id']>('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    const getMidpoint = () => window.innerHeight * 0.5;

    const updateActiveSection = () => {
      const viewportMidpoint = getMidpoint();
      const candidates = sections
        .map((section) => {
          const bounds = section.getBoundingClientRect();
          const sectionMidpoint = bounds.top + bounds.height / 2;

          return {
            id: section.id as NavLink['id'],
            coversMidpoint: bounds.top <= viewportMidpoint && bounds.bottom >= viewportMidpoint,
            distanceFromMidpoint: Math.abs(sectionMidpoint - viewportMidpoint),
            visible: bounds.bottom > 0 && bounds.top < window.innerHeight,
          };
        })
        .filter((candidate) => candidate.visible)
        .sort((leftCandidate, rightCandidate) => {
          if (leftCandidate.coversMidpoint !== rightCandidate.coversMidpoint) {
            return leftCandidate.coversMidpoint ? -1 : 1;
          }

          return leftCandidate.distanceFromMidpoint - rightCandidate.distanceFromMidpoint;
        });

      const nextSection = candidates[0]?.id;

      if (nextSection) {
        setActiveSection(nextSection);
      }
    };

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    });

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const navClassName = [styles.nav, scrolled ? styles.navScrolled : '', mobileOpen ? styles.navOpen : '']
    .filter(Boolean)
    .join(' ');

  const linkItems = useMemo(
    () =>
      navLinks.map((link) => (
        <li key={link.id} className={styles.listItem}>
          <a
            href={`#${link.id}`}
            className={`${styles.link} ${activeSection === link.id ? styles.linkActive : ''}`}
            aria-current={activeSection === link.id ? 'page' : undefined}
            onClick={(event) => handleAnchorClick(event, link.id)}
          >
            {link.label}
          </a>
        </li>
      )),
    [activeSection],
  );

  function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>, targetId: string) {
    event.preventDefault();
    setMobileOpen(false);

    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  function handleHomeClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setMobileOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function handleOpenSignup() {
    setMobileOpen(false);
    open();
  }

  return (
    <>
      <header className={navClassName}>
        <div className={styles.inner}>
          <a href="#top" className={styles.brand} onClick={handleHomeClick} aria-label="Back to top">
            {!logoFailed ? (
              <img
                src={BLUEPRINT_LOGO}
                alt="Blueprint"
                className={styles.logo}
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <span className={styles.brandFallback}>Blueprint × Dubai</span>
            )}
          </a>

          <nav className={styles.desktopNav} aria-label="Primary">
            <ul className={styles.list}>{linkItems}</ul>
            <button type="button" className={styles.cta} onClick={handleOpenSignup}>
              Sign Up
            </button>
          </nav>

          <button
            type="button"
            className={styles.hamburger}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((currentValue) => !currentValue)}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </header>

      <button
        type="button"
        className={`${styles.overlay} ${mobileOpen ? styles.overlayVisible : ''}`}
        aria-label="Close mobile navigation"
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ''}`} aria-hidden={!mobileOpen}>
        <nav className={styles.mobileNav} aria-label="Mobile primary">
          <p className={styles.drawerLabel}>[ SYS://NAVIGATION ]</p>
          <ul className={styles.mobileList}>{linkItems}</ul>
          <button type="button" className={`${styles.cta} ${styles.mobileCta}`} onClick={handleOpenSignup}>
            Sign Up
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Nav;
