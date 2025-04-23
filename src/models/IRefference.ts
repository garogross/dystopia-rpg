import { EStats } from "../constants/EStats";

export interface IRefference {
  id: number;
  name: string;
  date: string;
  income: {
    [EStats.darkMatter]?: number;
    [EStats.kredit]?: number;
  };
}
