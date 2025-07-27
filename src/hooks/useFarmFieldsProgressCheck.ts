import { IFarmField } from "../models/CyberFarm/IFarmField";
import { getFarmFieldProgress } from "../utils/getFarmFieldProgress";
import { useFreshDateStateUpdate } from "./useFreshDateStateUpdate";

export const useFarmFieldsProgressCheck = (filteredFields: IFarmField[]) => {
  const hasInProgressItem = filteredFields.some(
    (item) =>
      item.process &&
      getFarmFieldProgress(item.process.startDate, item.process.endDate)
        .progress < 100
  );

  useFreshDateStateUpdate(hasInProgressItem);
};
