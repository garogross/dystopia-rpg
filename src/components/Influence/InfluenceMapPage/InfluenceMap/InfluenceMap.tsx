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
import {
  Application,
  Assets,
  Container,
  Sprite,
  ColorMatrixFilter,
  Graphics,
} from "pixi.js";
import InfluenceMapBonusAreas from "../InfluenceMapBonusAreas/InfluenceMapBonusAreas";
import {
  influenceHexImage,
  influenceHexReversedImage,
} from "../../../../assets/imageMaps";
import { EHexDirections } from "../../../../constants/influence/EHexDirections";
import { EsimProfilePage } from "twilio/lib/rest/supersim/v1/esimProfile";
import { current } from "@reduxjs/toolkit";

const COLOR_OPACITY = "70"; // in hex
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

  const ownedAreas = hexesWithBorders.reduce((acc, cur) => {
    const points = getHexPoints(HEX_SIZE * 2);

    if (cur.ownerBorders && cur.owner_id) {
      const { left, top } = getHexPixelPositions(
        { x: cur.x, z: cur.z },
        HEX_SIZE
      );

      const borderPoints = cur.ownerBorders.map((border) => {
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

      if (acc[cur.owner_id]) {
        acc[cur.owner_id].push(...borderPoints);
      } else {
        acc[cur.owner_id] = borderPoints;
      }
    }
    return acc;
  }, {} as Record<string, { start: [number, number]; end: [number, number] }[]>);

  // Function to generate SVG paths for owned areas
  const generateOwnedAreaSVGs = (
    ownedAreas: Record<
      string,
      { start: [number, number]; end: [number, number] }[]
    >
  ) => {
    const svgPaths: { ownerId: string; paths: string[]; color: string }[] = [];

    for (const [ownerId, borderLines] of Object.entries(ownedAreas)) {
      if (borderLines.length === 0) continue;

      const color = getPlayerColor(parseInt(ownerId));
      const paths: string[] = [];
      const usedLines = new Set<number>();

      // Function to find connected lines and create paths
      const createPath = (startLineIndex: number): string => {
        const path: [number, number][] = [];
        const tolerance = 3; // or slightly larger if coords are off

        let first = borderLines[startLineIndex].start;
        let last = borderLines[startLineIndex].end;

        path.push(first, last);
        usedLines.add(startLineIndex);

        let found = true;
        let iterations = 0;
        let maxIterations = borderLines.length * 20;

        while (found && iterations < maxIterations) {
          found = false;
          iterations++;

          for (let i = 0; i < borderLines.length; i++) {
            if (usedLines.has(i)) continue;

            const line = borderLines[i];
            const { start, end } = line;

            // match at the END of current path with better precision
            if (
              start[0] <= last[0] + tolerance &&
              start[0] >= last[0] - tolerance &&
              start[1] <= last[1] + tolerance &&
              start[1] >= last[1] - tolerance
            ) {
              path.push(end);
              last = end;
              usedLines.add(i);
              found = true;
              break;
            }
            if (
              Math.abs(end[0] - last[0]) < tolerance &&
              Math.abs(end[1] - last[1]) < tolerance
            ) {
              path.push(start);
              last = start;
              usedLines.add(i);
              found = true;
              break;
            }

            // match at the START of current path
            if (
              Math.abs(end[0] - first[0]) < tolerance &&
              Math.abs(end[1] - first[1]) < tolerance
            ) {
              path.unshift(start);
              first = start;
              usedLines.add(i);
              found = true;
              break;
            }
            if (
              Math.abs(start[0] - first[0]) < tolerance &&
              Math.abs(start[1] - first[1]) < tolerance
            ) {
              path.unshift(end);
              first = end;
              usedLines.add(i);
              found = true;
              break;
            }
          }
        }

        // Convert to SVG path string with better precision
        if (path.length > 1) {
          return (
            `M ${path[0][0].toFixed(2)} ${path[0][1].toFixed(2)} ` +
            path
              .slice(1)
              .map((p) => `L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`)
              .join(" ")
          );
        }
        return "";
      };

      // Create paths for all connected line groups
      while (usedLines.size < borderLines.length) {
        // Find the next unused line
        let nextLineIndex = -1;
        for (let i = 0; i < borderLines.length; i++) {
          if (!usedLines.has(i)) {
            nextLineIndex = i;
            break;
          }
        }

        if (nextLineIndex === -1) break;

        const pathString = createPath(nextLineIndex);
        if (pathString) {
          paths.push(pathString);
        }
      }

      if (paths.length > 0) {
        svgPaths.push({ ownerId, paths, color });
      }
    }

    return svgPaths;
  };

  const ownedAreaSVGs = generateOwnedAreaSVGs(ownedAreas);

  const updateCanvas = async () => {
    if (!hexLayerRef.current) return;
    hexLayerRef.current.removeChildren();

    // Load the hex texture
    const hexTexture = await getHexTexture();
    const hexTextureReversed = await getReversedHexTexture();

    hexesWithBorders.forEach((hex) => {
      const { x, z, owner_id, ownerBorders } = hex;
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

    // Render owned area SVGs
    ownedAreaSVGs.forEach(({ ownerId, paths, color }) => {
      paths.forEach((pathString) => {
        if (pathString) {
          const graphics = new Graphics();

          // Convert hex color to number for PIXI.js
          let colorStr = color;
          if (colorStr.startsWith("#")) colorStr = colorStr.slice(1);
          const colorNumber = parseInt(colorStr, 16);

          // Parse the SVG path and draw it using PIXI Graphics
          const pathCommands = pathString.split(/(?=[ML])/);
          let firstPoint = true;

          pathCommands.forEach((command) => {
            const type = command[0];
            const coords = command.slice(1).trim().split(" ").map(Number);

            if (type === "M" && coords.length >= 2) {
              if (firstPoint) {
                graphics.moveTo(coords[0], coords[1]);
                firstPoint = false;
              } else {
                graphics.lineTo(coords[0], coords[1]);
              }
            } else if (type === "L" && coords.length >= 2) {
              graphics.lineTo(coords[0], coords[1]);
            }
          });

          // Apply stroke with better quality settings - increased width and better color handling
          graphics.stroke({
            width: 2, // Increased width for better visibility and quality
            color: colorNumber,
            alpha: 1,
            cap: "round", // Round line caps for smoother appearance
            join: "round", // Round line joins for smoother corners
          });
          hexLayerRef.current?.addChild(graphics);
        }
      });
    });
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
