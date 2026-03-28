import { motion } from 'framer-motion';
import Card from './ui/Card';
import SectionLabel from './ui/SectionLabel';
import styles from './Merch.module.css';

interface MerchItem {
  id: string;
  label: string;
  title: string;
  caption: string;
}

const merchItems: MerchItem[] = [
  {
    id: 'stickers',
    label: 'Sticker sheet',
    title: 'Stickers',
    caption: 'Logo marks, board traces, and Dubai build motifs. Placeholder art goes here.',
  },
  {
    id: 'posters',
    label: 'Poster layout',
    title: 'Posters',
    caption: 'Event posters, bench diagrams, and printable announcements for the run-up to April 18.',
  },
  {
    id: 'event-art',
    label: 'Art drop',
    title: 'Event Art',
    caption: 'Illustrations, lockups, and visual extras for merch, stage graphics, and oscilloscope-adjacent promo assets.',
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

function Merch() {
  return (
    <section id="merch" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SectionLabel label="merch" />
          </motion.div>
          <motion.h2 className={styles.title} variants={itemVariants}>
            Designed for Build Guild Dubai.
          </motion.h2>
          <motion.p className={styles.lead} variants={itemVariants}>
            Stickers, posters, and more — dropping closer to the event.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {merchItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className={styles.card}>
                <div className={styles.media}>
                  <span className={styles.mediaLabel}>{item.label}</span>
                  <span className={styles.mediaPlaceholder}>Placeholder</span>
                </div>
                <div className={styles.copy}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardCaption}>{item.caption}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Merch;
