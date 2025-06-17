import { EFarmSlotTypes } from "../constants/cyberfarm/EFarmSlotTypes";
import { CPOrProductType } from "./CPOrProductType";

export type FarmSlotCostsType = {
  [EFarmSlotTypes.FIELDS]: ({
    range: [number, number];
  } & Partial<Record<CPOrProductType, number>>)[];
  [EFarmSlotTypes.FARM]: Partial<Partial<Record<CPOrProductType, number>>>;
  [EFarmSlotTypes.FACTORY]: Partial<Partial<Record<CPOrProductType, number>>>;
};
