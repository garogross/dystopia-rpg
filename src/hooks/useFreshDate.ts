import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { updateFreshDate } from "../store/slices/uiSlice";

export const useFreshDate = () => {
  const dispatch = useAppDispatch();
  const freshDateUpdating = useAppSelector(
    (state) => state.ui.freshDateUpdating
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (freshDateUpdating) {
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
  }, [freshDateUpdating, dispatch]);
};
