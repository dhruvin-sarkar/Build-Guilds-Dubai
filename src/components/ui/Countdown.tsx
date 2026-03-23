import { Fragment } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import styles from './Countdown.module.css';

interface CountdownProps {
  targetDate: string;
  className?: string;
}

type CountdownUnit = {
  key: 'days' | 'hours' | 'minutes' | 'seconds';
  label: 'DAYS' | 'HRS' | 'MIN' | 'SEC';
};

const countdownUnits: CountdownUnit[] = [
  { key: 'days', label: 'DAYS' },
  { key: 'hours', label: 'HRS' },
  { key: 'minutes', label: 'MIN' },
  { key: 'seconds', label: 'SEC' },
];

function Countdown({ targetDate, className }: CountdownProps) {
  const countdown = useCountdown(targetDate);
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes} aria-label="Countdown to Build Guild Dubai">
      {countdownUnits.map((unit, index) => {
        const value = String(countdown[unit.key]).padStart(2, '0');
        const isSeconds = unit.key === 'seconds';

        return (
          <Fragment key={unit.key}>
            <article className={`${styles.unit} ${isSeconds ? styles.unitSeconds : ''}`}>
              <span className={styles.value}>{value}</span>
              <span className={styles.label}>{unit.label}</span>
            </article>
            {index < countdownUnits.length - 1 ? (
              <span className={styles.separator} aria-hidden="true">
                //
              </span>
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}

export default Countdown;
