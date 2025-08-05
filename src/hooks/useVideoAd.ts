import { useEffect, useState } from "react";
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
import { AD_LIMITS } from "../constants/adLimits";

const { MAX_PER_HOUR, MAX_PER_DAY, MIN_PAUSE_MS } = AD_LIMITS[EAdTypes.GIGA_V];

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
  adType,
  index,
  adId,
  maxPerHourArg,
  maxPerDayArg,
  minPouseMsArg,
}: {
  scsClb?: (id?: string) => void;
  speedUpCompleteText?: TranslationItemType;
  adType?: EAdTypes;
  index?: number;
  adId?: string;
  maxPerHourArg?: number; // -1 for avoid check
  maxPerDayArg?: number; // -1 for avoid check
  minPouseMsArg?: number; // -1 for avoid check
}) => {
  const dispatch = useAppDispatch();
  const tgId = useAppSelector((state) => state.profile.tgId);
  const language = useAppSelector((state) => state.ui.language);
  const { show: showTooltip, openTooltip } = useTooltip();
  const [tooltipText, setTooltipText] = useState(loadAdText[language]);
  const [viewsInDay, setViewsInDay] = useState(0);
  const [loading, setLoading] = useState(false);

  const maxPerHour = maxPerHourArg || MAX_PER_HOUR;
  const maxPerDay = maxPerDayArg || MAX_PER_DAY;
  const minPouseMs = minPouseMsArg || MIN_PAUSE_MS;

  const onReward = async (id?: string) => {
    try {
      // Сохраняем новый просмотр
      if (scsClb) await scsClb(id);
      else await dispatch(claimVideoReward({ id: tgId?.toString() })).unwrap();
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
    adType || EAdTypes.GIGA_V,
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
        setTooltipText(dailyLimitReachedText[language]);
        return false;
      }
      if (maxPerHour !== -1 && lastHour.length >= maxPerHour) {
        setTooltipText(hourlyLimitReachedText[language]);
        return false;
      }
      if (minPouseMs !== -1 && now - last < minPouseMs) {
        const seconds = Math.ceil((minPouseMs - (now - last)) / 1000);
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
    maxPerDay: MAX_PER_DAY,
    viewsInDay,
  };
};
