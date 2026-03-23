import { motion } from 'framer-motion';
import { EVENT_DATE, EVENT_DATE_DISPLAY, EVENT_LOCATION, EVENT_TIME, EVENT_VENUE } from '../data/constants';
import { useSignupModal } from '../context/SignupModal';
import Card from './ui/Card';
import Countdown from './ui/Countdown';
import SectionLabel from './ui/SectionLabel';
import styles from './Hero.module.css';

const heroFacts = [EVENT_DATE_DISPLAY, EVENT_TIME, EVENT_LOCATION, `Venue ${EVENT_VENUE}`];

const labReadouts = [
  {
    label: 'Toolchain',
    value: 'EasyEDA // KiCad // firmware paths',
  },
  {
    label: 'Bench mix',
    value: 'Beginners, shipped builders, and everyone in between',
  },
  {
    label: 'What to bring',
    value: 'Laptop optional // projects welcome // curiosity required',
  },
];

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
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
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
              We&apos;re designing this like a real bench day: parts on the table, signal paths explained, show-and-tell
              from teens already shipping, and enough room for complete beginners to start without feeling behind.
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
                Start Signup Intake
              </button>
              <button type="button" className={styles.secondaryAction} onClick={open}>
                Reserve Your Bench
              </button>
            </div>
          </motion.div>

          <motion.div className={styles.aside} variants={itemVariants}>
            <Card className={styles.panel}>
              <div className={styles.panelHeader}>
                <SectionLabel label="event packet" />
                <p className={styles.panelMeta}>Bench notes // what this day is calibrated for</p>
              </div>

              <div className={styles.readouts}>
                {labReadouts.map((readout) => (
                  <div key={readout.label} className={styles.readout}>
                    <p className={styles.readoutLabel}>{readout.label}</p>
                    <p className={styles.readoutValue}>{readout.value}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={styles.countdownFrame}>
              <div className={styles.countdownHeader}>
                <SectionLabel label="bench timer" />
                <p className={styles.countdownMeta}>Signal-up to April 18, 2026</p>
              </div>
              <Countdown targetDate={EVENT_DATE} className={styles.countdown} />
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
