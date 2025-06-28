import { TRANSLATIONS } from "../TRANSLATIONS";

export enum ECyberfarmTutorialActions {
  openBuySlot = "cyberfarm_tutorial_openBuySlot_target",
  buySlot = "cyberfarm_tutorial_buySlot_target",
  openProduceModal = "cyberfarm_tutorial_openProduceModal_target",
  selectProduceRes = "cyberfarm_tutorial_selectProduceRes_target",
  produceRes = "cyberfarm_tutorial_produceRes_target",
  openProgressModal = "cyberfarm_tutorial_openProgressModal_target",
  speedUpProduce = "cyberfarm_tutorial_speedUpProduce_target",
  openStorage = "cyberfarm_tutorial_openStorage_target",
  openSocialStore = "cyberfarm_tutorial_openSocialStore_target",
  selectSocialStoreOption = "cyberfarm_tutorial_selectSocialStoreOption_target",
  submitSocialStoreOption = "cyberfarm_tutorial_submitSocialStoreOption_target",
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
  },
  {
    action: ECyberfarmTutorialActions.openBuySlot,
  },
  {
    action: ECyberfarmTutorialActions.buySlot,
  },
  {
    text: plantCactusText,
  },
  {
    action: ECyberfarmTutorialActions.openProduceModal,
  },
  {
    action: ECyberfarmTutorialActions.selectProduceRes,
  },
  {
    text: needResourcesText,
  },
  {
    action: ECyberfarmTutorialActions.produceRes,
  },
  {
    text: speedUpText,
  },
  {
    action: ECyberfarmTutorialActions.openProgressModal,
  },
  {
    action: ECyberfarmTutorialActions.speedUpProduce,
  },
  {
    text: speedUpCostText,
  },
  {
    action: ECyberfarmTutorialActions.openStorage,
  },
  {
    text: warehouseText,
  },
  {
    action: ECyberfarmTutorialActions.openSocialStore,
  },
  {
    text: socialStoreText,
  },

  {
    action: ECyberfarmTutorialActions.selectSocialStoreOption,
  },
  {
    action: ECyberfarmTutorialActions.submitSocialStoreOption,
  },
  {
    text: finishText,
  },
];
