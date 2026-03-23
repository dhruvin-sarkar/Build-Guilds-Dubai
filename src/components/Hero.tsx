import { motion } from 'framer-motion';
import { EVENT_DATE, EVENT_DATE_DISPLAY, EVENT_LOCATION, EVENT_TIME, EVENT_VENUE, SIGNUP_URL } from '../data/constants';
import Card from './ui/Card';
import CircuitSVG from './ui/CircuitSVG';
import Countdown from './ui/Countdown';
import SectionLabel from './ui/SectionLabel';
import styles from './Hero.module.css';

const heroFacts = [
  EVENT_DATE_DISPLAY,
  EVENT_TIME,
  EVENT_LOCATION,
  `Venue ${EVENT_VENUE}`,
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
};

function Hero() {
  const scrollToSchedule = () => {
    const scheduleSection = document.getElementById('schedule');

    if (!scheduleSection) {
      return;
    }

    scheduleSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>
        <motion.div
          className={styles.grid}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className={styles.copy} variants={itemVariants}>
            <SectionLabel label="build guild dubai" />
            <h1 className={styles.title}>Build Guild Dubai</h1>
            <p className={styles.subline}>
              Dubai&apos;s hardware community. One day. Circuits, components, and a whole lot of building.
            </p>
            <div className={styles.facts}>
              {heroFacts.map((fact) => (
                <span key={fact} className={styles.factChip}>
                  {fact}
                </span>
              ))}
            </div>
            <div className={styles.actions}>
              <a href={SIGNUP_URL} className={styles.primaryAction} target="_blank" rel="noopener noreferrer">
                Sign Up
              </a>
              <button type="button" className={styles.secondaryAction} onClick={scrollToSchedule}>
                What&apos;s the plan?
              </button>
            </div>
          </motion.div>

          <motion.div className={styles.visual} variants={itemVariants}>
            <Card highlight className={styles.visualFrame}>
              <SectionLabel label="live pcb" />
              <CircuitSVG animate />
            </Card>
          </motion.div>

          <motion.div className={styles.countdownPanel} variants={itemVariants}>
            <Card className={styles.countdownFrame}>
              <SectionLabel label="countdown" />
              <div className={styles.countdownWrap}>
                <Countdown targetDate={EVENT_DATE} />
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
