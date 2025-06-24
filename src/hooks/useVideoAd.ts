import { EAdTypes } from "../constants/EAdTypes";
import { claimVideoReward } from "../store/slices/tasksSlice";
// import { getPlatformType } from "../utils/getPlatformType";
import { useAppDispatch, useAppSelector } from "./redux";
import { useGlobalAdController } from "./useGlobalAdController";
import { useTooltip } from "./useTooltip";

export const useVideoAd = () => {
  const dispatch = useAppDispatch();
  const tgId = useAppSelector((state) => state.profile.tgId);
  const { show: showTooltip, openTooltip } = useTooltip();

  const onReward = () => dispatch(claimVideoReward({ id: tgId.toString() }));
  // const onShowAdsgramAd = useGlobalAdController(
  //   EAdTypes.ADSGRAM_V,
  //   "11778",
  //   onReward
  // );
  // const onShowOnClickaAd = useGlobalAdController(
  //   EAdTypes.ONCLICKA_V,
  //   "6079126",
  //   onReward,
  //   openTooltip
  // );
  const onShowOnClickaAd = useGlobalAdController(
    EAdTypes.GIGA_V,
    "",
    onReward,
    openTooltip
  );

  // const isMobile = getPlatformType();

  return {
    onShowAd: onShowOnClickaAd, // isMobile ? onShowAdsgramAd : onShowOnClickaAd,
    showTooltip,
  };
};
