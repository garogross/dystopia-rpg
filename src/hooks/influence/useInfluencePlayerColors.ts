import { useAppSelector } from "../redux";

const RIVAL_COLOR = "#e6194b";
const MY_COLOR = `#0f9e60`;

export const useInfluencePlayerColors = () => {
  const tgId = useAppSelector((state) => state.profile.tgId);
  const monoColorSchemeEnabled = useAppSelector(
    (state) => state.influence.settings.monoColorSchemeEnabled
  );
  const playerColors = useAppSelector(
    (state) => state.influence.map.playerColors
  );

  const getPlayerColors = (ownerId: number) => {
    if (monoColorSchemeEnabled) {
      if (ownerId !== tgId) {
        return RIVAL_COLOR;
      } else return MY_COLOR;
    } else return playerColors[ownerId];
  };

  return getPlayerColors;
};
