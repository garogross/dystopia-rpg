import { useEffect } from "react";
import { ELanguages } from "../../../../constants/ELanguages";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useSoltAd } from "../../../../hooks/useSlotAd";
import { EAdSlots } from "../../../../constants/EAdSlots";
import LoyalitySupportProjectVideoTaskItemView from "./LoyalitySupportProjectVideoTaskItemView";

const { watchAdAndGetCpText } = TRANSLATIONS.common;

interface SlotAdTaskItemProps {
  gameInited: boolean;
  language: ELanguages;
  onLoadingUpdate: (loading: boolean) => void;
  disabled: boolean;
  slotId?: string; // defaults to EAdSlots.SupportProjectSlot
}

const LoyalitySupportProjectSlotAdTaskItem = ({
  gameInited,
  language,
  onLoadingUpdate,
  disabled,
  slotId = EAdSlots.SupportProjectSlot,
}: SlotAdTaskItemProps) => {
  const { onShow, showTooltip, tooltipText, loading } = useSoltAd(slotId);

  useEffect(() => {
    onLoadingUpdate(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <LoyalitySupportProjectVideoTaskItemView
      gameInited={gameInited}
      language={language}
      onShow={onShow}
      loading={loading}
      disabled={disabled}
      showTooltip={showTooltip}
      tooltipText={tooltipText}
      titleText={watchAdAndGetCpText[language]}
    />
  );
};

export default LoyalitySupportProjectSlotAdTaskItem;
