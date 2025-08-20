import { EHexDirections } from "../../constants/influence/EHexDirections";

export interface IHex {
  x: number;
  y: number;
  z: number;
  owner_id: null | number;
  building_type: null | string;
  building_level: null | number;
  defense_current: number;
  defense_max: number;
  resource_type: null;
  artifact: {};
  bonus_area_id: null | string;
  bonusAreaBorders?: EHexDirections[];
  ownerBorders?: EHexDirections[];
  hold_reward?: number;
  seconds_to_next_hold_reward?: number;
}
