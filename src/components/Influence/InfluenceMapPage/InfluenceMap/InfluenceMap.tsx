import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./InfluenceMap.module.scss";

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { IHex } from "../../../../models/Influence/IHex";
import {
  getMap,
  getPlayerColors,
} from "../../../../store/slices/influence/mapSlice";
import InfluenceMapControllModal from "../InfluenceMapControllModal/InfluenceMapControllModal";
import { getHexPixelPositions } from "../../../../utils/influence/getHexPixelPositions";
// import InfluenceMapBonusAreas from "../InfluenceMapBonusAreas/InfluenceMapBonusAreas";
import { findBonusAreaBorders } from "../../../../utils/influence/findBonusAreaBorders";
import InfluenceMapSteptimer from "../InfluenceMapSteptimer/InfluenceMapSteptimer";
import InfluenceMapHexInfoModal from "../InfluenceMapHexVector/InfluenceMapHexInfoModal";
import { makeHexKey } from "../../../../utils/influence/makeHexKey";
import { useInfluencePlayerColors } from "../../../../hooks/influence/useInfluencePlayerColors";
import {
  Application,
  Assets,
  Container,
  Sprite,
  ColorMatrixFilter,
  Graphics,
} from "pixi.js";
import {
  influenceHexImage,
  influenceHexReversedImage,
} from "../../../../assets/imageMaps";
import { EHexDirections } from "../../../../constants/influence/EHexDirections";
import { generateAreas } from "../../../../utils/influence/generateAreas";
import { generateAreaSVGs } from "../../../../utils/influence/generateAreaSVGs";
import { generateAndAddAreaGraphics } from "../../../../utils/influence/generateAreaGraphics";

type OffsetType = {
  x: number;
  y: number;
};

const BONUS_AREA_BORDER_COLOR = "#7f5cff";

const HEX_SIZE = 24;

// Load the hex texture once
let hexTexture: any = null;
let hexTextureReversed: any = null;
async function getHexTexture() {
  if (!hexTexture) {
    hexTexture = await Assets.load(influenceHexImage);
  }
  return hexTexture;
}
async function getReversedHexTexture() {
  if (!hexTextureReversed) {
    hexTextureReversed = await Assets.load(influenceHexReversedImage);
  }
  return hexTextureReversed;
}

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

const InfluenceMap = () => {
  const dispatch = useAppDispatch();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const hexes = useAppSelector((state) => state.influence.map.hexes);
  const mapId = useAppSelector((state) => state.influence.map.mapId);
  const getPlayerColor = useInfluencePlayerColors();
  const pixiContainer = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application>();
  const hexLayerRef = useRef<Container>();

  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleHexes, setVisibleHexes] = useState<IHex[]>([]);
  const [offset, setOffset] = useState<OffsetType>({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

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
    if (!gameInited || !pixiContainer.current) return;
    const initPixiMap = async () => {
      const app = new Application();
      await app.init({
        resizeTo: pixiContainer.current as HTMLElement,
        backgroundAlpha: 0,
        antialias: true, // Enable antialiasing for better quality
        resolution: window.devicePixelRatio || 1, // Use device pixel ratio for crisp rendering
      });

      // Wait for the next tick to ensure canvas is created
      if (app?.canvas && pixiContainer.current) {
        pixiContainer.current.appendChild(app.canvas);
      }
      appRef.current = app;

      const hexLayer = new Container();
      app.stage.addChild(hexLayer);
      hexLayerRef.current = hexLayer;

      hexLayer.x = app.screen.width / 2;
      hexLayer.y = app.screen.height / 2;

      // Set initial offset to 0 since we're already centered
      setOffset({ x: 0, y: 0 });
      setIsInitialized(true);

      // Enable panning & zooming
      let dragging = false,
        lastX = 0,
        lastY = 0;
      app.canvas.addEventListener("mousedown", (e) => {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
      });
      const onMouseUp = () => {
        setOffset({
          x: hexLayer.x - app.screen.width / 2,
          y: hexLayer.y - app.screen.height / 2,
        });
        setScale(hexLayer.scale.y);
        dragging = false;
      };
      app.canvas.addEventListener("mouseup", onMouseUp);
      app.canvas.addEventListener("mouseleave", onMouseUp);
      app.canvas.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        hexLayer.x += e.clientX - lastX;
        hexLayer.y += e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
      });

      app.canvas.addEventListener("wheel", (e) => {
        const scale = e.deltaY < 0 ? 1.1 : 0.9;
        const minScale = 0.1;
        const maxScale = 1.3;
        let newScaleX = hexLayer.scale.x * scale;
        let newScaleY = hexLayer.scale.y * scale;
        // Clamp the scale values
        newScaleX = Math.max(minScale, Math.min(maxScale, newScaleX));
        newScaleY = Math.max(minScale, Math.min(maxScale, newScaleY));
        hexLayer.scale.x = newScaleX;
        hexLayer.scale.y = newScaleY;
      });
    };

    initPixiMap();

    // return () => app.destroy(true, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameInited]);

  const ownedAreas = generateAreas(
    hexesWithBorders,
    "ownerBorders",
    HEX_SIZE,
    getPlayerColor
  );
  const ownedAreaSVGs = generateAreaSVGs(ownedAreas);

  const updateCanvas = async () => {
    if (!hexLayerRef.current) return;
    hexLayerRef.current.removeChildren();

    // Load the hex texture
    const hexTexture = await getHexTexture();
    const hexTextureReversed = await getReversedHexTexture();

    hexesWithBorders.forEach((hex) => {
      const { x, z, owner_id } = hex;
      const { left, top } = getHexPixelPositions({ x, z }, HEX_SIZE);

      // Create sprite with the hex image
      const sprite = new Sprite(x % 2 ? hexTexture : hexTextureReversed);
      // Position relative to the center (0,0) hex - no need to adjust since the layer is already centered
      sprite.x = left;
      sprite.y = top;
      // Set the width and height of the sprite
      sprite.width = HEX_SIZE * 2; // Set width to match hex size
      sprite.height = HEX_SIZE * 2; // Set height to match hex size
      // sprite.anchor.set(0.5);

      // Apply tint based on owner_id if present
      if (owner_id) {
        // Use the same color logic as in the React Hex component
        let colorStr = getPlayerColor(owner_id);
        // Remove '#' if present
        if (colorStr.startsWith("#")) colorStr = colorStr.slice(1);
        // Convert to number for Pixi tint
        const tintColor = parseInt(colorStr, 16);
        sprite.tint = tintColor;

        // Add highlight effect using ColorMatrixFilter
        const brightnessFilter = new ColorMatrixFilter();
        brightnessFilter.brightness(2, false); // Make it 50% brighter for more dramatic effect
        sprite.filters = [brightnessFilter];
      } else {
        // For unowned hexes, make them more muted
        sprite.alpha = 0.6;
      }

      const getHexPoints = (size: number) => {
        const r = size / 2;
        const borderWidth = 0;
        return [
          [r, borderWidth], // top
          [size - borderWidth, size * 0.25], // top-right
          [size - borderWidth, size * 0.75], // bottom-right
          [r, size - borderWidth], // bottom
          [borderWidth, size * 0.75], // bottom-left
          [borderWidth, size * 0.25], // top-left
        ];
      };

      const getSvg = () => {
        const points = getHexPoints(HEX_SIZE * 2);

        const lines = points.map((_, idx) => {
          const startIdx = idx;
          const endIdx = (idx + 1) % points.length;
          const [x1, y1] = points[startIdx];
          const [x2, y2] = points[endIdx];

          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" stroke-linecap="round" />`;
        });

        const width = HEX_SIZE * 2 - 30;
        const height = HEX_SIZE * 2 - 30;

        return `<svg xmlns="http://www.w3.org/2000/svg"    width="${width}" height="${height}">${lines.join(
          ""
        )}</svg>`;
      };
      const graphics = new Graphics();
      graphics.svg(getSvg());
      graphics.x = left;
      graphics.y = top;
      hexLayerRef.current?.addChild(sprite);
      hexLayerRef.current?.addChild(graphics);
    });

    generateAndAddAreaGraphics(hexLayerRef.current, ownedAreaSVGs, 2);
  };

  useEffect(() => {
    if (hexLayerRef.current && visibleHexes.length > 0) {
      updateCanvas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleHexes, isInitialized]);

  useEffect(() => {
    if (gameInited && containerRef.current && appRef.current && isInitialized) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // Calculate the visible area in hex coordinates
      // Since the hex layer is centered, we need to account for the offset from the center
      const visibleHexes = hexes.filter((hex) => {
        const { left, top } = getHexPixelPositions(
          { x: hex.x, z: hex.z },
          HEX_SIZE * scale
        );

        // The hex layer is centered, so we need to check if the hex is within the visible area
        // The visible area is from -containerWidth/2 to containerWidth/2 and -containerHeight/2 to containerHeight/2
        // Since the hex layer is centered, the hex positions are relative to the center
        const screenLeft = left + offset.x;
        const screenTop = top + offset.y;

        // Check if the hex is within the visible area
        return (
          screenLeft + HEX_SIZE * 2 > -containerWidth / 2 &&
          screenLeft < containerWidth / 2 &&
          screenTop + HEX_SIZE * 2 > -containerHeight / 2 &&
          screenTop < containerHeight / 2
        );
      });
      setVisibleHexes(visibleHexes);
    }
  }, [
    gameInited,
    containerRef,
    hexes,
    scale,
    offset.x,
    offset.y,
    isInitialized,
  ]);
  const select = useCallback((x: number, y: number, z: number) => {
    setSelectedHexId(makeHexKey(x, y, z));
    setInfoMoadlOpened(true);
  }, []);
  return (
    <div ref={containerRef} className={styles.influenceMap}>
      <InfluenceMapSteptimer />
      <InfluenceMapControllModal />
      <div
        ref={pixiContainer}
        id="pixi-container"
        style={{ width: "100%", height: "100%" }}
      />

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
