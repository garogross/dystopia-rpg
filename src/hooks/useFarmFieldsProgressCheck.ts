import { InitialFieldType } from "../components/CyberFarmEvo/CyberFarmEvoFieldsWrapper/CyberFarmEvoFieldsWrapper";
import { getFarmFieldProgress } from "../utils/getFarmFieldProgress";
import { useFreshDateStateUpdate } from "./useFreshDateStateUpdate";

export const useFarmFieldsProgressCheck = (
  filteredFields: InitialFieldType[]
) => {
  const hasInProgressItem = filteredFields.some(
    (item) =>
      item.process &&
      getFarmFieldProgress(item.process.startDate, item.process.endDate)
        .progress < 100
  );

  useFreshDateStateUpdate(hasInProgressItem);
};
