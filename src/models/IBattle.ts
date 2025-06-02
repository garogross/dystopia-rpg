import { IBattleAction } from "./IBattleAction";
import { ICharacter } from "./ICharacter";

export interface IBattle {
  battle_id: number;
  type: "pve" | "pvp";
  status: "";
  location: string; // id
  fighters: {
    team1: { [key in string]: ICharacter };
    team2: { [key in string]: ICharacter };
  };
  battle_log: {
    round: number;
    history?: { round: number; actions: IBattleAction[] }[];
    turn_order: {
      id: string;
      team: keyof IBattle["fighters"];
    }[];
  };
}
