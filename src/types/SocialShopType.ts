import { CPOrProductType } from "./CPOrProductType";

export type SocialShopType = Record<
  string,
  {
    reward: Record<CPOrProductType, number>;
  } & Record<CPOrProductType, 1>
>;
