import { type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BLUEPRINT_URL, EVENT_DATE_DISPLAY, EVENT_LOCATION, HC_URL, SLACK_CHANNEL } from '../data/constants';
import styles from './Footer.module.css';

interface FooterLink {
  id: 'about' | 'builds' | 'schedule' | 'organizers' | 'faq' | 'rsvp';
  label: string;
  kind: 'section' | 'route';
}

interface ExternalLink {
  href: string;
  label: string;
}

const footerLinks: FooterLink[] = [
  { id: 'about', label: 'About', kind: 'section' },
  { id: 'builds', label: 'Builds', kind: 'route' },
  { id: 'schedule', label: 'Schedule', kind: 'section' },
  { id: 'organizers', label: 'Organizers', kind: 'section' },
  { id: 'faq', label: 'FAQ', kind: 'section' },
  { id: 'rsvp', label: 'RSVP', kind: 'section' },
];

const slackUrl = `${HC_URL}/slack/`;

const externalLinks: ExternalLink[] = [
  { href: HC_URL, label: 'Hack Club' },
  { href: BLUEPRINT_URL, label: 'Blueprint' },
  { href: slackUrl, label: 'Slack' },
  { href: slackUrl, label: SLACK_CHANNEL },
];

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>, link: FooterLink) {
    event.preventDefault();

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

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.summary}>
          <p className={styles.title}>Made with {'\u2764\uFE0E'} by @Dhruv</p>
          <p className={styles.summaryText}>Brought to you 100% for teens, by teens. Made possible thanks to Hack Club.</p>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a
              key={link.id}
              href={link.kind === 'route' ? '/builds' : `#${link.id}`}
              className={styles.navLink}
              onClick={(event) => handleLinkClick(event, link)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.externalLinks}>
          {externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.externalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className={styles.metaRow}>
        <p className={styles.meta}>
          {EVENT_DATE_DISPLAY} // {EVENT_LOCATION}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
