import {
  cyberFarmPagePath,
  cyberFarmWarehousePagePath,
} from "../../router/constants";
import { TRANSLATIONS } from "../TRANSLATIONS";

export enum ECyberfarmTutorialActions {
  openBuySlot = "openBuySlot",
  buySlot = "buySlot",
  openProduceModal = "openProduceModal",
  selectProduceRes = "selectProduceRes",
  produceRes = "produceRes",
  openProgressModal = "openProgressModal",
  speedUpProduce = "speedUpProduce",
  openStorage = "openStorage",
  openSocialStore = "openSocialStore",
  selectSocialStoreOption = "selectSocialStoreOption",
  submitSocialStoreOption = "submitSocialStoreOption",
}

const {
  welcomeText,
  plantCactusText,
  needResourcesText,
  speedUpText,
  speedUpCostText,
  warehouseText,
  socialStoreText,
  finishText,
} = TRANSLATIONS.tutorialPopup.cyberFarmSlides;

export const CYBERFARM_TUTORIAL_PROGRESS = [
  {
    text: welcomeText,
    page: cyberFarmPagePath,
  },
  {
    action: ECyberfarmTutorialActions.openBuySlot,
    page: cyberFarmPagePath,
  },
  {
    action: ECyberfarmTutorialActions.buySlot,
    required: ECyberfarmTutorialActions.openBuySlot,
    page: cyberFarmPagePath,
  },
  {
    text: plantCactusText,
    page: cyberFarmPagePath,
  },
  {
    action: ECyberfarmTutorialActions.openProduceModal,
    page: cyberFarmPagePath,
  },
  {
    action: ECyberfarmTutorialActions.selectProduceRes,
    page: cyberFarmPagePath,
    required: ECyberfarmTutorialActions.openProduceModal,
  },
  {
    text: needResourcesText,
    page: cyberFarmPagePath,
    required: ECyberfarmTutorialActions.openProduceModal,
  },
  {
    action: ECyberfarmTutorialActions.produceRes,
    page: cyberFarmPagePath,
    required: ECyberfarmTutorialActions.openProduceModal,
  },
  {
    text: speedUpText,
    page: cyberFarmPagePath,
  },
  {
    action: ECyberfarmTutorialActions.openProgressModal,
    page: cyberFarmPagePath,
  },
  {
    action: ECyberfarmTutorialActions.speedUpProduce,
    page: cyberFarmPagePath,
    required: ECyberfarmTutorialActions.openProgressModal,
  },
  {
    text: speedUpCostText,
    page: cyberFarmPagePath,
  },
  {
    action: ECyberfarmTutorialActions.openStorage,
    page: cyberFarmPagePath,
  },
  {
    text: warehouseText,
    page: cyberFarmWarehousePagePath,
  },
  {
    action: ECyberfarmTutorialActions.openSocialStore,
    page: cyberFarmWarehousePagePath,
  },
  {
    text: socialStoreText,
    page: cyberFarmWarehousePagePath,
    required: ECyberfarmTutorialActions.openSocialStore,
  },

  {
    action: ECyberfarmTutorialActions.selectSocialStoreOption,
    page: cyberFarmWarehousePagePath,
    required: ECyberfarmTutorialActions.openSocialStore,
  },
  {
    action: ECyberfarmTutorialActions.submitSocialStoreOption,
    page: cyberFarmWarehousePagePath,
    required: ECyberfarmTutorialActions.openSocialStore,
  },
  {
    text: finishText,
    page: cyberFarmWarehousePagePath,
  },
];
