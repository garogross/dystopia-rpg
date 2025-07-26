import { ELanguages } from "../../constants/ELanguages";

export interface IIncluenceClan {
  id: string;
  image: string;
  name: string;
  level: number;
  members: number;
  maxMembers: number;
  language: ELanguages;
  type: "private" | "public";
  description: string;
}
