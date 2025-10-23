import {
  cyberFarmEvoPagePath,
  cyberFarmWarehousePagePath,
} from "../../router/constants";
import { TRANSLATIONS } from "../TRANSLATIONS";

export enum ECyberfarmEvoTutorialActions {
  showFarm = "showFarm",
  showWarehouse = "showWarehouse",
  showTasks = "showTasks",
}

const { welcomeText, farmText, warehouseText, tasksText, finishText } =
  TRANSLATIONS.tutorialPopup.cyberFarmEvoSlides;

export const CYBERFARM_EVO_TUTORIAL_PROGRESS: {
  text?: {
    en: JSX.Element;
    ru: JSX.Element;
  };
  page: string;
  action?: ECyberfarmEvoTutorialActions;
  required?: boolean;
}[] = [
  {
    text: welcomeText,
    page: cyberFarmEvoPagePath,
  },
  {
    action: ECyberfarmEvoTutorialActions.showFarm,
    page: cyberFarmEvoPagePath,
  },

  {
    text: farmText,
    page: cyberFarmEvoPagePath,
  },
  {
    action: ECyberfarmEvoTutorialActions.showWarehouse,
    page: cyberFarmEvoPagePath,
  },

  {
    text: warehouseText,
    page: cyberFarmEvoPagePath,
  },
  {
    action: ECyberfarmEvoTutorialActions.showTasks,
    page: cyberFarmEvoPagePath,
  },
  {
    text: tasksText,
    page: cyberFarmEvoPagePath,
  },
  {
    text: finishText,
    page: cyberFarmWarehousePagePath,
  },
];
