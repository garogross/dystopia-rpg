import { ELanguages } from "../constants/ELanguages";
import { TRANSLATIONS } from "../constants/TRANSLATIONS";

const { minAgoText, hourAgoText, secondAgoText, dayAgoText } =
  TRANSLATIONS.common;

export const getElapsedTime = (date: Date | number, language: ELanguages) => {
  const now = Date.now();
  const inputTime = typeof date === "number" ? date : date.getTime();
  const diff = Math.floor((now - inputTime) / 1000); // in seconds

  if (diff < 60) {
    return `${diff} ${secondAgoText[language]}`;
  } else if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} ${minAgoText[language]}`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} ${hourAgoText[language]}`;
  } else {
    const days = Math.floor(diff / 86400);
    return `${days} ${dayAgoText[language]}`;
  }
};
