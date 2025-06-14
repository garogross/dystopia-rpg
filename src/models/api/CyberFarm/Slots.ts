import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";

export interface BuySlotResponse {
  status: string;
  slot_id: string;
  type: EFarmSlotTypes;
}

export interface ProduceSlotResponse {
  status: string;
  slot_id: string;
  product: CyberFarmProductType;
  start_time: 1749648608926;
  finish_time: 1749652208926;
}

export interface HarvestResponse {
  status: string;
  slot_id: string;
  harvested: {
    [key in CyberFarmProductType]: number;
  };
  resources: {
    [key in CyberFarmProductType]: number;
  };
}
