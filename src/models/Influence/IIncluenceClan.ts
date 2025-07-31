import { ELanguages } from "../../constants/ELanguages";
import { INFLUENCE_CLAN_EMBLEMS } from "../../constants/influence/influenceClanEmblems";

export interface IIncluenceClan {
  id: string;
  emblem: keyof typeof INFLUENCE_CLAN_EMBLEMS;
  name: string;
  level: number;
  members: number;
  maxMembers: number;
  language: ELanguages;
  type: "private" | "public";
  description: string;
  founded: number;
}
