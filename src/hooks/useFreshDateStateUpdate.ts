import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import {
  addFreshDateSession,
  removeFreshDateSession,
} from "../store/slices/uiSlice";
import { v4 } from "uuid";

export const useFreshDateStateUpdate = (inProgress: boolean) => {
  const dispatch = useAppDispatch();
  const uuid = v4();

  useEffect(() => {
    if (inProgress) dispatch(addFreshDateSession(uuid));
    else dispatch(removeFreshDateSession(uuid));
    return () => {
      dispatch(removeFreshDateSession(uuid));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProgress]);
};
