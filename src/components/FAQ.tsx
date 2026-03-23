import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { faqItems } from '../data/faq';
import SectionLabel from './ui/SectionLabel';
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

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
          <motion.div variants={itemVariants}>
            <SectionLabel label="faq" />
          </motion.div>
          <motion.h2 className={styles.title} variants={itemVariants}>
            The practical questions, answered.
          </motion.h2>
          <motion.p className={styles.lead} variants={itemVariants}>
            Travel light, ask the obvious questions, and show up curious — here’s the rest of the pre-flight check.
          </motion.p>
        </motion.div>

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
