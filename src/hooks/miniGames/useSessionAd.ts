import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux";
import { useSoltAd } from "../useSlotAd";
import { EAdSlots } from "../../constants/EAdSlots";
import { updateLastAdViewDate } from "../../store/slices/miniGamesSlice";
import { SHOW_MINI_GAMES_SESSION_AD_INTERVAL } from "../../constants/miniGames/showMiniGamesSessionAdInterval";

export const useSessionAd = () => {
  const dispatch = useDispatch();
  const lastAdViewDate = useAppSelector(
    (state) => state.miniGames.lastAdViewDate
  );
  const { onShow, loading } = useSoltAd(
    EAdSlots.MiniGamesSessionSlot,
    undefined,
    undefined,
    () => {
      dispatch(updateLastAdViewDate());
    }
  );

  const onShowAd = () => {
    if (Date.now() - lastAdViewDate > SHOW_MINI_GAMES_SESSION_AD_INTERVAL) {
      onShow();
    }
  };

  return { loading, onShowAd };
};
