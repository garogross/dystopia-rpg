import { useEffect, useRef, useState } from "react";

export const useTimer = (bonusTime: number, onChange: () => void) => {
  const [shouldTimerWork, setShouldTimerWork] = useState(false);

  const bonusTimeRef = useRef(bonusTime);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    bonusTimeRef.current = bonusTime;

    if (!shouldTimerWork && bonusTime) {
      setShouldTimerWork(true);
    } else if (shouldTimerWork && !bonusTime) {
      setShouldTimerWork(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bonusTime]);

  useEffect(() => {
    const harvest = () => {
      if (bonusTimeRef.current) {
        onChange();
      }
    };

    if (shouldTimerWork) {
      intervalRef.current = setInterval(() => {
        harvest();
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldTimerWork]);
};
