import { CPOrProductType } from "./CPOrProductType";

export type WorkshopSlotCostsType = ({
  range: [number, number];
} & Partial<Record<CPOrProductType, number>>)[];
