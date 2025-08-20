import { useEffect, useRef, useState } from "react";

export const useFreshDate = (inProgress: boolean) => {
  const [freshDate, setFreshDate] = useState(Date.now());
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (inProgress) {
      intervalRef.current = setInterval(() => {
        setFreshDate(Date.now());
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [inProgress]);

  return freshDate;
};
