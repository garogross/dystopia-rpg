import { InitialFieldType } from "../../components/CyberFarmEvo/CyberFarmEvoFieldsWrapper/CyberFarmEvoFieldsWrapper";
import { EFactoryProducts } from "../../constants/cyberfarm/EFactoryProducts";
import { EFarmSlotTypes } from "../../constants/cyberfarm/EFarmSlotTypes";
import { EPlants } from "../../constants/cyberfarm/EPlants";

export interface IFarmField extends InitialFieldType {
  type: EFarmSlotTypes;
  plant?: EPlants;
  factoryProduct?: EFactoryProducts;

  idArg?: string;
}
