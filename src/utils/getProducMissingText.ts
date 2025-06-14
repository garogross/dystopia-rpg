import { products } from "../constants/cyberfarm/products";
import { ELanguages } from "../constants/ELanguages";
import { TRANSLATIONS } from "../constants/TRANSLATIONS";
import { FarmMissingResourcesType } from "../types/FarmMissingResourcesType";

const { notEnoughResourcesText } = TRANSLATIONS.errors;

export const getProducMissingText = (
  missingItems: FarmMissingResourcesType,
  language: ELanguages
) => {
  let missing = "";

  for (const [k, value] of Object.entries(missingItems)) {
    const key = k as keyof typeof missingItems;

    if (key === "cash_point") {
      missing += `${value} cp, `;
    } else {
      missing += `${value} ${products[key].name[language]}, `;
    }
  }

  missing = missing.length ? missing.slice(0, missing.length - 2) : missing;

  return `${notEnoughResourcesText[language]} ${missing}`;
};
