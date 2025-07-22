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

const MAX_PER_HOUR = 10;
const MAX_PER_DAY = 100;
const MIN_PAUSE_MS = 60 * 1000; // 60 секунд

const {
  loadAdText,
  noAdText,
  dailyLimitReachedText,
  hourlyLimitReachedText,
  adAvailableInSecondsText,
} = TRANSLATIONS.errors;
const { rewardReceivedText } = TRANSLATIONS.loyality.tabs.supportProject;
const { somethingWentWrong } = TRANSLATIONS.errors;

async function getVideoAdViewTimestamps(index?: number): Promise<number[]> {
  const raw = await getLSItem(
    index ? ELSProps.videoAdViewTimestamps2 : ELSProps.videoAdViewTimestamps
  );
  if (!raw) return [];
  try {
    if (typeof raw === "string") return JSON.parse(raw);
    if (Array.isArray(raw)) return raw;
    return [];
  } catch {
    return [];
  }
}

function saveVideoAdViewTimestamps(timestamps: number[], index?: number) {
  setLSItem(
    index ? ELSProps.videoAdViewTimestamps2 : ELSProps.videoAdViewTimestamps,
    timestamps
  );
}

export const useVideoAd = (
  scsClb?: (id?: string) => void,
  speedUpCompleteText?: TranslationItemType,
  adType?: EAdTypes,
  index?: number
) => {
  const dispatch = useAppDispatch();
  const tgId = useAppSelector((state) => state.profile.tgId);
  const language = useAppSelector((state) => state.ui.language);
  const { show: showTooltip, openTooltip } = useTooltip();
  const [tooltipText, setTooltipText] = useState(loadAdText[language]);
  const [viewsInDay, setViewsInDay] = useState(0);

  const onReward = async (id?: string) => {
    try {
      // Сохраняем новый просмотр
      const now = Date.now();
      let timestamps = await getVideoAdViewTimestamps(index);
      timestamps = timestamps.filter((ts) => now - ts < 24 * 60 * 60 * 1000); // только за сутки
      timestamps.push(now);
      saveVideoAdViewTimestamps(timestamps, index);
      if (scsClb) await scsClb(id);
      else await dispatch(claimVideoReward({ id: tgId.toString() })).unwrap();
      setViewsInDay(timestamps.length);

      setTooltipText((speedUpCompleteText || rewardReceivedText)[language]);
    } catch (error) {
      setTooltipText(somethingWentWrong[language]);
    } finally {
      openTooltip();
    }
  };

  const { onShowAd: onShowOnClickaAd, loading } = useGlobalAdController(
    adType || EAdTypes.GIGA_V,
    "",
    onReward,
    (noAd) => {
      if (noAd) setTooltipText(noAdText[language]);
      openTooltip();
    }
  );

  async function canShowVideoAd(isInit?: boolean) {
    const now = Date.now();
    const timestamps = await getVideoAdViewTimestamps(index);
    const last24h = timestamps.filter((ts) => now - ts < 24 * 60 * 60 * 1000);
    const lastHour = timestamps.filter((ts) => now - ts < 60 * 60 * 1000);
    const last = timestamps.length > 0 ? timestamps[timestamps.length - 1] : 0;

    if (isInit) {
      setViewsInDay(last24h.length);
      return true;
    } // for update viewsInDay on mount
    if (last24h.length >= MAX_PER_DAY) {
      setTooltipText(dailyLimitReachedText[language]);
      return false;
    }
    if (lastHour.length >= MAX_PER_HOUR) {
      setTooltipText(hourlyLimitReachedText[language]);
      return false;
    }
    if (now - last < MIN_PAUSE_MS) {
      const seconds = Math.ceil((MIN_PAUSE_MS - (now - last)) / 1000);
      setTooltipText(adAvailableInSecondsText[language](seconds));
      return false;
    }

    return true;
  }

  useEffect(() => {
    canShowVideoAd(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShowAd = async () => {
    const showValidation = await canShowVideoAd();

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
    loading,
    maxPerDay: MAX_PER_DAY,
    viewsInDay,
  };
};
