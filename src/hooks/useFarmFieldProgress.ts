import { useEffect, useRef, useState } from "react";
import { getFarmFieldProgress } from "../utils/getFarmFieldProgress";
import { IFarmField } from "../models/CyberFarm/IFarmField";

export const useFarmFieldProgress = (
  process: IFarmField["process"],
  dependencies?: unknown[]
) => {
  const initialProgressObj =
    process && getFarmFieldProgress(process.startDate, process.endDate);
  const initialprogressPercent = initialProgressObj?.progress;
  const initialremainingTimeInSecs = initialProgressObj?.remainingTimeInSecs;
  const [progressPercent, setProgressPercent] = useState(
    initialprogressPercent
  );
  const [remainingTimeInSecs, setRemainingTimeInSecs] = useState(
    initialremainingTimeInSecs
  );
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const processRef = useRef(process);

  useEffect(() => {
    processRef.current = process;
  }, [process]);

  const updateProcess = () => {
    const updatedProgress =
      process && getFarmFieldProgress(process.startDate, process.endDate);
    const updatedprogressPercent = updatedProgress?.progress;
    const updatedremainingTimeInSecs = updatedProgress?.remainingTimeInSecs;
    setProgressPercent(updatedprogressPercent);
    setRemainingTimeInSecs(updatedremainingTimeInSecs);

    return updatedprogressPercent;
  };

  useEffect(
    () => {
      console.log(
        "dependencies.some((item) => !item)",
        dependencies?.some((item) => !item)
      );

      if (!process) return;
      if (dependencies && dependencies.some((item) => !item)) return;
      updateProcess();
      intervalRef.current = setInterval(() => {
        const updatedProgressPercent = updateProcess();
        if (!updatedProgressPercent || updatedProgressPercent >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 1000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies ? dependencies : []
  );

  return { progressPercent, remainingTimeInSecs };
};
