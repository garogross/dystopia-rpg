import { ReactNode } from "react";
import { TranslationItemType } from "../TranslationItemType";

export type AchievmentDetailsType<T extends string> = {
  [key in T]: {
    icon: ReactNode;
    title: TranslationItemType;
    description: TranslationItemType;
  }[];
};
