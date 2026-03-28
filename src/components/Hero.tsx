import { motion } from 'framer-motion';
import { EVENT_DATE, EVENT_DATE_DISPLAY, EVENT_LOCATION, EVENT_TIME, EVENT_VENUE } from '../data/constants';
import { useSignupModal } from '../context/SignupModal';
import Card from './ui/Card';
import Countdown from './ui/Countdown';
import SectionLabel from './ui/SectionLabel';
import styles from './Hero.module.css';

const heroFacts = [EVENT_DATE_DISPLAY, EVENT_TIME, EVENT_LOCATION, `Venue ${EVENT_VENUE}`];

const eventPacketItems = [
  {
    label: 'Bench mix',
    value: 'Beginners, return builders, and people already carrying half-routed boards or half-flashed ideas.',
  },
  {
    label: 'Bring list',
    value: 'Laptop optional // dev boards and hardware demos welcome // questions about parts, traces, or firmware encouraged.',
  },
  {
    label: 'After today',
    value: 'Blueprint, Hackpad, and next-step project routes once the bench supply clicks off.',
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

          <motion.div className={styles.packetColumn} variants={itemVariants}>
            <Card className={styles.panel}>
              <div className={styles.panelHeader}>
                <SectionLabel label="event packet" />
                <p className={styles.panelMeta}>Bench brief // how the room is wired for the day</p>
              </div>

              <div className={styles.readouts}>
                {eventPacketItems.map((item) => (
                  <div key={item.label} className={styles.readout}>
                    <p className={styles.readoutLabel}>{item.label}</p>
                    <p className={styles.readoutValue}>{item.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.countdownWrap}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className={styles.countdownFrame}>
              <div className={styles.countdownHeader}>
                <SectionLabel label="bench timer" />
                <p className={styles.countdownMeta}>SIGNAL-UP TO APRIL 18, 2026</p>
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
