import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { BLUEPRINT_LOGO, SIGNUP_URL } from '../data/constants';
import styles from './Nav.module.css';

interface NavLink {
  id: 'about' | 'schedule' | 'organizers' | 'faq';
  label: 'About' | 'Schedule' | 'Organizers' | 'FAQ';
}

const navLinks: NavLink[] = [
  { id: 'about', label: 'About' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'organizers', label: 'Organizers' },
  { id: 'faq', label: 'FAQ' },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

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

  const navClassName = [styles.nav, scrolled ? styles.navScrolled : '', mobileOpen ? styles.navOpen : '']
    .filter(Boolean)
    .join(' ');

  const linkItems = useMemo(
    () =>
      navLinks.map((link) => (
        <li key={link.id} className={styles.listItem}>
          <a href={`#${link.id}`} className={styles.link} onClick={(event) => handleAnchorClick(event, link.id)}>
            {link.label}
          </a>
        </li>
      )),
    [],
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
            ) : null}
            <span className={`${styles.brandText} ${!logoFailed ? styles.brandTextHidden : ''}`}>
              Blueprint × Dubai
            </span>
          </a>

          <nav className={styles.desktopNav} aria-label="Primary">
            <ul className={styles.list}>{linkItems}</ul>
            <a
              href={SIGNUP_URL}
              className={styles.cta}
              target="_blank"
              rel="noopener noreferrer"
            >
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
          <p className={styles.drawerLabel}>[ SYS://NAVIGATION ]</p>
          <ul className={styles.mobileList}>{linkItems}</ul>
          <a
            href={SIGNUP_URL}
            className={`${styles.cta} ${styles.mobileCta}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
          >
            Sign Up
          </a>
        </nav>
      </aside>
    </>
  );
}

export default Nav;
