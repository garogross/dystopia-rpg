import { SlotsState } from "../store/slices/cyberFarm/slotsSlice";
import { FabricFieldType } from "../types/cyberfarm/FabricFieldType";

export const getFactoryFieldsFromSlots = (
  slots: SlotsState["workshopSlots"]
) => {
  const fields: FabricFieldType[] = slots
    ? Object.entries(slots)
        .map(([key, slot]) => ({
          id: key,
          type: slot.type,
          process:
            slot.start_time && slot.finish_time
              ? {
                  startDate: slot.start_time,
                  endDate: slot.finish_time,
                }
              : undefined,
          updated_at: slot.updated_at,
          adProductionBonusReceived: !!slot.ad_production_bonus_received,
          finalProduction: slot.final_production,
          level: slot.level,
          product: slot.product,
          modules: slot.modules,
          workshop_output: slot.workshop_output,
        }))
        .sort((a, b) => a.updated_at - b.updated_at)
    : [];

  return fields;
};
