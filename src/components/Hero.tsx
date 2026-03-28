import { motion } from 'framer-motion';
import { BLUEPRINT_LOGO, EVENT_DATE, EVENT_DATE_DISPLAY, EVENT_LOCATION, EVENT_TIME, EVENT_VENUE } from '../data/constants';
import { useSignupModal } from '../context/SignupModal';
import Countdown from './ui/Countdown';
import SectionLabel from './ui/SectionLabel';
import styles from './Hero.module.css';

const heroSignals = ['100% Free', 'Ages 13-18', EVENT_LOCATION];
const heroFacts = [EVENT_DATE_DISPLAY, EVENT_TIME, `Venue ${EVENT_VENUE}`];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.16,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 21 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: 'easeOut',
    },
  },
};

function Hero() {
  const { open } = useSignupModal();

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>
        <motion.div className={styles.heroBody} initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className={styles.brandLockup} variants={itemVariants}>
            <img src={BLUEPRINT_LOGO} alt="Blueprint" className={styles.brandLogo} />
            <p className={styles.brandMeta}>Hack Club Blueprint presents</p>
          </motion.div>

          <motion.div className={styles.copy} variants={itemVariants}>
            <h1 className={styles.title}>Build Guild Dubai</h1>
            <p className={styles.subline}>
              A one-day hardware meetup in Dubai for teens who want to learn real components, build real boards, and
              meet the local scene actually shipping things.
            </p>
          </motion.div>

          <motion.div className={styles.signalRow} variants={itemVariants}>
            {heroSignals.map((signal) => (
              <span key={signal} className={styles.signalChip}>
                {signal}
              </span>
            ))}
          </motion.div>

          <motion.div className={styles.metaBlock} variants={itemVariants}>
            <div className={styles.facts}>
              {heroFacts.map((fact) => (
                <span key={fact} className={styles.factChip}>
                  {fact}
                </span>
              ))}
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.primaryAction} onClick={open}>
                Reserve Your Bench Now
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.countdownWrap}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className={styles.countdownFrame}>
              <div className={styles.countdownHeader}>
                <SectionLabel label="bench timer" className={styles.countdownLabel} />
                <p className={styles.countdownMeta}>SIGNAL-UP TO APRIL 18, 2026</p>
              </div>
              <Countdown targetDate={EVENT_DATE} className={styles.countdown} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;

