import { EFarmSlotTypes } from "../../constants/cyberfarm/EFarmSlotTypes";
import { AppGameMode } from "../../types/AppGameMode";
import { CyberFarmProductType } from "../../types/CyberFarmProductType";
import { FarmAchievmentSettingsType } from "../../types/Achievments/FarmAchievmentSettingsType";
import { FarmAchievmentsType } from "../../types/Achievments/FarmAchievmentsType";
import { FarmResourceDeficitType } from "../../types/FarmResourceDeficitType";
import { FarmSlotCostsType } from "../../types/FarmSlotCostsType";
import { SocialShopType } from "../../types/SocialShopType";
import { IMailMessage } from "../IMailMessage";
import { FarmProductsSettingsType } from "../../types/FarmProductsSettingsType";
import { WorkshopSlotCostsType } from "../../types/WorkshopSlotCostsType";
import { IFarmSlot } from "../CyberFarm/IFarmSlot";
import { IWorkshopSlot } from "../CyberFarm/IWorkshopSlot";
import { GetStorageResponse } from "./CyberFarm/Resources";

type ClaimDailyLogin = {
  next_reward: number;
  day_number: number;
  reward_available: boolean;
  rewards_by_day: Record<string, number>; // {"1": 1}
};

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
    slots: Record<string, IFarmSlot>;
    workshop_slots: Record<string, IWorkshopSlot>;
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
    ton_cyber_farm_tutorial_finished: boolean;
    resources: GetStorageResponse["resources"];
    ton: number;
    achievements: FarmAchievmentsType;
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
    achievements_settings: FarmAchievmentSettingsType;
    ton_withdraw_commission: number;
  };
  game_settings_new: {
    reward_taddy: {
      exchange: number;
    };
    ton_cyber_farm_products: FarmProductsSettingsType;
    ton_cyber_farm_slot_costs: {
      upgrade: {
        [EFarmSlotTypes.FARM]: number[];
        [EFarmSlotTypes.FACTORY]: number[];
      };
    };
    ton_cyber_workshop_slot_costs: {
      upgrade: {
        workshop: number[];
      };
      workshop: WorkshopSlotCostsType;
    };
    ton_cyber_farm_modules: {
      [EFarmSlotTypes.FARM]: {
        speed: {
          max_total: number;
          per_level_increment: Record<2 | 3 | 4 | 5, number>;
          time_reduction_per_module: number;
        };
        automation: {
          max: number;
          removal_locked_by_speed: boolean;
          required_for_other_modules: boolean;
        };
        production: {
          max_total: number;
          per_level_increment: Record<2 | 3 | 4 | 5, number>;
        };
      };
      [EFarmSlotTypes.FACTORY]: {
        speed: {
          max_total: number;
          per_level_increment: Record<2 | 3 | 4 | 5, number>;
          time_reduction_per_module: number;
        };
        automation: {
          max: number;
          removal_locked_by_speed: boolean;
          required_for_other_modules: boolean;
        };
        production: {
          max_total: number;
          per_level_increment: Record<2 | 3 | 4 | 5, number>;
        };
      };
      [EFarmSlotTypes.WORKSHOP]: {
        speed: {
          max_modules: number;
          time_reduction_per_module: number;
        };
        automation: {
          enabled: boolean;
        };
        production: {
          max_modules: number;
          batch_multiplier_per_module: number;
        };
        capacity_per_level: Record<2 | 3 | 4 | 5, number>;
        level_time_reduction_per_level: number;
        level_time_reduction_start_level: number;
      };
    };
    pools: {
      ton_pool: {
        amount: number;
        description: string;
        ton_usd_rate: number;
        comission_ton: number;
      };
      usdt_pool: {
        amount: number;
        description: string;
        comission_usdt: number;
      };
      max_cp_usdt_price: 0.001;
    };
  };
  resource_deficit: FarmResourceDeficitType;
  claim_daily_login: ClaimDailyLogin;
  social_shop: SocialShopType;
  metrics: {};

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
    map_session?: {
      pause_minutes: number;
      duration_hours: number;
      start_datetime: Date; // "2025-07-28T12:00:00Z",
      hexes_per_player: number;
    };
    claim_daily_login?: ClaimDailyLogin;
  };
  active_maps?: [
    {
      map_id: number;
      created_at: Date;
      start_at: Date;
      finished_at: Date;
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
