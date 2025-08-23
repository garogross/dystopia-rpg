import { useEffect, useState } from "react";
import { EAdActionTypes } from "../constants/EadActionTypes";
import { EadProviders } from "../constants/EadProviders";
import { claimAdReward, getAdMeditation } from "../store/slices/tasksSlice";
import { AdRewardValidPairsType } from "../types/tasks/AdRewardValidPairsType";
import { useAppDispatch, useAppSelector } from "./redux";
import { useGlobalAdController } from "./useGlobalAdController";
import { TRANSLATIONS } from "../constants/TRANSLATIONS";
import { useTooltip } from "./useTooltip";
import { EMediationStatuses } from "../constants/EMediationStatuses";

const {
  loadAdText,
  noAdText,
  slotInactiveText,
  limitReachedText,
  adAvailableInSecondsText,
  somethingWentWrong,
} = TRANSLATIONS.errors;
const { rewardReceivedText } = TRANSLATIONS.loyality.tabs.supportProject;

export const useSoltAd = (slotId: string) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const mediation = useAppSelector((state) => state.tasks.mediation);
  const [tooltipText, setTooltipText] = useState(rewardReceivedText[language]);
  const [loading, setLoading] = useState(false);

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
      await dispatch(
        claimAdReward({
          ad_type: adType,
          provider: provider,
        } as AdRewardValidPairsType)
      ).unwrap();

      setTooltipText(rewardReceivedText[language]);
    } catch (error) {
      setTooltipText(somethingWentWrong[language]);
    } finally {
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
    [curSlotDetails]
  );

  useEffect(() => {
    if (mediation) {
      (async () => {
        try {
          const curSlot = mediation[slotId];
          if (curSlot) {
            switch (curSlot.status) {
              case EMediationStatuses.AdAvailable: {
                await onShowAd();
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
          setLoading(true);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediation]);

  const onShow = async () => {
    setLoading(true);
    try {
      await dispatch(getAdMeditation()).unwrap();
    } catch (error) {
      setTooltipText(somethingWentWrong[language]);
      openTooltip();
    } finally {
      setLoading(true);
    }
  };

  return {
    tooltipText,
    showTooltip,
    onShow,
    loading,
  };
};
