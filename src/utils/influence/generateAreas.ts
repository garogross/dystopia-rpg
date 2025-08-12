import { EHexDirections } from "../../constants/influence/EHexDirections";
import { IHex } from "../../models/Influence/IHex";
import { getHexPixelPositions } from "./getHexPixelPositions";
import { getHexPoints } from "./getHexPoints";

const directionToLine = {
  [EHexDirections.TopRight]: [0, 1],
  [EHexDirections.Right]: [1, 2],
  [EHexDirections.BottomRight]: [2, 3],
  [EHexDirections.BottomLeft]: [3, 4],
  [EHexDirections.Left]: [4, 5],
  [EHexDirections.TopLeft]: [5, 0],
};

type BorderLine = { start: [number, number]; end: [number, number] };
type AreaResult = Record<string, { borderLines: BorderLine[]; color: string }>;

// Overload 1
export function generateAreas(
  hexesWithBorders: IHex[],
  areaType: "ownerBorders",
  size: number,
  getPlayerColor: (ownerId: number) => string
): AreaResult;

// Overload 2
export function generateAreas(
  hexesWithBorders: IHex[],
  areaType: "bonusAreaBorders",
  size: number,
  getPlayerColor: undefined,
  defaultColor?: string
): AreaResult;

// Implementation
export function generateAreas(
  hexesWithBorders: IHex[],
  areaType: "ownerBorders" | "bonusAreaBorders",
  size: number,
  getPlayerColor?: (ownerId: number) => string,
  defaultColor?: string
): AreaResult {
  return hexesWithBorders.reduce((acc, cur) => {
    const points = getHexPoints(size * 2, areaType === "ownerBorders" ? 2 : 1);
    const id = areaType === "ownerBorders" ? "owner_id" : "bonus_area_id";

    if (cur[areaType] && cur[id]) {
      const { left, top } = getHexPixelPositions({ x: cur.x, z: cur.z }, size);

      const borderPoints = cur[areaType].map((border) => {
        const line = directionToLine[border];
        const start: [number, number] = [
          points[line[0]][0] + left,
          points[line[0]][1] + top,
        ];
        const end: [number, number] = [
          points[line[1]][0] + left,
          points[line[1]][1] + top,
        ];
        return { start, end };
      });

      if (acc[cur[id]]) {
        acc[cur[id]].borderLines.push(...borderPoints);
      } else {
        acc[cur[id]] = {
          borderLines: borderPoints,
          color: getPlayerColor?.(+cur[id]) || defaultColor || "",
        };
      }

      if (getPlayerColor) {
        acc[cur[id]].color = getPlayerColor(+cur[id]);
      }
    }
    return acc;
  }, {} as AreaResult);
}
