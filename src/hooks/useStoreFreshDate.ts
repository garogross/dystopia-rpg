import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { updateFreshDate } from "../store/slices/uiSlice";

export const useStoreFreshDate = () => {
  const dispatch = useAppDispatch();
  const freshDateSessions = useAppSelector(
    (state) => state.ui.freshDateSessions
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (freshDateSessions.length) {
      // Clear any existing interval before setting a new one
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        dispatch(updateFreshDate());
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [freshDateSessions, dispatch]);
};
