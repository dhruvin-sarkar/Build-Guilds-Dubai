import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { organizers } from '../data/organizers';
import Card from './ui/Card';
import SectionLabel from './ui/SectionLabel';
import styles from './Organizers.module.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

function Organizers() {
  const getAvatarStyle = (avatarColor: string): CSSProperties & Record<'--avatar-color', string> => ({
    '--avatar-color': avatarColor,
  });

  return (
    <section id="organizers" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SectionLabel label="team" />
          </motion.div>
          <motion.h2 className={styles.title} variants={itemVariants}>
            Built by people who actually care about this city&apos;s hardware scene.
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {organizers.map((organizer) => (
            <motion.div key={organizer.name} variants={itemVariants}>
              <Card className={styles.card}>
                <div className={styles.avatarRow}>
                  <div
                    className={styles.avatar}
                    style={getAvatarStyle(organizer.avatarColor)}
                    aria-hidden="true"
                  >
                    <span className={styles.avatarInitial}>{organizer.initials}</span>
                  </div>
                  <div className={styles.identity}>
                    <h3 className={styles.name}>{organizer.name}</h3>
                    <p className={styles.role}>{organizer.role}</p>
                  </div>
                </div>

                <p className={styles.bio}>{organizer.bio}</p>
                <a href={organizer.slackHandle} className={styles.slackLink}>
                  &gt; /slack {organizer.slackHandle}
                </a>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Organizers;
