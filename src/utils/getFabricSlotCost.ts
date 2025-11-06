import { WorkshopSlotCostsType } from "../types/WorkshopSlotCostsType";

export const getFabricSlotCostByRange = (
  slotCosts: WorkshopSlotCostsType | null,
  newSlotIndex: number
) => {
  if (!slotCosts) return null;

  return slotCosts.find(
    (cost) => newSlotIndex >= cost.range[0] && newSlotIndex <= cost.range[1]
  );
};
