import { EFarmSlotTypes } from "../../constants/cyberfarm/EFarmSlotTypes";
import { AppGameMode } from "../../types/AppGameMode";
import { CyberFarmProductType } from "../../types/CyberFarmProductType";



export interface GetAccountDetailsResponse {
  mode: AppGameMode;
  user?: {
    id_tgrm: string;
    name: string;
    profile: {
      cash_point: number;
    };
    dataset: {
      start_choice: AppGameMode;
    };
  };
  ton_cyber_farm?: {
    slots: Record<string,{type: EFarmSlotTypes}>;
    timers: {};
    resources: Partial<Record<CyberFarmProductType, number>>;
    ton: number;
  };
  game_settings?: {
    base_costs: Record<string,{type: EFarmSlotTypes}>
  }
}
