import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./InfluenceMap.module.scss";

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { IHex } from "../../../../models/Influence/IHex";
import {
  getMap,
  getPlayerColors,
  updateHex,
} from "../../../../store/slices/influence/mapSlice";
import InfluenceMapControllModal from "../InfluenceMapControllModal/InfluenceMapControllModal";
import { getHexPixelPositions } from "../../../../utils/influence/getHexPixelPositions";
// import InfluenceMapBonusAreas from "../InfluenceMapBonusAreas/InfluenceMapBonusAreas";
import { findBonusAreaBorders } from "../../../../utils/influence/findBonusAreaBorders";
import InfluenceMapSteptimer from "../InfluenceMapSteptimer/InfluenceMapSteptimer";
import InfluenceMapHexInfoModal from "../InfluenceMapHexVector/InfluenceMapHexInfoModal";
import { makeHexKey } from "../../../../utils/influence/makeHexKey";
import { useInfluencePlayerColors } from "../../../../hooks/influence/useInfluencePlayerColors";
import { useSocket } from "../../../../hooks/useSocket";
import LoadingOverlay from "../../../layout/LoadingOverlay/LoadingOverlay";
import {
  Assets,
  Sprite,
  Graphics,
  BitmapText,
  Rectangle, // Add for filterArea and hitArea
} from "pixi.js";
import {
  influenceHexImage,
  influenceHexReversedImage,
} from "../../../../assets/imageMaps";
import { generateAreas } from "../../../../utils/influence/generateAreas";
import { generateAreaSVGs } from "../../../../utils/influence/generateAreaSVGs";
import { generateAndAddAreaGraphics } from "../../../../utils/influence/generateAreaGraphics";
import { getHexSvg } from "../../../../utils/influence/getHexSvg";
import { getBonusAreas } from "../../../../utils/influence/getBonusAreas";
import { usePixiTs } from "../../../../hooks/influence/usePixi";

const DEFAULT_COLOR = "#7f5cff";

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

  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleHexes, setVisibleHexes] = useState<IHex[]>([]);

  const hexesWithBorders = useMemo(
    () => findBonusAreaBorders(visibleHexes),
    [visibleHexes]
  );
  const [selectedHexId, setSelectedHexId] = useState<string | null>(null);
  const [infoMoadlOpened, setInfoMoadlOpened] = useState(Boolean);
  const bonusAreaTexts = getBonusAreas(hexesWithBorders, HEX_SIZE);
  const selectedHex =
    selectedHexId &&
    visibleHexes.find(({ x, y, z }) => makeHexKey(x, y, z) === selectedHexId);

  useSocket(
    `/influence_map/${mapId}`,
    (res) => {
      const data = res as { type?: string; hex?: IHex };

      if (data && data.type === "hex_update" && data.hex) {
        dispatch(updateHex(data.hex));
      }
    },
    [mapId]
  );
  const {
    isInitialized,
    offset,
    scale,
    pixiContainer,
    appRef,
    hexLayerRef,
    isDraggingRef,
  } = usePixiTs();
  useEffect(() => {
    if (!mapId) return;
    (async () => {
      await dispatch(getMap({ id: mapId.toString() }));
      await dispatch(getPlayerColors({ id: mapId.toString() }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapId]);

  const ownedAreas = generateAreas(
    hexesWithBorders,
    "ownerBorders",
    HEX_SIZE,
    getPlayerColor
  );
  const bonusAreas = generateAreas(
    hexesWithBorders,
    "bonusAreaBorders",
    HEX_SIZE,
    undefined,
    DEFAULT_COLOR
  );
  const ownedAreaSVGs = generateAreaSVGs(ownedAreas);
  const bonusAreaSVGs = generateAreaSVGs(bonusAreas);

  const updateCanvas = async () => {
    if (!hexLayerRef.current) return;
    hexLayerRef.current.removeChildren();

    // Load the hex texture
    const hexTexture = await getHexTexture();
    const hexTextureReversed = await getReversedHexTexture();

    // Perf: batch sprites by type, then graphics, to minimize draw calls
    const spriteBatch: Sprite[] = [];
    const graphicsBatch: Graphics[] = [];

    hexesWithBorders.forEach((hex) => {
      const { x, z, y } = hex;
      const { left, top } = getHexPixelPositions({ x, z }, HEX_SIZE);

      // Create sprite with the hex image
      const sprite = new Sprite(x % 2 ? hexTexture : hexTextureReversed);
      sprite.x = left;
      sprite.y = top;
      sprite.width = HEX_SIZE * 2;
      sprite.height = HEX_SIZE * 2;

      // Perf: set hitArea to avoid event crawling
      sprite.hitArea = new Rectangle(0, 0, sprite.width, sprite.height);

      // Apply tint based on owner_id if present

      sprite.alpha = 0.6;

      sprite.eventMode = "static";
      sprite.cursor = "pointer";
      sprite.on("pointertap", (event) => {
        if (!isDraggingRef.current) {
          // Prevent event from bubbling to React/modal backdrop
          event.stopPropagation();
          setTimeout(() => {
            select(x, y, z);
          }, 30);
        }
      });
      spriteBatch.push(sprite);

      // Graphics for hex border
      const graphics = new Graphics();
      graphics.svg(
        getHexSvg(
          HEX_SIZE,
          hex.owner_id ? getPlayerColor(hex.owner_id) : undefined
        )
      );
      graphics.x = left;
      graphics.y = top;
      graphicsBatch.push(graphics);
    });

    // Add all sprites, then all graphics (draw order optimization)
    spriteBatch.forEach((sprite) => hexLayerRef.current?.addChild(sprite));
    graphicsBatch.forEach((graphics) =>
      hexLayerRef.current?.addChild(graphics)
    );

    generateAndAddAreaGraphics(hexLayerRef.current, ownedAreaSVGs, 2);
    generateAndAddAreaGraphics(hexLayerRef.current, bonusAreaSVGs, 1.5, true);
    await document.fonts.load("18px DS_Army");

    // Perf: BitmapText - lower resolution on mobile
    bonusAreaTexts.forEach((area) => {
      const text = new BitmapText({
        text: area.id.toUpperCase(),
        style: {
          fontFamily: "DS_Army",
          fontSize: 20,
          fill: "white",
          stroke: DEFAULT_COLOR,
          // resolution: isMobile ? 1 : 2, // Lower res on mobile
        },
      });
      text.x = area.left - text.width / 2;
      text.y = area.top - text.height / 2;
      text.zIndex = 10;
      hexLayerRef.current?.addChild(text);
    });
  };

  useEffect(() => {
    if (hexLayerRef.current && visibleHexes.length > 0) {
      updateCanvas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleHexes, isInitialized]);

  useEffect(() => {
    if (
      gameInited &&
      containerRef.current &&
      appRef.current &&
      isInitialized &&
      scale
    ) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gameInited,
    containerRef,
    hexes,
    scale,
    offset.x,
    offset.y,
    isInitialized,
  ]);

  const select = (x: number, y: number, z: number) => {
    setSelectedHexId(makeHexKey(x, y, z));
    setInfoMoadlOpened(true);
  };
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
      <LoadingOverlay
        loading={!mapId}
        text={!gameInited ? "loading Map" : "No Active map Right now"}
      />
    </div>
  );
};

export default InfluenceMap;
