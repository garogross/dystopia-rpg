import { useEffect, useState } from "react";
import { restoreActionPoints } from "../../store/slices/influence/influenceSlice";
import { useAppDispatch, useAppSelector } from "../redux";
import { useFreshDateStateUpdate } from "../useFreshDateStateUpdate";

export const useInfluenceRestoretimer = () => {
  const dispatch = useAppDispatch();
  const lastRestoreActionPointsTs = useAppSelector(
    (state) => state.influence.influence.lastRestoreActionPointsTs
  );
  const actionPointMax = useAppSelector(
    (state) => state.influence.settings.actionPointMax
  );
  const actionPoints = useAppSelector(
    (state) => state.influence.influence.actionPoints
  );
  const actionPointRestore = useAppSelector(
    (state) => state.influence.settings.actionPointRestore
  );
  const [timeLeft, setTimeLeft] = useState(0);
  const freshDate = useAppSelector((state) => state.ui.freshDate);

  useFreshDateStateUpdate(actionPoints < actionPointMax);

  useEffect(() => {
    if (!actionPointRestore?.intervalMinutes || !lastRestoreActionPointsTs) {
      setTimeLeft(0);
      return;
    }

    const intervalMs = actionPointRestore.intervalMinutes * 60 * 1000;

    const getNextRestoreTs = (now: number, isInit?: boolean) => {
      let nextRestore = lastRestoreActionPointsTs + intervalMs;
      if (now > nextRestore) {
        if (!isInit) {
          dispatch(restoreActionPoints());
        }
        const intervalsPassed = Math.floor(
          (now - lastRestoreActionPointsTs) / intervalMs
        );
        nextRestore =
          lastRestoreActionPointsTs + (intervalsPassed + 1) * intervalMs;
      }
      return nextRestore;
    };

    const now = freshDate;
    const nextRestore = getNextRestoreTs(now, true);
    setTimeLeft(Math.max(0, nextRestore - now));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    actionPointRestore?.intervalMinutes,
    lastRestoreActionPointsTs,
    freshDate,
    dispatch,
    actionPoints,
    actionPointMax,
  ]);

  useEffect(() => {
    // If action points are full, reset timer
    if (actionPoints >= actionPointMax) {
      setTimeLeft(0);
    }
  }, [actionPointMax, actionPoints]);

  return timeLeft / 1000;
};
