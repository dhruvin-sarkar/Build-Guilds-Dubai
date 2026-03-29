import { motion } from 'framer-motion';
import { BLUEPRINT_LOGO, EVENT_DATE, EVENT_DATE_DISPLAY, EVENT_VENUE, SIGNUP_URL } from '../data/constants';
import Countdown from './ui/Countdown';
import styles from './Hero.module.css';

const heroFacts = [EVENT_DATE_DISPLAY, 'Ages 13 - 18', `Venue ${EVENT_VENUE}`];

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
              Free in-person hardware meetup for high schoolers in Dubai. Join us for a day of workshops,
              tinkering, and socialising! (free food & snacks included)
            </p>
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
              <a href={SIGNUP_URL} className={styles.primaryAction}>
                Reserve Your Bench Now
              </a>
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
