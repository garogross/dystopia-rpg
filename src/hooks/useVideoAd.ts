import { useState } from "react";
import { EAdTypes } from "../constants/EAdTypes";
import { ELSProps } from "../constants/ELSProps";
import { getLSItem, setLSItem } from "../helpers/localStorage";
import { claimVideoReward } from "../store/slices/tasksSlice";
// import { getPlatformType } from "../utils/getPlatformType";
import { useAppDispatch, useAppSelector } from "./redux";
import { useGlobalAdController } from "./useGlobalAdController";
import { useTooltip } from "./useTooltip";
import { TRANSLATIONS } from "../constants/TRANSLATIONS";
import { TranslationItemType } from "../types/TranslationItemType";

const THIRTY_SECONDS = 30 * 1000;

function setVideoAdLastViewDate() {
  setLSItem(
    ELSProps.videoAdLastViewDate,
    (Date.now() + THIRTY_SECONDS).toString()
  );
}

const { loadAdText, willBeAvailableFromSecondText } = TRANSLATIONS.errors;
const { rewardReceivedText } = TRANSLATIONS.loyality.tabs.supportProject;

export const useVideoAd = (
  scsClb?: () => void,
  speedUpCompleteText?: TranslationItemType
) => {
  const dispatch = useAppDispatch();
  const tgId = useAppSelector((state) => state.profile.tgId);
  const language = useAppSelector((state) => state.ui.language);
  const { show: showTooltip, openTooltip } = useTooltip();
  const [tooltipText, setTooltipText] = useState(loadAdText[language]);

  const onReward = () => {
    setVideoAdLastViewDate();
    if (scsClb) scsClb();
    else dispatch(claimVideoReward({ id: tgId.toString() }));
    setTooltipText((speedUpCompleteText || rewardReceivedText)[language]);
    openTooltip();
  };

  const onShowOnClickaAd = useGlobalAdController(
    EAdTypes.GIGA_V,
    "",
    onReward,
    openTooltip
  );

  async function canShowVideoAd() {
    const lastView = await getLSItem(ELSProps.videoAdLastViewDate);
    console.log({ lastView });

    if (!lastView) return true;
    const dif = Number(lastView) - Date.now();
    setTooltipText(
      willBeAvailableFromSecondText[language].replace(
        "NUMBER",
        Math.ceil(dif / 1000).toString()
      )
    );
    return Date.now() > Number(lastView);
  }

  const onShowAd = async () => {
    const showValidation = await canShowVideoAd();
    console.log({ showValidation });

    if (!showValidation) {
      openTooltip();
      return;
    }
    setTooltipText(loadAdText[language]);
    onShowOnClickaAd();
  };

  return {
    onShowAd,
    showTooltip,
    tooltipText,
  };
};
