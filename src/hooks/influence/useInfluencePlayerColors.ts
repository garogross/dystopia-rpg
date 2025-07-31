import { useAppSelector } from "../redux";

const RIVAL_COLOR = "#e6194b";

export const useInfluencePlayerColors = () => {
  const tgId = useAppSelector((state) => state.profile.tgId);
  const monoColorSchemeEnabled = useAppSelector(
    (state) => state.influence.settings.monoColorSchemeEnabled
  );
  const playerColors = useAppSelector(
    (state) => state.influence.map.playerColors
  );

  const getPlayerColors = (ownerId: number) => {
    if (monoColorSchemeEnabled && ownerId !== tgId) return RIVAL_COLOR;
    else return playerColors[ownerId];
  };

  return getPlayerColors;
};
