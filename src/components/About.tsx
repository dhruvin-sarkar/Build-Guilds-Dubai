import { motion } from 'framer-motion';
import styles from './About.module.css';

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
            <div className={styles.statFrame}>
              <p className={styles.statEyebrow}>Global Build Guilds Week</p>
              <p className={styles.statValue}>100+</p>
              <p className={styles.statCaption}>cities building in the same week</p>
            </div>
          </motion.div>

          <motion.div className={styles.copyColumn} variants={itemVariants}>
            <h2 className={styles.title}>WHAT IS THIS</h2>
            <p className={styles.lead}>
              Build Guild Dubai is part of Hack Club Blueprint&apos;s global Build Guilds week. Show up, learn the
              basics, build with other teens, and (hopefully) leave with a newly-discovered passion for hardware!
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.footerReadout}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
        >
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

