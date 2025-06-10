import { AppGameMode } from "../../types/AppGameMode";



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
    slots: {};
    timers: {};
    resources: {};
    ton: number;
  };
}
