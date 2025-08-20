import { useEffect, useState } from "react";
import { ELSProps } from "../constants/ELSProps";
import { getLSItem, setLSItem } from "../helpers/localStorage";
import { claimAdReward } from "../store/slices/tasksSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useGlobalAdController } from "./useGlobalAdController";
import { useTooltip } from "./useTooltip";
import { TRANSLATIONS } from "../constants/TRANSLATIONS";
import { TranslationItemType } from "../types/TranslationItemType";
import { EAdActionTypes } from "../constants/EadActionTypes";
import { EadProviders } from "../constants/EadProviders";
import { getVideoAdSettings } from "../utils/tasks/getVideoAdSettings";

const {
  loadAdText,
  noAdText,
  dailyLimitReachedText,
  hourlyLimitReachedText,
  adAvailableInSecondsText,
} = TRANSLATIONS.errors;
const { rewardReceivedText } = TRANSLATIONS.loyality.tabs.supportProject;
const { somethingWentWrong } = TRANSLATIONS.errors;

const getVideoAdViewTimestampsKey = (index?: number) =>
  index
    ? (`videoAdViewTimestamps${index + 1}` as ELSProps)
    : ELSProps.videoAdViewTimestamps;

async function getVideoAdViewTimestamps(index?: number): Promise<number[]> {
  try {
    const raw = await getLSItem(getVideoAdViewTimestampsKey(index));
    if (!raw) return [];
    if (typeof raw === "string") return JSON.parse(raw);
    if (Array.isArray(raw)) return raw;
    return [];
  } catch {
    return [];
  }
}

function saveVideoAdViewTimestamps(timestamps: number[], index?: number) {
  setLSItem(getVideoAdViewTimestampsKey(index), timestamps);
}

export const useVideoAd = ({
  scsClb,
  speedUpCompleteText,
  provider,
  index,
  adId,
  maxPerHourArg,
  maxPerDayArg,
  minPouseMsArg,
  adType,
}: {
  scsClb?: (id?: string) => void;
  speedUpCompleteText?: TranslationItemType;
  provider: EadProviders;
  index?: number;
  adId?: string;
  maxPerHourArg?: number;
  maxPerDayArg?: number;
  minPouseMsArg?: number;
  adType?: EAdActionTypes;
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const adRewardSettings = useAppSelector(
    (state) => state.tasks.adRewardSettings
  );
  const { show: showTooltip, openTooltip } = useTooltip();
  const [tooltipText, setTooltipText] = useState(loadAdText[language]);
  const [viewsInDay, setViewsInDay] = useState(0);
  const [loading, setLoading] = useState(false);

  const curSettings = getVideoAdSettings(
    adRewardSettings,
    provider,
    adType === EAdActionTypes.Interstitial
  );

  const maxPerHour = maxPerHourArg || curSettings.per_hour;
  const maxPerDay = maxPerDayArg || curSettings.per_day;
  const minPouseMs = minPouseMsArg || curSettings.pause_sec;

  const onReward = async (id?: string) => {
    try {
      // Сохраняем новый просмотр
      if (scsClb) await scsClb(id);
      else
        await dispatch(
          claimAdReward({
            ad_type: EAdActionTypes.Video,
            provider: EadProviders.Gigapub,
          })
        ).unwrap();
      const now = Date.now();
      let timestamps = await getVideoAdViewTimestamps(index);
      timestamps = timestamps?.filter((ts) => now - ts < 24 * 60 * 60 * 1000); // только за сутки
      timestamps?.push(now);
      saveVideoAdViewTimestamps(timestamps, index);
      setViewsInDay(timestamps?.length);

      setTooltipText((speedUpCompleteText || rewardReceivedText)[language]);
    } catch (error) {
      setTooltipText(somethingWentWrong[language]);
    } finally {
      openTooltip();
    }
  };

  const onShowOnClickaAd = useGlobalAdController(
    adType || EAdActionTypes.Video,
    provider,
    adId || "",
    onReward,
    (noAd) => {
      if (noAd) setTooltipText(noAdText[language]);
      openTooltip();
    }
  );

  async function canShowVideoAd(isInit?: boolean) {
    try {
      const now = Date.now();
      const timestamps = await getVideoAdViewTimestamps(index);
      const last24h = timestamps.filter((ts) => now - ts < 24 * 60 * 60 * 1000);
      const lastHour = timestamps.filter((ts) => now - ts < 60 * 60 * 1000);
      const last =
        timestamps.length > 0 ? timestamps[timestamps.length - 1] : 0;

      if (isInit) {
        setViewsInDay(last24h.length);
        return true;
      } // for update viewsInDay on mount
      if (maxPerDay !== -1 && last24h.length >= maxPerDay) {
        setTooltipText(
          dailyLimitReachedText[language].replace(
            "NUMBER",
            maxPerDay.toString()
          )
        );
        return false;
      }
      if (maxPerHour !== -1 && lastHour.length >= maxPerHour) {
        setTooltipText(
          hourlyLimitReachedText[language].replace(
            "NUMBER",
            maxPerHour.toString()
          )
        );
        return false;
      }
      if (minPouseMs !== -1 && now - last < minPouseMs * 1000) {
        const seconds = Math.ceil((minPouseMs * 1000 - (now - last)) / 1000);
        setTooltipText(adAvailableInSecondsText[language](seconds));
        return false;
      }

      return true;
    } catch (error) {}
  }

  useEffect(() => {
    canShowVideoAd(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShowAd = async () => {
    setLoading(true);
    const showValidation = await canShowVideoAd();

    if (!showValidation) {
      openTooltip();
      setLoading(false);
      return;
    }
    setTooltipText(loadAdText[language]);
    await onShowOnClickaAd();
    setLoading(false);
  };

  return {
    onShowAd,
    showTooltip,
    tooltipText,
    loading,
    maxPerDay,
    viewsInDay,
    amount: curSettings.amount,
  };
};
