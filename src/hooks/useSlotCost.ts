import { EFarmSlotTypes } from "../constants/cyberfarm/EFarmSlotTypes";
import { products } from "../constants/cyberfarm/products";
import { TRANSLATIONS } from "../constants/TRANSLATIONS";
import { FarmSlotCostsType } from "../types/FarmSlotCostsType";
import { useAppSelector } from "./redux";

const {notEnoughResourcesText: notEnoughText} = TRANSLATIONS.errors

export const useSlotCost = () => {
  const language = useAppSelector((state) => state.ui.language);
  const slotCosts = useAppSelector((state) => state.cyberfarm.slots.slotCosts);
  const slots = useAppSelector((state) => state.cyberfarm.slots.slots);
  const cp = useAppSelector((state) => state.profile.stats.cp);
  const newSlotIndex = slots ? Object.keys(slots).length + 1 : 1;
  const resources = useAppSelector(
    (state) => state.cyberfarm.resources.resources
  );

  const getSlotCost = (type: EFarmSlotTypes) => {
    if (!slotCosts) return null;

    if (type === EFarmSlotTypes.FIELDS) {
      return slotCosts.fields.find(
        (cost) => newSlotIndex >= cost.range[0] && newSlotIndex <= cost.range[1]
      );
    } else {
      return slotCosts[type];
    }
  };

  const getSlotCostTexts = (type: EFarmSlotTypes) => {
    const newSlotCost = getSlotCost(type);
    let costText = "";

    let notEnoughResourcesText = "";

    if (newSlotCost) {
      for (const [k, value] of Object.entries(newSlotCost)) {
        console.log(value);
        const key = k as keyof FarmSlotCostsType["fields"][0];

        if (key === "range" || !value) {
          continue;
        }
        const costValue = value as number;

        if (key === "cash_point") {
          costText += `${value} cp, `;
          if (cp < costValue) {
            notEnoughResourcesText += `${costValue - cp} cp, `;
          }
        } else {
          costText += `${value} ${products[key].name[language]}, `;
          if (resources[key] < costValue) {
            notEnoughResourcesText += `${costValue - resources[key]} ${
              products[key].name[language]
            }, `;
          }
        }
      }

      costText = costText.length
        ? costText.slice(0, costText.length - 2)
        : costText;
      notEnoughResourcesText = notEnoughResourcesText.length
        ? notEnoughResourcesText.slice(0, notEnoughResourcesText.length - 2)
        : notEnoughResourcesText;

      return {
        costText,
        notEnoughResourcesText: `${notEnoughText[language]} ${notEnoughResourcesText}`,
        errored: !!notEnoughResourcesText
      };
    }

    return {
      costText: "",
      notEnoughResourcesText: "",
    };
  };

  return getSlotCostTexts;
};
