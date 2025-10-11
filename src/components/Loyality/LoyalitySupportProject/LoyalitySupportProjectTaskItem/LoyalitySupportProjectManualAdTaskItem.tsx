import { useEffect } from "react";
import { ELanguages } from "../../../../constants/ELanguages";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useVideoAd } from "../../../../hooks/useVideoAd";
import LoyalitySupportProjectVideoTaskItemView from "./LoyalitySupportProjectVideoTaskItemView";
import { AdRewardValidPairsType } from "../../../../types/tasks/AdRewardValidPairsType";

const { watchAdAndGetCpText } = TRANSLATIONS.common;
const { perDayText } = TRANSLATIONS.loyality.supportProject;

type ManualAdTaskItemProps = AdRewardValidPairsType & {
  gameInited: boolean;
  language: ELanguages;
  onLoadingUpdate: (loading: boolean) => void;
  disabled: boolean;
  adId?: string; // optional
  scsClb?: (id?: string) => void;
  index?: number;
};

const LoyalitySupportProjectManualAdTaskItem = ({
  gameInited,
  language,
  onLoadingUpdate,
  disabled,
  provider,
  ad_type,
  adId,
  scsClb,
  index,
}: ManualAdTaskItemProps) => {
  const {
    onShowAd,
    showTooltip,
    tooltipText,
    maxPerDay,
    viewsInDay,
    loading,
    amount,
  } = useVideoAd({
    scsClb,
    index,
    adId,
    ...({ ad_type, provider } as AdRewardValidPairsType),
  });

  useEffect(() => {
    onLoadingUpdate(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // Build title text with reward amount
  const titleText = watchAdAndGetCpText(amount)[language];

  // Build description text with viewsInDay/maxPerDay
  const descriptionText = `${viewsInDay}/${maxPerDay} ${perDayText[language]}`;

  return (
    <LoyalitySupportProjectVideoTaskItemView
      gameInited={gameInited}
      language={language}
      onShow={onShowAd}
      loading={loading}
      disabled={disabled}
      showTooltip={showTooltip}
      tooltipText={tooltipText}
      titleText={titleText}
      descriptionText={descriptionText}
    />
  );
};

export default LoyalitySupportProjectManualAdTaskItem;
