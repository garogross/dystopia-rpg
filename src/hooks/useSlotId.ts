import { useState } from "react";
import { EAdActionTypes } from "../constants/EadActionTypes";
import { EadProviders } from "../constants/EadProviders";
import { claimAdReward, getAdMeditation } from "../store/slices/tasksSlice";
import { AdRewardValidPairsType } from "../types/tasks/AdRewardValidPairsType";
import { useAppDispatch, useAppSelector } from "./redux";
import { useGlobalAdController } from "./useGlobalAdController";
import { TRANSLATIONS } from "../constants/TRANSLATIONS";
import { useTooltip } from "./useTooltip";
import { EMediationStatuses } from "../constants/EMediationStatuses";
import { getPlatformType } from "../utils/getPlatformType";
import { ClaimAdRewardActionType } from "../types/tasks/ClaimAdRewardActionType";

const {
  loadAdText,
  noAdText,
  slotInactiveText,
  limitReachedText,
  adAvailableInSecondsText,
  somethingWentWrong,
} = TRANSLATIONS.errors;
const { rewardReceivedText } = TRANSLATIONS.loyality.tabs.supportProject;

export const useSoltAd = (
  slotId: string,
  game_action?: ClaimAdRewardActionType,
  farm_slot?: string,
  scsClb?: () => void,
  successTooltipText?: string
) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const mediation = useAppSelector((state) => state.tasks.mediation);
  const successText = successTooltipText || rewardReceivedText[language];
  const [tooltipText, setTooltipText] = useState(successText);
  const [loading, setLoading] = useState(false);
  const isMobile = getPlatformType();
  const { show: showTooltip, openTooltip } = useTooltip();

  const curSlotDetails = mediation?.[slotId];
  const adType =
    curSlotDetails && "ad_type" in curSlotDetails
      ? curSlotDetails.ad_type
      : EAdActionTypes.Video;
  const provider =
    curSlotDetails && "provider" in curSlotDetails
      ? curSlotDetails.provider
      : EadProviders.Gigapub;

  const onSuccess = async () => {
    try {
      const res = await dispatch(
        claimAdReward({
          ad_type: adType,
          provider: provider,
          game_action,
          farm_slot,
        } as AdRewardValidPairsType)
      ).unwrap();
      setTooltipText(
        successText.replace(
          "NUMBER",
          (res.bonus_distribution?.final_production || 0).toString()
        )
      );
      await openTooltip();
      scsClb?.();
    } catch (error) {
      setTooltipText(somethingWentWrong[language]);
      openTooltip();
    }
  };

  const onError = (noAd?: boolean) => {
    setTooltipText((noAd ? noAdText : loadAdText)[language]);
    openTooltip();
  };

  const onShowAd = useGlobalAdController(
    adType,
    provider,
    "",
    onSuccess,
    onError,
    [],
    true
  );

  const onShow = async () => {
    setLoading(true);
    try {
      const res = await dispatch(
        getAdMeditation({ device: isMobile ? "mobile" : "desktop" })
      ).unwrap();

      const curSlot = res[slotId];
      if (curSlot) {
        switch (curSlot.status) {
          case EMediationStatuses.AdAvailable: {
            process.env.NODE_ENV === "development" ? onSuccess() : onShowAd();
            break;
          }
          case EMediationStatuses.NoAds: {
            setTooltipText(noAdText[language]);
            openTooltip();
            break;
          }
          case EMediationStatuses.Inactive: {
            setTooltipText(slotInactiveText[language]);
            openTooltip();
            break;
          }
          case EMediationStatuses.SlotCooldown: {
            setTooltipText(
              adAvailableInSecondsText[language](curSlot.seconds_left)
            );
            openTooltip();
            break;
          }
          case EMediationStatuses.AdLimit: {
            setTooltipText(limitReachedText[language]);
            openTooltip();
            break;
          }
        }
      } else {
        throw new Error("invalid slot id");
      }
    } catch (error) {
      setTooltipText(somethingWentWrong[language]);
      openTooltip();
    } finally {
      setLoading(false);
    }
  };

  return {
    tooltipText,
    showTooltip,
    onShow,
    loading,
  };
};
