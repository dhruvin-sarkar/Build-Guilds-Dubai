import { useEffect, useState } from 'react';

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = SECOND_IN_MS * 60;
const HOUR_IN_MS = MINUTE_IN_MS * 60;
const DAY_IN_MS = HOUR_IN_MS * 24;

function getCountdownValue(targetDate: string): CountdownValue {
  const remainingTime = new Date(targetDate).getTime() - Date.now();

  if (remainingTime <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    };
  }

  return {
    days: Math.floor(remainingTime / DAY_IN_MS),
    hours: Math.floor((remainingTime % DAY_IN_MS) / HOUR_IN_MS),
    minutes: Math.floor((remainingTime % HOUR_IN_MS) / MINUTE_IN_MS),
    seconds: Math.floor((remainingTime % MINUTE_IN_MS) / SECOND_IN_MS),
    isComplete: false,
  };
}

export function useCountdown(targetDate: string): CountdownValue {
  const [countdown, setCountdown] = useState<CountdownValue>(() => getCountdownValue(targetDate));

  useEffect(() => {
    setCountdown(getCountdownValue(targetDate));

    const intervalId = window.setInterval(() => {
      setCountdown(getCountdownValue(targetDate));
    }, SECOND_IN_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [targetDate]);

  return countdown;
}
