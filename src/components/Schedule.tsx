import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { scheduleItems } from '../data/schedule';
import Card from './ui/Card';
import SectionLabel from './ui/SectionLabel';
import styles from './Schedule.module.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: 'easeOut',
    },
  },
};

function Schedule() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.82', 'end 0.28'],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="schedule" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SectionLabel label="schedule" />
          </motion.div>
          <motion.h2 className={styles.title} variants={itemVariants}>
            What we&apos;re actually doing all day.
          </motion.h2>
          <motion.p className={styles.lead} variants={itemVariants}>
            This is the core of the event: fast context, build time, PCB design, demos from other teens, and real next
            steps once the day is over.
          </motion.p>
        </motion.div>

        <div className={styles.timeline}>
          <div className={styles.railColumn} aria-hidden="true">
            <div className={styles.railBase} />
            <motion.div className={styles.railActive} style={{ scaleY: railScale }} />
          </div>

          <motion.div
            className={styles.items}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            {scheduleItems.map((item) => (
              <motion.article key={`${item.time}-${item.title}`} className={styles.item} variants={itemVariants}>
                <div className={styles.markerColumn}>
                  <span className={`${styles.dot} ${item.highlight ? styles.dotHighlight : ''}`} />
                </div>

                <div className={styles.contentColumn}>
                  <p className={styles.time}>{item.time}</p>
                  <Card className={styles.card} highlight={item.highlight}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      {item.highlight ? <span className={styles.flag}>KEY</span> : null}
                    </div>
                    <p className={styles.cardBody}>{item.description}</p>
                  </Card>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <p className={styles.note}>Schedule subject to change — exact timings confirmed closer to the event.</p>
      </div>
    </section>
  );
}

export default Schedule;
