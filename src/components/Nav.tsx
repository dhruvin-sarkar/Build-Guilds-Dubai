import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BLUEPRINT_LOGO, SIGNUP_URL } from '../data/constants';
import styles from './Nav.module.css';

interface NavLink {
  id: 'about' | 'builds' | 'schedule' | 'organizers' | 'faq';
  label: 'About' | 'Builds' | 'Schedule' | 'Organizers' | 'FAQ';
  kind: 'section' | 'route';
}

const navLinks: NavLink[] = [
  { id: 'about', label: 'About', kind: 'section' },
  { id: 'schedule', label: 'Schedule', kind: 'section' },
  { id: 'organizers', label: 'Organizers', kind: 'section' },
  { id: 'faq', label: 'FAQ', kind: 'section' },
  { id: 'builds', label: 'Builds', kind: 'route' },
];

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [activeSection, setActiveSection] = useState<NavLink['id']>(location.pathname === '/builds' ? 'builds' : 'about');

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
    if (location.pathname === '/builds') {
      setActiveSection('builds');
      return;
    }

    setActiveSection('about');
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const sections = navLinks
      .filter((link) => link.kind === 'section')
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
            id: section.id as Exclude<NavLink['id'], 'builds'>,
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
  }, [location.pathname]);

  const navClassName = [styles.nav, scrolled ? styles.navScrolled : '', mobileOpen ? styles.navOpen : '']
    .filter(Boolean)
    .join(' ');

  const linkItems = useMemo(
    () =>
      navLinks.map((link) => (
        <li key={link.id} className={styles.listItem}>
          <a
            href={link.kind === 'route' ? '/builds' : `#${link.id}`}
            className={`${styles.link} ${activeSection === link.id ? styles.linkActive : ''}`}
            aria-current={activeSection === link.id ? 'page' : undefined}
            onClick={(event) => handleNavClick(event, link)}
          >
            {link.label}
          </a>
        </li>
      )),
    [activeSection, location.pathname],
  );

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, link: NavLink) {
    event.preventDefault();
    setMobileOpen(false);

    if (link.kind === 'route') {
      navigate('/builds');
      return;
    }

    if (location.pathname !== '/') {
      navigate({
        pathname: '/',
        hash: `#${link.id}`,
      });
      return;
    }

    const targetElement = document.getElementById(link.id);

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

    if (location.pathname !== '/') {
      navigate('/');
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
            <a href={SIGNUP_URL} className={styles.cta}>
              Sign Up
            </a>
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
          <ul className={styles.mobileList}>{linkItems}</ul>
          <a href={SIGNUP_URL} className={`${styles.cta} ${styles.mobileCta}`} onClick={() => setMobileOpen(false)}>
            Sign Up
          </a>
        </nav>
      </aside>
    </>
  );
}

export default Nav;
