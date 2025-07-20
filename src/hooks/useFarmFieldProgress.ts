import { useEffect, useState } from "react";
import { getFarmFieldProgress } from "../utils/getFarmFieldProgress";
import { IFarmField } from "../models/CyberFarm/IFarmField";
import { useAppSelector } from "./redux";

export const useFarmFieldProgress = (
  process: IFarmField["process"],
  dependencies?: unknown[]
) => {
  const freshDate = useAppSelector((state) => state.ui.freshDate);

  const getProgressObj = () =>
    process && getFarmFieldProgress(process.startDate, process.endDate);

  const [progressPercent, setProgressPercent] = useState(
    () => getProgressObj()?.progress
  );
  const [remainingTimeInSecs, setRemainingTimeInSecs] = useState(
    () => getProgressObj()?.remainingTimeInSecs
  );

  useEffect(() => {
    if (!process) return;
    if (dependencies && dependencies.some((item) => !item)) return;

    const updatedProgress = getProgressObj();
    setProgressPercent(updatedProgress?.progress);
    setRemainingTimeInSecs(updatedProgress?.remainingTimeInSecs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freshDate, process, ...(dependencies || [])]);

  return { progressPercent, remainingTimeInSecs };
};
