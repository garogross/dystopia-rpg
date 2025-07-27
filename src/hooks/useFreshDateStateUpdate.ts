import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import { setFreshDateUpdating } from "../store/slices/uiSlice";

export const useFreshDateStateUpdate = (inProgress: boolean) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFreshDateUpdating(inProgress));
    return () => {
      dispatch(setFreshDateUpdating(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProgress]);
};
