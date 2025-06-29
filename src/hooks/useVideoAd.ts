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

const THIRTY_MINUTES = 30 * 60 * 1000;

function setVideoAdLastViewDate() {
  setLSItem(
    ELSProps.videoAdLastViewDate,
    (Date.now() + THIRTY_MINUTES).toString()
  );
}

const { loadAdText, willBeAvailableFromMinuteText } = TRANSLATIONS.errors;

export const useVideoAd = (scsClb?: () => void) => {
  const dispatch = useAppDispatch();
  const tgId = useAppSelector((state) => state.profile.tgId);
  const language = useAppSelector((state) => state.ui.language);
  const { show: showTooltip, openTooltip } = useTooltip();
  const [tooltipText, setTooltipText] = useState(loadAdText[language]);

  const onReward = () => {
    setVideoAdLastViewDate();
    if (scsClb) scsClb();
    else dispatch(claimVideoReward({ id: tgId.toString() }));
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
      willBeAvailableFromMinuteText[language].replace(
        "NUMBER",
        Math.ceil(dif / 60000).toString()
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
