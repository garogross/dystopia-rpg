import React, { useEffect, useRef, useState } from "react";
import styles from "./InfluenceMap.module.scss";
import DragAndZoomProvider, {
  OffsetType,
} from "../../../../providers/DragAndZoomProvider";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { IHex } from "../../../../models/Influence/IHex";
import {
  getMap,
  getPlayerColors,
} from "../../../../store/slices/influence/mapSlice";
import InfluenceMapControllModal from "../InfluenceMapControllModal/InfluenceMapControllModal";
import { getHexPixelPositions } from "../../../../utils/influence/getHexPixelPositions";
import InfluenceMapBonusAreas from "../InfluenceMapBonusAreas/InfluenceMapBonusAreas";
import InfluenceMapHexVector from "../InfluenceMapHexVector/InfluenceMapHexVector";
import { findBonusAreaBorders } from "../../../../utils/influence/findBonusAreaBorders";
import InfluenceMapSteptimer from "../InfluenceMapSteptimer/InfluenceMapSteptimer";
import InfluenceMapHexInfoModal from "../InfluenceMapHexVector/InfluenceMapHexInfoModal";
import { makeHexKey } from "../../../../utils/influence/makeHexKey";

const COLOR_OPACITY = "70"; // in hex
const BONUS_AREA_BORDER_COLOR = "#7f5cff";

const HEX_SIZE = 24;

const InfluenceMap = () => {
  const dispatch = useAppDispatch();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const hexes = useAppSelector((state) => state.influence.map.hexes);
  const playerColors = useAppSelector(
    (state) => state.influence.map.playerColors
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleHexes, setVisibleHexes] = useState<IHex[]>([]);
  const [offset, setOffset] = useState<OffsetType>({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState(1);

  const hexesWithBorders = findBonusAreaBorders(visibleHexes);

  const [selectedHexId, setSelectedHexId] = useState<string | null>(null);
  const [infoMoadlOpened, setInfoMoadlOpened] = useState(Boolean);

  const selectedHex =
    selectedHexId &&
    visibleHexes.find(({ x, y, z }) => makeHexKey(x, y, z) === selectedHexId);

  useEffect(() => {
    (async () => {
      await dispatch(getMap({ id: "1" }));
      await dispatch(getPlayerColors({ id: "1" }));
    })();
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
        const { left, top } = getHexPixelPositions(
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

  return (
    <div ref={containerRef} className={styles.influenceMap}>
      <InfluenceMapSteptimer />
      <InfluenceMapControllModal />
      <DragAndZoomProvider
        className={styles.influenceMap__inner}
        onUpdateEnd={(offset, scale) => {
          setOffset(offset);
          setScale(scale);
        }}
      >
        <InfluenceMapBonusAreas
          hexesWithBorders={hexesWithBorders}
          hexSize={HEX_SIZE}
        />
        {hexesWithBorders.map(
          ({ x, y, z, owner_id, ownerBorders, bonusAreaBorders }) => {
            const { left, top } = getHexPixelPositions({ x, z }, HEX_SIZE);
            const size = HEX_SIZE * 2;
            return (
              <button
                title={owner_id?.toString() || ""}
                onClick={() => {
                  setSelectedHexId(makeHexKey(x, y, z));
                  setInfoMoadlOpened(true);
                }}
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
                      ? playerColors[owner_id] + COLOR_OPACITY
                      : undefined,
                  }}
                  className={`${styles.influenceMap__hexInner} ${
                    x % 2 ? styles.influenceMap__hexInner_rotated : ""
                  }`}
                ></div>

                <InfluenceMapHexVector
                  className={styles.influenceMap__bonusAreaStroke}
                  stroke={(isBorder) =>
                    isBorder ? BONUS_AREA_BORDER_COLOR : "transparent"
                  }
                  strokeDash={(isBorder) => (isBorder ? "6,4" : undefined)}
                  borders={bonusAreaBorders}
                  size={size}
                />
                <InfluenceMapHexVector
                  className={styles.influenceMap__ownerAreaStroke}
                  stroke={(isBorder) =>
                    isBorder && owner_id
                      ? playerColors[owner_id]
                      : "transparent"
                  }
                  strokeWidth={(isBorder) => (isBorder ? 5 : undefined)}
                  borders={ownerBorders}
                  size={size}
                />
              </button>
            );
          }
        )}
        {/* <div className={styles.influenceMap__hex}></div> */}
      </DragAndZoomProvider>
      {selectedHex && (
        <InfluenceMapHexInfoModal
          hex={selectedHex}
          show={infoMoadlOpened}
          color={
            selectedHex.owner_id
              ? playerColors[selectedHex.owner_id]
              : undefined
          }
          onClose={() => setInfoMoadlOpened(false)}
        />
      )}
    </div>
  );
};

export default InfluenceMap;
