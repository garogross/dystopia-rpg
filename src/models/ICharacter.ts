export interface ICharacter {
  id: string;
  avatar: string;
  model: string;
  hearts: number;
  sheild: number;
  powerSheild: number;
  username: string;
  type: "striker" | "shooter";
  owned?: boolean
}
