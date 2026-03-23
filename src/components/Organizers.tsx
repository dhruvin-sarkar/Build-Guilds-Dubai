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
            Organized by people building this for the actual Dubai community.
          </motion.h2>
          <motion.p className={styles.lead} variants={itemVariants}>
            Dhruv and Aly are shaping this like the kind of hardware day they would want to attend themselves:
            practical, welcoming, and genuinely worth clearing a Saturday for.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {organizers.map((organizer) => (
            <motion.a
              key={organizer.name}
              href={organizer.profileUrl}
              className={styles.linkCard}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${organizer.name}'s profile`}
              variants={itemVariants}
            >
              <Card className={styles.card}>
                <div className={styles.avatarRow}>
                  {organizer.photoUrl ? (
                    <img
                      src={organizer.photoUrl}
                      alt={organizer.name}
                      className={styles.avatarImage}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.avatar} style={getAvatarStyle(organizer.avatarColor)} aria-hidden="true">
                      <span className={styles.avatarInitial}>{organizer.initials}</span>
                    </div>
                  )}

                  <div className={styles.identity}>
                    <h3 className={styles.name}>{organizer.name}</h3>
                    <p className={styles.role}>{organizer.role}</p>
                    <p className={styles.profileLink}>&gt; /profile {organizer.profileLabel}</p>
                  </div>
                </div>

                <p className={styles.bio}>{organizer.bio}</p>
              </Card>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Organizers;
