import { EHexDirections } from "../../constants/influence/EHexDirections";

export interface IHex {
  x: number;
  y: number;
  z: number;
  owner_id: null | number;
  building_type: null | string;
  building_level: null | number;
  defense_current: null;
  defense_max: null;
  resource_type: null;
  artifact: {};
  bonus_area_id: null | string;
  borders?: EHexDirections[];
}
