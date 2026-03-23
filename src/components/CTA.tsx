import { motion } from 'framer-motion';
import { EVENT_DATE_DISPLAY, EVENT_LOCATION, HC_URL, SIGNUP_URL, SLACK_CHANNEL } from '../data/constants';
import SectionLabel from './ui/SectionLabel';
import styles from './CTA.module.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: 'easeOut',
    },
  },
};

function CTA() {
  const slackUrl = `${HC_URL}/slack/`;

  return (
    <section id="rsvp" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.panel}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <div className={styles.decoration} aria-hidden="true">
            <span className={styles.traceHorizontal} />
            <span className={styles.traceVertical} />
            <span className={styles.traceNode} />
          </div>

          <motion.div className={styles.copy} variants={itemVariants}>
            <SectionLabel label="rsvp" />
            <h2 className={styles.title}>Ready to show up?</h2>
            <p className={styles.meta}>
              {EVENT_DATE_DISPLAY} · {EVENT_LOCATION} · Free
            </p>
          </motion.div>

          <motion.div className={styles.actions} variants={itemVariants}>
            <a href={SIGNUP_URL} className={styles.primaryAction} target="_blank" rel="noopener noreferrer">
              Sign Up — It&apos;s Free
            </a>
            <a href={slackUrl} className={styles.secondaryAction} target="_blank" rel="noopener noreferrer">
              &gt; /slack {SLACK_CHANNEL}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;
