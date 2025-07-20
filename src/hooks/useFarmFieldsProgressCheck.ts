import { useEffect } from "react";
import { IFarmField } from "../models/CyberFarm/IFarmField";
import { getFarmFieldProgress } from "../utils/getFarmFieldProgress";
import { useAppDispatch } from "./redux";
import { setFreshDateUpdating } from "../store/slices/uiSlice";

export const useFarmFieldsProgressCheck = (filteredFields: IFarmField[]) => {
  const dispatch = useAppDispatch();

  const hasInProgressItem = filteredFields.some(
    (item) =>
      item.process &&
      getFarmFieldProgress(item.process.startDate, item.process.endDate)
        .progress < 100
  );

  useEffect(() => {
    dispatch(setFreshDateUpdating(hasInProgressItem));
    return () => {
      dispatch(setFreshDateUpdating(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasInProgressItem]);
};
