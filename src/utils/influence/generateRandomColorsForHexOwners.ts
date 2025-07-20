import { IHex } from "../../models/Influence/IHex";

export const generateRandomColorsForHexOwners = (
  hexes: IHex[],
  opacity: string,
  tgId: number | string
) => {
  const MY_COLOR = `rgba(15, 158, 96, ${opacity})`;
  const colors: Record<string, string> = {};
  for (const hex of hexes) {
    const owner = hex.owner_id;
    if (owner && !colors[owner]) {
      if (owner === +tgId) {
        colors[owner] = MY_COLOR;
      } else {
        colors[owner] = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, ${opacity})`;
      }
    }
  }

  return colors;
};
