import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";


export interface BuySlotResponse  {
    "status": string,
    "slot_id": string,
    "type": EFarmSlotTypes
}