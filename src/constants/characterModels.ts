import {
  character1Image,
  characterAvatarImage,
  npc1Image,
  npcAvatarImage,
} from "../assets/images";
import { ICharacterModel } from "../models/ICharacterModel";

export const CHARACTER_MODELS: ICharacterModel[] = [
  {
    id: "1",
    avatar: characterAvatarImage,
    modelAsset: character1Image,
    type: "striker",
  },
  {
    id: "2",
    avatar: npcAvatarImage,
    modelAsset: npc1Image,
    type: "shooter",
    npc: true,
  },
];
