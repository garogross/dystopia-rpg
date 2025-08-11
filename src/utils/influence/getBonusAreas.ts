import { IHex } from "../../models/Influence/IHex";
import { getHexPixelPositions } from "./getHexPixelPositions";

type BonusArea = {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

export function getBonusAreas(hexes: IHex[], size: number): BonusArea[] {
  // Group hexes by bonus_area_id
  const areaMap = new Map<string, { left: number; top: number }[]>();
  for (const hex of hexes) {
    if (!hex.bonus_area_id) continue;
    const { left, top } = getHexPixelPositions({ x: hex.x, z: hex.z }, size);
    if (!areaMap.has(hex.bonus_area_id)) areaMap.set(hex.bonus_area_id, []);
    areaMap.get(hex.bonus_area_id)!.push({ left, top });
  }

  // Build the result
  const result: BonusArea[] = [];
  for (const [id, positions] of areaMap.entries()) {
    const lefts = positions.map((p) => p.left);
    const tops = positions.map((p) => p.top);
    const minLeft = Math.min(...lefts);
    const maxLeft = Math.max(...lefts);
    const minTop = Math.min(...tops);
    const maxTop = Math.max(...tops);
    result.push({
      id,
      left: minLeft + (maxLeft + size * 2 - minLeft) / 2,
      top: minTop + (maxTop + size * 2 - minTop) / 2,
      width: maxLeft - minLeft + size * 2,
      height: maxTop - minTop + size * 2,
    });
  }
  return result;
}
