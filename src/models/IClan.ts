import { EStats } from "../constants/EStats";
import { IClanAboutParticipant } from "./IClanAboutParticipant";

export interface IClan {
  id: string;
  name: string;
  level: number;
  description: string;
  image: string;
  clanMessage: string;
  treasury: { [key in EStats]?: number };
  participants: IClanAboutParticipant[];
  participantsLimit: number;
}
