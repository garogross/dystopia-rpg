import { EFarmSlotTypes } from "../../constants/cyberfarm/EFarmSlotTypes";
import { ECyberfarmTutorialActions } from "../../constants/cyberfarm/tutorial";
import { AppGameMode } from "../../types/AppGameMode";
import { CyberFarmProductType } from "../../types/CyberFarmProductType";
import { FarmAchievmentSettingsType } from "../../types/Achievments/FarmAchievmentSettingsType";
import { FarmAchievmentsType } from "../../types/Achievments/FarmAchievmentsType";
import { FarmResourceDeficitType } from "../../types/FarmResourceDeficitType";
import { FarmSlotCostsType } from "../../types/FarmSlotCostsType";
import { SocialShopType } from "../../types/SocialShopType";
import { IMailMessage } from "../IMailMessage";

export interface GetAccountDetailsResponse {
  mode: AppGameMode;
  user?: {
    id_tgrm: string;
    name: string;
    profile?: {
      cash_point: number;
      dataset: {
        start_choice: AppGameMode;
        tutorial_finished_rewarded: boolean;
      };
    };
    // influence
    influence_points: number;
    action_points_current: number;
    action_points_max: number;
    spent_action_points: number;
    next_attack_ts: number;
    timers: {
      last_restore_action_points_ts: number;
    };
    mail: IMailMessage[];
  };
  // cyberfarm
  ton_cyber_farm?: {
    slots: Record<string, { type: EFarmSlotTypes }>;
    timers: {
      daily_login_claimed: {
        last_claim_ts: null | number;
        reward_available: boolean;
        day_number: null;
      };
      social_shop?: {
        last_purchase_ts: number;
        cooldown_until_ts: number;
      };
    };
    resources: Partial<Record<CyberFarmProductType, number>>;
    ton: number;
    achievements: FarmAchievmentsType;
    resource_ton_value: Partial<Record<CyberFarmProductType, number>>;
  };
  game_settings?: {
    base_costs: Record<string, number>;
    slot_costs: FarmSlotCostsType;
    production_settings: {
      [key in EFarmSlotTypes]: {
        products: CyberFarmProductType[];
        speedup_bonus: number;
        production_time_hours: number;
      };
    };
    production_chains: {
      [key in EFarmSlotTypes]: {
        [key in CyberFarmProductType]: {
          input: {
            [key in CyberFarmProductType]: number;
          };
          output: number;
        };
      };
    };
    achievements_settings: FarmAchievmentSettingsType;
    ton_withdraw_commission: number;
  };
  game_settings_new: {
    reward_taddy: {
      exchange: number;
    };
  };
  resource_deficit: FarmResourceDeficitType;
  claim_daily_login: {
    next_reward: number;
    day_number: number;
    reward_available: boolean;
    rewards_by_day: Record<string, number>; // {"1": 1}
  };
  social_shop: SocialShopType;
  metrics: {
    ton_cyber_farm_metrics: {
      tutorial?: ECyberfarmTutorialActions[];
    };
  };

  // influence
  settings?: {
    attack_neutral_hex: {
      action_points_cost: number;
      influence_points_reward: number;
    };
    action_point_restore: {
      amount: number;
      interval_minutes: number;
    };
    attack_enemy_hex_without_building: {
      action_points_cost: number;
      influence_points_reward: number;
    };
    max_action_points_per_turn: number;
  };
  active_maps?: [
    {
      map_id: number;
    }
  ];
  hexes_captured?: {
    [key in string]: number;
  };
  map_rewards_info?: {
    [key in string]: {
      map_pool_size: number;
      user_influence_points: number;
      user_reward: number;
    };
  };
}
