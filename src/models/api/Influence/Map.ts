import { IHex } from "../../Influence/IHex";

export interface GetMapResponse {
  map_id: number;
  radius: number;
  hexes: IHex[];
}

export interface AttackHexResponse {
  status: string;
  ap_spent: number;
  ap_left: number;
  captured: boolean;
  victory_points: number;
  action_points_current: number;
  next_attack_ts: number;
}
