import { EFactoryProducts } from "../../constants/cyberfarm/EFactoryProducts";
import { EFarmSlotTypes } from "../../constants/cyberfarm/EFarmSlotTypes";
import { EPlants } from "../../constants/cyberfarm/EPlants";

export interface IFarmField {
  id: string;
  type: EFarmSlotTypes;
  blocked?: boolean;
  plant?: EPlants;
  factoryProduct?: EFactoryProducts;
  process?: {
    startDate: string;
    endDate: string;
  };
}
