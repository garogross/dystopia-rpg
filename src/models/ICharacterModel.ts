export interface ICharacterModel {
  id: string;
  avatar: string;
  modelAsset: string;
  npc?: boolean
  type: "striker" | "shooter";
}
