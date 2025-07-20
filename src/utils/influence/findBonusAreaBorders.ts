import { EHexDirections } from "../../constants/influence/EHexDirections";
import { IHex } from "../../models/Influence/IHex";

// Directions in cube coordinates and their names
const HEX_DIRECTIONS = [
  { name: EHexDirections.TopRight, dx: +1, dy: 0, dz: -1 },
  { name: EHexDirections.Right, dx: +1, dy: -1, dz: 0 },
  { name: EHexDirections.BottomRight, dx: 0, dy: -1, dz: +1 },
  { name: EHexDirections.BottomLeft, dx: -1, dy: 0, dz: +1 },
  { name: EHexDirections.Left, dx: -1, dy: +1, dz: 0 },
  { name: EHexDirections.TopLeft, dx: 0, dy: +1, dz: -1 },
];

// Helper to make a unique key for a hex
const hexKey = (x: number, y: number, z: number) => `${x},${y},${z}`;

export function findBonusAreaBorders(hexes: IHex[]) {
  // Group hexes by bonus_area_id
  const areaMap = new Map<string, Set<string>>();
  // Group hexes by owner_id
  const ownerMap = new Map<number | null, Set<string>>();

  for (const hex of hexes) {
    // For bonus_area_id
    if (hex.bonus_area_id) {
      if (!areaMap.has(hex.bonus_area_id))
        areaMap.set(hex.bonus_area_id, new Set());
      areaMap.get(hex.bonus_area_id)!.add(hexKey(hex.x, hex.y, hex.z));
    }
    // For owner_id
    if (!ownerMap.has(hex.owner_id)) ownerMap.set(hex.owner_id, new Set());
    ownerMap.get(hex.owner_id)!.add(hexKey(hex.x, hex.y, hex.z));
  }

  return hexes.map((hex) => {
    let bonusAreaBorders: EHexDirections[] | undefined = undefined;
    let ownerBorders: EHexDirections[] | undefined = undefined;

    // Calculate bonusAreaBorders if applicable
    if (hex.bonus_area_id) {
      const areaSet = areaMap.get(hex.bonus_area_id)!;
      const borders: EHexDirections[] = [];
      for (const dir of HEX_DIRECTIONS) {
        const nx = hex.x + dir.dx;
        const ny = hex.y + dir.dy;
        const nz = hex.z + dir.dz;
        if (!areaSet.has(hexKey(nx, ny, nz))) {
          borders.push(dir.name);
        }
      }
      if (borders.length > 0) {
        bonusAreaBorders = borders;
      }
    }

    // Calculate ownerBorders if applicable
    if (hex.owner_id !== undefined) {
      const ownerSet = ownerMap.get(hex.owner_id)!;
      const borders: EHexDirections[] = [];
      for (const dir of HEX_DIRECTIONS) {
        const nx = hex.x + dir.dx;
        const ny = hex.y + dir.dy;
        const nz = hex.z + dir.dz;
        if (!ownerSet.has(hexKey(nx, ny, nz))) {
          borders.push(dir.name);
        }
      }
      if (borders.length > 0) {
        ownerBorders = borders;
      }
    }

    if (bonusAreaBorders || ownerBorders) {
      return {
        ...hex,
        ...(bonusAreaBorders ? { bonusAreaBorders } : {}),
        ...(ownerBorders ? { ownerBorders } : {}),
      };
    }
    return hex;
  });
}
