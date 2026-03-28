import { motion } from 'framer-motion';
import { EVENT_DATE_DISPLAY, EVENT_LOCATION, HC_URL, SLACK_CHANNEL } from '../data/constants';
import { useSignupModal } from '../context/SignupModal';
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
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: 'easeOut',
    },
  },
};

function CTA() {
  const { open } = useSignupModal();
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
          <motion.div className={styles.copy} variants={itemVariants}>
            <h2 className={styles.title}>Ready to join the Guild?</h2>
            <p className={styles.meta}>
              {EVENT_DATE_DISPLAY} // {EVENT_LOCATION} // Free
            </p>
          <p className={styles.support}>
            If you want a real day of parts, traces, PCB workshop time, and people who can help you get from idea to
            first board spin, first firmware flash, or first working prototype, this is your sign to register.
          </p>
          </motion.div>

          <motion.div className={styles.actions} variants={itemVariants}>
            <button type="button" className={styles.primaryAction} onClick={open}>
              Reserve Your Bench Now
            </button>
            <a href={slackUrl} className={styles.secondaryAction} target="_blank" rel="noopener noreferrer">
              Join Slack // {SLACK_CHANNEL}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;
