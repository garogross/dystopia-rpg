import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux";
import { updateLastAdViewDate } from "../../store/slices/miniGamesSlice";
import { SHOW_MINI_GAMES_SESSION_AD_INTERVAL } from "../../constants/miniGames/showMiniGamesSessionAdInterval";
import { useVideoAd } from "../useVideoAd";
import { EadProviders } from "../../constants/EadProviders";
import { EAdActionTypes } from "../../constants/EadActionTypes";

export const useSessionAd = () => {
  const dispatch = useDispatch();
  const lastAdViewDate = useAppSelector(
    (state) => state.miniGames.lastAdViewDate
  );

  const { onShowAd: onShow, loading } = useVideoAd({
    scsClb: () => {
      dispatch(updateLastAdViewDate());
    },
    provider: EadProviders.Gigapub,
    ad_type: EAdActionTypes.Video,
    claimAfterClb: true,
  });

  const onShowAd = () => {
    if (Date.now() - lastAdViewDate > SHOW_MINI_GAMES_SESSION_AD_INTERVAL) {
      onShow();
    }
  };

  return { loading, onShowAd };
};
