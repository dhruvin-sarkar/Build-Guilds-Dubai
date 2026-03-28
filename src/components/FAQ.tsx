import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { eventPacketIntro, eventPacketItems } from '../data/eventPacket';
import { faqItems } from '../data/faq';
import styles from './FAQ.module.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: 'easeOut',
    },
  },
};

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [packetOpen, setPacketOpen] = useState(true);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.h2 className={styles.title} variants={itemVariants}>
            YOUR QUESTIONS, ANSWERED.
          </motion.h2>
          <motion.p className={styles.lead} variants={itemVariants}>
            Still curious? Reach out to dubai@blueprint.hackclub.com!
          </motion.p>
        </motion.div>

        <motion.article
          className={`${styles.packetItem} ${packetOpen ? styles.itemOpen : ''}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
        >
          <button
            type="button"
            className={styles.trigger}
            aria-expanded={packetOpen}
            onClick={() => setPacketOpen((currentValue) => !currentValue)}
          >
            <span className={styles.question}>What should I bring? How should I show up?</span>
            <span className={styles.icon}>{packetOpen ? '[-]' : '[+]'}</span>
          </button>

          <AnimatePresence initial={false}>
            {packetOpen ? (
              <motion.div
                className={styles.answerWrap}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <div className={styles.packetContent}>
                  <div className={styles.packetHeader}>
                    <p className={styles.packetMeta}>Bench brief // how the room is wired for the day</p>
                  </div>
                  <p className={styles.packetIntro}>{eventPacketIntro}</p>
                  <div className={styles.packetReadouts}>
                    {eventPacketItems.map((item) => (
                      <div key={item.label} className={styles.packetReadout}>
                        <p className={styles.packetReadoutLabel}>{item.label}</p>
                        <p className={styles.packetReadoutValue}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.article>

        <motion.div
          className={styles.list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.article
                key={item.question}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
                variants={itemVariants}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex((currentValue) => (currentValue === index ? null : index))}
                >
                  <span className={styles.question}>{item.question}</span>
                  <span className={styles.icon}>{isOpen ? '[-]' : '[+]'}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      className={styles.answerWrap}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                    >
                      <p className={styles.answer}>{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
