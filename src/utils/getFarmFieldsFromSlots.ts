import { EFactoryProducts } from "../constants/cyberfarm/EFactoryProducts";
import { EFarmSlotTypes } from "../constants/cyberfarm/EFarmSlotTypes";
import { EPlants } from "../constants/cyberfarm/EPlants";
import { IFarmField } from "../models/CyberFarm/IFarmField";
import { SlotsState } from "../store/slices/cyberFarm/slotsSlice";


export const getFarmFieldsFromSlots = (slots: SlotsState["slots"]) => {
    const fields: IFarmField[] = slots
    ? Object.entries(slots).map(([key, slot]) => ({
        id: key,
        type: slot.type,
        plant:
          slot.type === EFarmSlotTypes.FACTORY
            ? undefined
            : (slot.product as EPlants),
        factoryProduct:
          slot.type !== EFarmSlotTypes.FACTORY
            ? undefined
            : (slot.product as EFactoryProducts),
        process:
          slot.start_time && slot.finish_time
            ? {
                startDate: slot.start_time,
                endDate: slot.finish_time,
              }
            : undefined,
      }))
    : [];

    return fields
}