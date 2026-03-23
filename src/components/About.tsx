import { motion } from 'framer-motion';
import SectionLabel from './ui/SectionLabel';
import styles from './About.module.css';

interface AboutStrip {
  id: string;
  command: string;
  title: string;
  body: string;
}

const aboutStrips: AboutStrip[] = [
  {
    id: 'beginner',
    command: 'BOOT_BEGINNER_PATH',
    title: 'Start here even if you have never touched hardware.',
    body: 'The whole day is structured so complete beginners can walk in cold, understand what the parts on the table actually do, and leave having built something real instead of just watching demos.',
  },
  {
    id: 'pace',
    command: 'LOAD_BUILD_ENERGY',
    title: 'Fast, hands-on, and built around actual making.',
    body: 'This is not a corporate workshop and it is not a lecture marathon. You get crash courses, guided build time, PCB design, show and tell, and enough room to go off-script if you already ship projects.',
  },
  {
    id: 'community',
    command: 'SYNC_DUBAI_SCENE',
    title: 'Organized by people who genuinely care about Dubai builders.',
    body: 'Dhruv and Aly put this together from real community context: a mix of first-timers and teens who already ship. Hack Club funds the day, keeps it free, and gives everyone a real on-ramp into Blueprint and hardware after the event.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: 'easeOut',
    },
  },
};

function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className={styles.statColumn} variants={itemVariants}>
            <SectionLabel label="overview" />
            <div className={styles.statFrame}>
              <p className={styles.statEyebrow}>Global Build Guilds Week</p>
              <p className={styles.statValue}>100+</p>
              <p className={styles.statCaption}>cities building in the same week</p>
            </div>
          </motion.div>

          <motion.div className={styles.copyColumn} variants={itemVariants}>
            <p className={styles.kicker}>Teen-run // hardware-first // free to attend</p>
            <h2 className={styles.title}>What Build Guild looks like when the local scene actually means it.</h2>
            <p className={styles.lead}>
              Build Guild Dubai is a one-day hardware meetup inside Hack Club Blueprint&apos;s global week of teen-run
              events. It&apos;s for people who are circuit-curious, people who already ship things, and everyone in
              between.
            </p>
            <p className={styles.lead}>
              No venue cosplay. No paywall. No &quot;maybe someday&quot; energy. Just a free day to learn hardware, design a
              PCB, meet other builders, and figure out what you want to make next.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.stripList}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {aboutStrips.map((strip, index) => (
            <motion.article key={strip.id} className={styles.strip} variants={itemVariants}>
              <div className={styles.stripIndex}>0{index + 1}</div>
              <div className={styles.stripCommand}>{strip.command}</div>
              <div className={styles.stripBody}>
                <h3 className={styles.stripTitle}>{strip.title}</h3>
                <p className={styles.stripText}>{strip.body}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className={styles.footerReadout}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
        >
          <span className={styles.footerPrompt}>&gt; SYS_STATUS</span>
          <p className={styles.footerText}>
            Free to attend. Beginner welcome. Ages 13-18. Hack Club funded. Blueprint-connected. Built for the actual
            Dubai teen maker community.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
