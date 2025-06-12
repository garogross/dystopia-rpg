import { EFarmSlotTypes } from "../constants/cyberfarm/EFarmSlotTypes";
import { CyberFarmProductType } from "./CyberFarmProductType";

export type FarmResourceDeficitType = {
  [slotType in EFarmSlotTypes]?: {
    [productType in CyberFarmProductType]?: {
      [resourceType in CyberFarmProductType]?: number;
    };
  };
};
