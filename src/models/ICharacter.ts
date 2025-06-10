import { EHitZones } from "../constants/rpgGame/EHitZones";

export interface ICharacter {
  line: number;
  id?: string;
  hit_zone: EHitZones;
  mob_name?: string;
  target_id?: number | string | null;
  attributes: {
    luck?: number;
    agility: number;
    accuracy?: number;
    strength: number;
    initiative?: number;
    constitution: number;
  };
  parameters?: {
    dodge: number;
    damage: number;
    health: number;
    anti_crit: number;
    anti_dodge: number;
    crit_power: number;
    protection: number;
    crit_chance: number;
    active_armor: number;
    shield_power: number;
    shield_regen: number;
    counterattack: number;
    passive_armor: number;
    damage_reduction: number;
    crit_power_reduction: number;
  };
  defend_zone: EHitZones;
  battle_parameters: {
    max_hp: number;
    melee_damage: number;
  };
  modelId?: string;
  owned?: boolean;
}
