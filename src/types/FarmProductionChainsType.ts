import { EFarmSlotTypes } from "../constants/cyberfarm/EFarmSlotTypes";
import { CyberFarmProductType } from "./CyberFarmProductType";

export type FarmProductionChainsType = {
  [key in EFarmSlotTypes]: {
    [key in CyberFarmProductType]: {
      input: {
        [key in CyberFarmProductType]: number;
      };
      output: number;
    };
  };
};
