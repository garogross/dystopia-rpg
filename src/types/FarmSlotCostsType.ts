import { EFarmSlotTypes } from "../constants/cyberfarm/EFarmSlotTypes";
import { CyberFarmProductType } from "./CyberFarmProductType";



export type FarmSlotCostsType = {
  [EFarmSlotTypes.FIELDS]: ({
    range: [number, number];
  } & Partial<Record<CyberFarmProductType | "cash_point", number>>)[];
  [EFarmSlotTypes.FARM]: Partial<
    Partial<Record<CyberFarmProductType | "cash_point", number>>
  >;
  [EFarmSlotTypes.FACTORY]: Partial<
    Partial<Record<CyberFarmProductType | "cash_point", number>>
  >;
};
