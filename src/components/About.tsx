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
    title: 'Start here even if you are brand new.',
    body: 'You do not need hardware experience. We walk through the parts, the tools, and the basics before build time starts.',
  },
  {
    id: 'pace',
    command: 'LOAD_BUILD_ENERGY',
    title: 'A real build day, not a lecture day.',
    body: 'Expect short intros, guided build time, a PCB workshop, and space to ask questions while you are actually making things.',
  },
  {
    id: 'community',
    command: 'SYNC_DUBAI_SCENE',
    title: 'Built for Dubai teens who want to make things.',
    body: 'Dhruv and Aly are organizing it locally, Hack Club is funding it, and the goal is simple: help more people in Dubai get into hardware.',
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
  hidden: { opacity: 0, y: 23 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
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
            <p className={styles.kicker}>Teen-run // hardware-first // beginner-friendly</p>
            <h2 className={styles.title}>A free one-day hardware meetup for teens in Dubai.</h2>
            <p className={styles.lead}>
              Build Guild Dubai is part of Hack Club Blueprint&apos;s global Build Guilds week. You show up, learn the
              basics, build with other teens, and leave with a clearer idea of how hardware projects actually come
              together.
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
            Free to attend. Ages 13-18. Beginner welcome. Hack Club funded. Built to help more Dubai teens get into
            hardware.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default About;

