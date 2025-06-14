import { useEffect, useRef, useState } from "react";

const TIMEOUT = 3000

export const useTooltip = () => {
  const [show, setShow] = useState(false);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (show) {
      if(timeOutRef.current) {

        clearTimeout(timeOutRef.current);
      }

      timeOutRef.current = setTimeout(() => {
        setShow(false);
      }, TIMEOUT);
    }
  }, [show]);
  const openTooltip = () => {
    return new Promise<void>((resolve) => {
      setShow(true);
      setTimeout(() => {
        resolve();
      }, TIMEOUT);
    });
  };


  return {openTooltip,show}
};
