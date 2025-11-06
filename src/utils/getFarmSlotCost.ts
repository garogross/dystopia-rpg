import { EFarmSlotTypes } from "../constants/cyberfarm/EFarmSlotTypes";
import { FarmSlotCostsType } from "../types/FarmSlotCostsType";

export const getFarmSlotCost = (
  type: EFarmSlotTypes,
  slotCosts: FarmSlotCostsType | null,
  newSlotIndex: number
) => {
  if (!slotCosts) return null;

  if (type === EFarmSlotTypes.FIELDS) {
    return slotCosts.fields.find(
      (cost) => newSlotIndex >= cost.range[0] && newSlotIndex <= cost.range[1]
    );
  } else {
    return slotCosts[type];
  }
};
