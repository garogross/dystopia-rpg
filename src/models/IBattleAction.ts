import { EHitZones } from "../constants/EHitZones";
import { IBattle } from "./IBattle";

export interface IBattleAction {
  attacker_id: string;
  attacker_team: keyof IBattle["fighters"];
  target_id: string;
  target_defend_zone: EHitZones;
  target_team: keyof IBattle["fighters"];
  hit_zone: EHitZones;
  damage: number;
  before_hp: number;
  after_hp: number;
}
