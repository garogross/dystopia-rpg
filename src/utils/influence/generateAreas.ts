import { EHexDirections } from "../../constants/influence/EHexDirections";
import { IHex } from "../../models/Influence/IHex";
import { getHexPixelPositions } from "./getHexPixelPositions";

const getHexPoints = (size: number): [number, number][] => {
  const r = size / 2;
  const borderWidth = 1;
  return [
    [r, borderWidth] as [number, number], // top
    [size - borderWidth, size * 0.25] as [number, number], // top-right
    [size - borderWidth, size * 0.75] as [number, number], // bottom-right
    [r, size - borderWidth] as [number, number], // bottom
    [borderWidth, size * 0.75] as [number, number], // bottom-left
    [borderWidth, size * 0.25] as [number, number], // top-left
  ];
};

const directionToLine = {
  [EHexDirections.TopRight]: [0, 1],
  [EHexDirections.Right]: [1, 2],
  [EHexDirections.BottomRight]: [2, 3],
  [EHexDirections.BottomLeft]: [3, 4],
  [EHexDirections.Left]: [4, 5],
  [EHexDirections.TopLeft]: [5, 0],
};

export const generateAreas = (
  hexesWithBorders: IHex[],
  areaType: "ownerBorders" | "bonusAreaBorders",
  size: number,
  getPlayerColor?: (ownerId: number) => string
) => {
  return hexesWithBorders.reduce((acc, cur) => {
    const points = getHexPoints(size * 2);
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
        };
      }
      if (getPlayerColor) acc[cur[id]].color = getPlayerColor(+cur[id]);
    }
    return acc;
  }, {} as Record<string, { borderLines: { start: [number, number]; end: [number, number] }[]; color?: string }>);
};
