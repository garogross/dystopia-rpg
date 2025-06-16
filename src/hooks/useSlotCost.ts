import { EFarmSlotTypes } from "../constants/cyberfarm/EFarmSlotTypes";
import { products } from "../constants/cyberfarm/products";
import { TRANSLATIONS } from "../constants/TRANSLATIONS";
import { FarmSlotCostsType } from "../types/FarmSlotCostsType";
import { getSlotCost } from "../utils/getSlotCost";
import { useAppSelector } from "./redux";

const { notEnoughResourcesText: notEnoughText } = TRANSLATIONS.errors;
const { orText } = TRANSLATIONS.common;

export const useSlotCost = () => {
  const language = useAppSelector((state) => state.ui.language);
  const slotCosts = useAppSelector((state) => state.cyberfarm.slots.slotCosts);
  const slots = useAppSelector((state) => state.cyberfarm.slots.slots);
  const cp = useAppSelector((state) => state.profile.stats.cp);
  const newSlotIndex = slots ? Object.keys(slots).length + 1 : 1;
  const resources = useAppSelector(
    (state) => state.cyberfarm.resources.resources
  );

  const getSlotCostTexts = (type: EFarmSlotTypes, byCp?: boolean) => {
    const newSlotCost = getSlotCost(type, slotCosts, newSlotIndex);

    let costTextInCp = "";
    let costTextInMetal = "";
    let notEnoughResourcesText = "";

    if (newSlotCost) {
      for (const [k, value] of Object.entries(newSlotCost)) {
        const key = k as keyof FarmSlotCostsType["fields"][0];

        if (key === "range" || !value) {
          continue;
        }
        const costValue = value as number;

        if (key === "cash_point") {
          costTextInCp = `${value} cp`;
          if (cp < costValue && byCp) {
            notEnoughResourcesText += `${costValue - cp} cp, `;
          }
        } else {
          costTextInMetal += `${value} ${products[key].name[language]}, `;
          if (resources[key] < costValue && !byCp) {
            notEnoughResourcesText += `${costValue - resources[key]} ${
              products[key].name[language]
            }, `;
          }
        }
      }

      costTextInMetal = costTextInMetal.length
        ? costTextInMetal.slice(0, costTextInMetal.length - 2)
        : costTextInMetal;

      const costText = `${
        costTextInMetal ? costTextInMetal : `0 ${products.metal.name[language]}`
      } ${orText[language]} ${costTextInCp}`;
      notEnoughResourcesText = notEnoughResourcesText.length
        ? notEnoughResourcesText.slice(0, notEnoughResourcesText.length - 2)
        : notEnoughResourcesText;

      const { cash_point, ...productCosts } = newSlotCost;

      return {
        costText,
        notEnoughResourcesText: `${notEnoughText[language]} ${notEnoughResourcesText}`,
        errored: !!notEnoughResourcesText,
        cost: byCp ? { cash_point } : productCosts,
      };
    }

    return {
      costText: "",
      notEnoughResourcesText: "",
    };
  };

  return getSlotCostTexts;
};
