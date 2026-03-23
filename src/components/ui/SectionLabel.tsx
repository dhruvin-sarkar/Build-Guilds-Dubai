import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  label: string;
  className?: string;
}

function SectionLabel({ label, className }: SectionLabelProps) {
  const normalizedLabel = label.trim().toUpperCase().replace(/\s+/g, '_');
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <span className={styles.text}>[ SYS://{normalizedLabel} ]</span>
      <span className={styles.line} aria-hidden="true" />
    </div>
  );
}

export default SectionLabel;
