import { useEffect, useRef } from "react";

export const useCopyRef = <T>(state: T) => {
  const stateRef = useRef<T>(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return stateRef;
};
