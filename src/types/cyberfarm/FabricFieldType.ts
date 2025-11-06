import { InitialFieldType } from "../../components/CyberFarmEvo/CyberFarmEvoFieldsWrapper/CyberFarmEvoFieldsWrapper";
import { IWorkshopSlot } from "../../models/CyberFarm/IWorkshopSlot";

export type FabricFieldType = InitialFieldType & {
  workshop_output?: IWorkshopSlot["workshop_output"];
  product?: IWorkshopSlot["product"];
};
