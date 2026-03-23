import { type MouseEvent } from 'react';
import { BLUEPRINT_URL, EVENT_DATE_DISPLAY, EVENT_LOCATION, HC_URL, SLACK_CHANNEL } from '../data/constants';
import styles from './Footer.module.css';

interface FooterLink {
  id: 'about' | 'schedule' | 'organizers' | 'faq' | 'rsvp';
  label: string;
}

interface ExternalLink {
  href: string;
  label: string;
}

const footerLinks: FooterLink[] = [
  { id: 'about', label: 'About' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'organizers', label: 'Organizers' },
  { id: 'faq', label: 'FAQ' },
  { id: 'rsvp', label: 'RSVP' },
];

const slackUrl = `${HC_URL}/slack/`;

const externalLinks: ExternalLink[] = [
  { href: HC_URL, label: 'Hack Club' },
  { href: BLUEPRINT_URL, label: 'Blueprint' },
  { href: slackUrl, label: 'Slack' },
  { href: slackUrl, label: SLACK_CHANNEL },
];

function Footer() {
  function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>, targetId: FooterLink['id']) {
    event.preventDefault();

    const targetElement = document.getElementById(targetId);

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
          <p className={styles.label}>[ SYS://FOOTER ]</p>
          <p className={styles.title}>Build Guild Dubai // A Hack Club Blueprint Event</p>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={styles.navLink}
              onClick={(event) => handleAnchorClick(event, link.id)}
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
        <p className={styles.meta}>{EVENT_DATE_DISPLAY} · {EVENT_LOCATION}</p>
      </div>
    </footer>
  );
}

export default Footer;
