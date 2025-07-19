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
  for (const hex of hexes) {
    if (!hex.bonus_area_id) continue;
    if (!areaMap.has(hex.bonus_area_id))
      areaMap.set(hex.bonus_area_id, new Set());
    areaMap.get(hex.bonus_area_id)!.add(hexKey(hex.x, hex.y, hex.z));
  }

  return hexes.map((hex) => {
    if (!hex.bonus_area_id) return hex;
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
      return { ...hex, borders };
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
          ({ x, y, z, bonus_area_id, owner_id, borders }) => {
            const { left, top } = cubeToPixel({ x, z }, HEX_SIZE);
            const size = HEX_SIZE * 2;
            return (
              <button
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
                        : "rgba(191, 85, 86, 0.54)"
                      : undefined,
                  }}
                  className={`${styles.influenceMap__hexInner} ${
                    x % 2 ? styles.influenceMap__hexInner_rotated : ""
                  }`}
                ></div>
                {borders?.length && (
                  <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {borders?.map((dir) => {
                      const [startIdx, endIdx] = directionToLine[dir];
                      const points = getHexPoints(size);
                      const [x1, y1] = points[startIdx];
                      const [x2, y2] = points[endIdx];

                      return (
                        <line
                          key={dir}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#7F5CFF"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </svg>
                )}
                <svg
                  width={size}
                  height={size}
                  viewBox={`0 0 ${size} ${size}`}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                  }}
                >
                  {(() => {
                    // Draw all 6 borders of the hex
                    const points = getHexPoints(size);
                    return Array.from({ length: 6 }).map((_, i) => {
                      const [x1, y1] = points[i];
                      const [x2, y2] = points[(i + 1) % 6];
                      return (
                        <line
                          key={`full-${i}`}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#000"
                          strokeWidth="1"
                        />
                      );
                    });
                  })()}
                </svg>
                <span style={{ display: "none" }}>{borders?.join()}</span>
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
