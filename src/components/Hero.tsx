import { motion } from 'framer-motion';
import { EVENT_DATE, EVENT_DATE_DISPLAY, EVENT_LOCATION, EVENT_TIME, EVENT_VENUE } from '../data/constants';
import { useSignupModal } from '../context/SignupModal';
import Countdown from './ui/Countdown';
import SectionLabel from './ui/SectionLabel';
import styles from './Hero.module.css';

const heroFacts = [EVENT_DATE_DISPLAY, EVENT_TIME, EVENT_LOCATION, `Venue ${EVENT_VENUE}`];

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
        <motion.div className={styles.grid} initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className={styles.copy} variants={itemVariants}>
            <SectionLabel label="build guild dubai" />
            <p className={styles.kicker}>Teen-run // hardware-first // free to attend</p>
            <h1 className={styles.title}>Build Guild Dubai</h1>
            <p className={styles.subline}>
              A one-day hardware meetup for PCB routing, component bring-up, firmware curiosity, and actually meeting
              the people building in Dubai instead of just hearing about them online.
            </p>
            <p className={styles.support}>
              We&apos;re designing this like a real bench day: parts on the table, signal paths explained, schematic
              notes turned into actual traces, show-and-tell from teens already shipping, and enough room for complete
              beginners to probe, ask, and start without feeling behind.
            </p>

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
                <SectionLabel label="bench timer" />
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
