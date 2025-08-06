import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
// import InfluenceMapBonusAreas from "../InfluenceMapBonusAreas/InfluenceMapBonusAreas";
import InfluenceMapHexVector from "../InfluenceMapHexVector/InfluenceMapHexVector";
import { findBonusAreaBorders } from "../../../../utils/influence/findBonusAreaBorders";
import InfluenceMapSteptimer from "../InfluenceMapSteptimer/InfluenceMapSteptimer";
import InfluenceMapHexInfoModal from "../InfluenceMapHexVector/InfluenceMapHexInfoModal";
import { makeHexKey } from "../../../../utils/influence/makeHexKey";
import { useInfluencePlayerColors } from "../../../../hooks/influence/useInfluencePlayerColors";
import { Application, Container, Graphics, Sprite } from "pixi.js";
import InfluenceMapBonusAreas from "../InfluenceMapBonusAreas/InfluenceMapBonusAreas";

const COLOR_OPACITY = "70"; // in hex
const BONUS_AREA_BORDER_COLOR = "#7f5cff";

const HEX_SIZE = 24;

// Draws a flat-topped hexagon (horizontal sides are flat, vertical sides are angled)
function drawHex(graphics: Graphics, color: number) {
  const r = HEX_SIZE;
  const points = [
    [r, 0], // top
    [2 * r, r * 0.5], // top-right
    [2 * r, r * 1.5], // bottom-right
    [r, 2 * r], // bottom
    [0, r * 1.5], // bottom-left
    [0, r * 0.5], // top-left
  ];

  // Start the path
  graphics.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    graphics.lineTo(points[i][0], points[i][1]);
  }
  graphics.lineTo(points[0][0], points[0][1]);

  // Fill and stroke using the modern API
  graphics.fill(color).stroke(0x333333);
}

const Hex = memo(
  ({
    x,
    y,
    z,
    owner_id,
    ownerBorders,
    bonusAreaBorders,
    onSelect,
    index,
  }: IHex & {
    onSelect: (x: IHex["x"], y: IHex["y"], z: IHex["z"]) => void;
    index: number;
  }) => {
    const getPlayerColor = useInfluencePlayerColors();

    const { left, top } = getHexPixelPositions({ x, z }, HEX_SIZE);
    const size = HEX_SIZE * 2;

    return (
      <button
        title={owner_id?.toString() || ""}
        onClick={() => {
          onSelect(x, y, z);
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
              ? getPlayerColor(owner_id) + COLOR_OPACITY
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
            isBorder && owner_id ? getPlayerColor(owner_id) : "transparent"
          }
          strokeWidth={(isBorder) => (isBorder ? 5 : undefined)}
          borders={ownerBorders}
          size={size}
        />
      </button>
    );
  },
  (prevProps, nextProps) => {
    // Compare only the fields that matter, deeply if needed
    return (
      prevProps.x === nextProps.x &&
      prevProps.y === nextProps.y &&
      prevProps.z === nextProps.z &&
      prevProps.owner_id === nextProps.owner_id
    );
  }
);

const InfluenceMap = () => {
  const dispatch = useAppDispatch();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const hexes = useAppSelector((state) => state.influence.map.hexes);
  const mapId = useAppSelector((state) => state.influence.map.mapId);
  const getPlayerColor = useInfluencePlayerColors();
  const pixiContainer = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application>();

  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleHexes, setVisibleHexes] = useState<IHex[]>([]);
  const [offset, setOffset] = useState<OffsetType>({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState(1);

  const hexesWithBorders = useMemo(
    () => findBonusAreaBorders(visibleHexes),
    [visibleHexes]
  );
  const [selectedHexId, setSelectedHexId] = useState<string | null>(null);
  const [infoMoadlOpened, setInfoMoadlOpened] = useState(Boolean);

  const selectedHex =
    selectedHexId &&
    visibleHexes.find(({ x, y, z }) => makeHexKey(x, y, z) === selectedHexId);

  useEffect(() => {
    if (!mapId) return;
    (async () => {
      await dispatch(getMap({ id: mapId.toString() }));
      await dispatch(getPlayerColors({ id: mapId.toString() }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapId]);

  useEffect(() => {
    if (!gameInited || !pixiContainer.current || !visibleHexes.length) return;
    (async () => {
      const app = new Application();
      await app.init({
        resizeTo: window,
        backgroundColor: 0x061639,
        // antialias: true,
      });

      // Wait for the next tick to ensure canvas is created
      if (app?.canvas && pixiContainer.current) {
        pixiContainer.current.appendChild(app.canvas);
      }
      appRef.current = app;

      const hexLayer = new Container();
      app.stage.addChild(hexLayer);

      // Draw only visible or initial chunk
      // For each visible hex, create a hex with a different fill (e.g. by owner_id color)
      console.log({ visibleHexes: visibleHexes.length });

      visibleHexes.forEach((hex) => {
        const { x, z, owner_id } = hex;
        const { left, top } = getHexPixelPositions({ x, z }, HEX_SIZE);

        // Determine fill color for this hex
        let fillColor = 0x55aa55; // default
        if (owner_id) {
          // Use the same color logic as in the React Hex component
          // getPlayerColor returns a hex string, so parse it to number
          let colorStr = getPlayerColor(owner_id);
          // Remove '#' if present and append opacity
          if (colorStr.startsWith("#")) colorStr = colorStr.slice(1);
          // Use only RGB, ignore opacity for Pixi
          fillColor = parseInt(colorStr.slice(0, 6), 16);
        }

        const graphics = new Graphics();
        drawHex(graphics, fillColor);

        const hexTexture = app.renderer.generateTexture(graphics);

        const sprite = new Sprite(hexTexture);
        sprite.x = left;
        sprite.y = top;
        sprite.anchor.set(0.5);
        hexLayer.addChild(sprite);
      });

      // Enable panning & zooming
      let dragging = false,
        lastX = 0,
        lastY = 0;
      app.view.addEventListener("mousedown", (e) => {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
      });
      app.view.addEventListener("mouseup", () => (dragging = false));
      app.view.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        hexLayer.x += e.clientX - lastX;
        hexLayer.y += e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
      });

      app.view.addEventListener("wheel", (e) => {
        const scale = e.deltaY < 0 ? 1.1 : 0.9;
        hexLayer.scale.x *= scale;
        hexLayer.scale.y *= scale;
      });
    })();

    // return () => app.destroy(true, true);
  }, [gameInited, visibleHexes]);

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
  const select = useCallback((x: number, y: number, z: number) => {
    setSelectedHexId(makeHexKey(x, y, z));
    setInfoMoadlOpened(true);
  }, []);
  return (
    <div ref={containerRef} className={styles.influenceMap}>
      <InfluenceMapSteptimer />
      <InfluenceMapControllModal />
      <div ref={pixiContainer} style={{ width: "100%", height: "100%" }} />
      {/* <DragAndZoomProvider
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
        {hexesWithBorders.map((hex, index) => {
          return (
            <Hex
              index={index}
              key={`${hex.x}-${hex.y}-${hex.z}`}
              {...hex}
              onSelect={select}
            />
          );
        })}
      </DragAndZoomProvider> */}
      {selectedHex && (
        <InfluenceMapHexInfoModal
          hex={selectedHex}
          show={infoMoadlOpened}
          color={
            selectedHex.owner_id
              ? getPlayerColor(selectedHex.owner_id)
              : undefined
          }
          onClose={() => setInfoMoadlOpened(false)}
        />
      )}
    </div>
  );
};

export default InfluenceMap;
