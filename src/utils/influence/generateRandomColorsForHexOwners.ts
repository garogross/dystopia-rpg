import { IHex } from "../../models/Influence/IHex";

export const generateRandomColorsForHexOwners = (
  hexes: IHex[],
  opacity: string
) => {
  const colors: Record<string, string> = {};
  for (const hex of hexes) {
    const orderId = hex.owner_id;
    if (orderId && !colors[orderId]) {
      colors[orderId] = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, ${opacity})`;
    }
  }

  return colors;
};
