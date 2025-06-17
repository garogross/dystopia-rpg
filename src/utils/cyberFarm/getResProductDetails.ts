import { cpImage, cpImageWebp } from "../../assets/imageMaps";
import { products } from "../../constants/cyberfarm/products";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";
import { CPOrProductType } from "../../types/CPOrProductType";

const { cpText } = TRANSLATIONS.common;

export const getResProductDetails = (res: CPOrProductType) => {
  if (res === "cash_point")
    return {
      src: cpImage,
      srcSet: cpImageWebp,
      name: cpText,
      twistedName: cpText,
    };
  else return products[res];
};
