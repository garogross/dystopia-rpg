import React, { useEffect, useRef, useState } from "react";
import styles from "./InfluenceMap.module.scss";
import DragAndZoomProvider, {
  OffsetType,
} from "../../../../providers/DragAndZoomProvider";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { IHex } from "../../../../models/Influence/IHex";
import { attackHex, getMap } from "../../../../store/slices/influence/mapSlice";
import { EHexDirections } from "../../../../constants/influence/EHexDirections";
import { useTooltip } from "../../../../hooks/useTooltip";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import InfluenceMapControllModal from "../InfluenceMapControllModal/InfluenceMapControllModal";

type BonusArea = {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

const COLOR_OPACITY = "0.44";

const { notEnoughActionPointsText, hexOccupiedText, hexAttackedText } =
  TRANSLATIONS.influence.map;
const { somethingWentWrong } = TRANSLATIONS.errors;
function getBonusAreas(hexes: IHex[], size: number): BonusArea[] {
  // Group hexes by bonus_area_id
  const areaMap = new Map<string, { left: number; top: number }[]>();
  for (const hex of hexes) {
    if (!hex.bonus_area_id) continue;
    const { left, top } = cubeToPixel({ x: hex.x, z: hex.z }, size);
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
      left: minLeft - size,
      top: minTop - size,
      width: maxLeft - minLeft + size * 2,
      height: maxTop - minTop + size * 2,
    });
  }
  return result;
}

const cubeToPixel = ({ x, z }: { x: number; z: number }, size: number) => {
  const width = Math.sqrt(4) * size; // ~1.732 * size
  // size * (SQRT_3 * x + (SQRT_3 / 2) * z);

  const xOffset = width * (x + z / 2); // staggered columns
  const yOffset = (3 / 2) * size * z; // vertical spacing

  return {
    left: xOffset,
    top: yOffset,
  };
};

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

function findBonusAreaBorders(hexes: IHex[]) {
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

const getHexPoints = (size: number) => {
  const r = size / 2;
  return [
    [r, 0], // top
    [size, size * 0.25], // top-right
    [size, size * 0.75], // bottom-right
    [r, size], // bottom
    [0, size * 0.75], // bottom-left
    [0, size * 0.25], // top-left
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

const HEX_SIZE = 24;

const InfluenceMap = () => {
  const dispatch = useAppDispatch();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const tgId = useAppSelector((state) => state.profile.tgId);
  const mapId = useAppSelector((state) => state.influence.map.mapId);
  const hexes = useAppSelector((state) => state.influence.map.hexes);
  const actionPoints = useAppSelector(
    (state) => state.influence.influence.actionPoints
  );
  const attackEnemyHexWithoutBuilding = useAppSelector(
    (state) => state.influence.settings.attackEnemyHexWithoutBuilding
  );
  const attackNeutralHex = useAppSelector(
    (state) => state.influence.settings.attackNeutralHex
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleHexes, setVisibleHexes] = useState<IHex[]>([]);
  const [offset, setOffset] = useState<OffsetType>({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState(1);
  const [tooltipText, setTooltipText] = useState(hexOccupiedText);
  const { show: showTooltip, openTooltip } = useTooltip();

  const hexesWithBorders = findBonusAreaBorders(visibleHexes);

  const bonusAreas = getBonusAreas(hexesWithBorders, HEX_SIZE);

  const ownerIdColors: Record<string, string> = {};
  for (const hex of hexes) {
    const orderId = hex.owner_id;
    if (orderId && !ownerIdColors[orderId]) {
      ownerIdColors[orderId] = `rgba(${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${COLOR_OPACITY})`;
    }
  }

  useEffect(() => {
    dispatch(getMap({ id: "1" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gameInited && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width + HEX_SIZE;
      const containerHeight = containerRect.height + HEX_SIZE;
      // Center the map so that (0,0) is in the center of the container
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      const visibleHexes = hexes.filter((hex) => {
        const { left, top } = cubeToPixel(
          { x: hex.x, z: hex.z },
          HEX_SIZE * scale
        );

        // Adjust so that (0,0) is at the center, then apply offset
        const screenLeft = left + offset.x + centerX;
        const screenTop = top + offset.y + centerY;

        return (
          screenLeft + HEX_SIZE * 2 > 0 &&
          screenLeft < containerWidth &&
          screenTop + HEX_SIZE * 2 > 0 &&
          screenTop < containerHeight
        );
      });
      setVisibleHexes(visibleHexes);
    }
  }, [gameInited, containerRef, hexes, scale, offset.x, offset.y]);

  const onAttack = async ({
    x,
    y,
    z,
    owner_id,
  }: {
    x: IHex["x"];
    y: IHex["y"];
    z: IHex["z"];
    owner_id: IHex["owner_id"];
  }) => {
    if (!mapId || owner_id === tgId) return;
    if (
      (owner_id &&
        actionPoints < attackEnemyHexWithoutBuilding.actionPointsCost) ||
      (!owner_id && actionPoints < attackNeutralHex.actionPointsCost)
    ) {
      setTooltipText(notEnoughActionPointsText);
      openTooltip();
      return;
    }
    try {
      const res = await dispatch(attackHex({ x, y, z, mapId: mapId })).unwrap();

      setTooltipText(res.captured ? hexOccupiedText : hexAttackedText);

      openTooltip();
    } catch (error) {
      setTooltipText(somethingWentWrong);
      openTooltip();
    }
  };

  return (
    <div ref={containerRef} className={styles.influenceMap}>
      <InfluenceMapControllModal />
      <DragAndZoomProvider
        className={styles.influenceMap__inner}
        onUpdateEnd={(offset, scale) => {
          setOffset(offset);
          setScale(scale);
        }}
      >
        {bonusAreas.map(({ id, width, height, top, left }) => (
          <p
            id={id}
            key={id}
            className={styles.influenceMap__bonusArea}
            style={{
              // width,
              // height,
              top: top + height / 2,
              left: left + width / 2,
            }}
          >
            {id}
          </p>
        ))}
        {hexesWithBorders.map(
          ({ x, y, z, owner_id, ownerBorders, bonusAreaBorders }) => {
            const { left, top } = cubeToPixel({ x, z }, HEX_SIZE);
            const size = HEX_SIZE * 2;
            return (
              <button
                title={owner_id?.toString() || ""}
                onClick={() => onAttack({ x, y, z, owner_id })}
                key={`${x},${y},${z}`}
                className={styles.influenceMap__hex}
                style={{
                  left,
                  top,
                  width: size,
                  height: size,
                }}
              >
                <div
                  style={{
                    backgroundColor: owner_id
                      ? owner_id === tgId
                        ? "#0F9E604D"
                        : ownerIdColors[owner_id]
                      : undefined,
                  }}
                  className={`${styles.influenceMap__hexInner} ${
                    x % 2 ? styles.influenceMap__hexInner_rotated : ""
                  }`}
                ></div>

                <svg
                  className={styles.influenceMap__bonusAreaStroke}
                  width={size}
                  height={size}
                  viewBox={`0 0 ${size} ${size}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {getHexPoints(size).map((_, idx, points) => {
                    // Each side is from idx to (idx+1)%6
                    const startIdx = idx;
                    const endIdx = (idx + 1) % points.length;
                    const [x1, y1] = points[startIdx];
                    const [x2, y2] = points[endIdx];
                    // Find direction key for this side
                    // directionToLine: { [dir]: [startIdx, endIdx] }
                    // We need to find if this side is in borders
                    let isBorder = false;
                    if (bonusAreaBorders && bonusAreaBorders.length > 0) {
                      isBorder = bonusAreaBorders.some((dir) => {
                        const [dStart, dEnd] = directionToLine[dir];
                        return (
                          (dStart === startIdx && dEnd === endIdx) ||
                          (dStart === endIdx && dEnd === startIdx)
                        );
                      });
                    }
                    return (
                      <line
                        key={idx}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isBorder ? "#7F5CFF" : "transparent"}
                        strokeDasharray={isBorder ? "6,4" : undefined}
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
                <svg
                  className={styles.influenceMap__ownerAreaStroke}
                  width={size}
                  height={size}
                  viewBox={`0 0 ${size} ${size}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {getHexPoints(size).map((_, idx, points) => {
                    // Each side is from idx to (idx+1)%6
                    const startIdx = idx;
                    const endIdx = (idx + 1) % points.length;
                    const [x1, y1] = points[startIdx];
                    const [x2, y2] = points[endIdx];
                    // Find direction key for this side
                    // directionToLine: { [dir]: [startIdx, endIdx] }
                    // We need to find if this side is in borders
                    let isBorder = false;
                    if (ownerBorders && ownerBorders.length > 0) {
                      isBorder = ownerBorders.some((dir) => {
                        const [dStart, dEnd] = directionToLine[dir];
                        return (
                          (dStart === startIdx && dEnd === endIdx) ||
                          (dStart === endIdx && dEnd === startIdx)
                        );
                      });
                    }
                    return (
                      <line
                        key={idx}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={
                          isBorder && owner_id
                            ? ownerIdColors[owner_id].replace(
                                COLOR_OPACITY,
                                "1"
                              )
                            : "transparent"
                        }
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </button>
            );
          }
        )}
        {/* <div className={styles.influenceMap__hex}></div> */}
      </DragAndZoomProvider>
      <Tooltip show={showTooltip} text={tooltipText[language]} />
    </div>
  );
};

export default InfluenceMap;
