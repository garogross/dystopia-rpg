import React, { useEffect, useState, useRef } from "react";

import styles from "./GridlineMainCanvas.module.scss";
import { usePixi } from "../../../../hooks/influence/usePixi";

import {
  gridlineBlueBallImage,
  gridlineGoldBallImage,
  gridlineGreenBallImage,
  gridlineRedBallImage,
  gridlineSilverBallImage,
} from "../../../../assets/imageMaps/gridlineImages";
import { EGridlineBalls } from "../../../../constants/gridline/EGridlineBalls";
import { Graphics, Sprite, Texture, Ticker } from "pixi.js";

interface Props {}

interface IField {
  ball?: EGridlineBalls;
}

const BALLS_PER_ROW = 10;
const INITIAL_BALLS_COUNT = 10;

const BALLS = {
  [EGridlineBalls.Blue]: Texture.from(gridlineBlueBallImage),
  [EGridlineBalls.Gold]: Texture.from(gridlineGoldBallImage),
  [EGridlineBalls.Green]: Texture.from(gridlineGreenBallImage),
  [EGridlineBalls.Red]: Texture.from(gridlineRedBallImage),
  [EGridlineBalls.Silver]: Texture.from(gridlineSilverBallImage),
};
const generateInitialFields = (): IField[] => {
  const totalFields = BALLS_PER_ROW * BALLS_PER_ROW;
  const fields: IField[] = Array.from({ length: totalFields }, () => ({}));

  // Generate shuffled indices for fields
  const indices = Array.from({ length: totalFields }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  // Get the first INITIAL_BALLS_COUNT random indices
  const filledIndices = indices.slice(0, INITIAL_BALLS_COUNT);

  // Gather available ball types as array
  const ballTypes = Object.values(EGridlineBalls);

  for (const idx of filledIndices) {
    const randomBall = ballTypes[Math.floor(Math.random() * ballTypes.length)];
    fields[idx] = { ball: randomBall };
  }

  return fields;
};

const GridlineMainCanvas: React.FC<Props> = (props) => {
  const onInitApp = () => {};
  const { isInitialized, pixiContainer, hexLayerRef } = usePixi(onInitApp);
  const [fields, setFields] = useState(generateInitialFields());
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(-1);

  // keep latest fields in ref so pointer handlers inside updateCanvas can read current data
  const fieldsRef = useRef<IField[]>(fields);
  useEffect(() => {
    fieldsRef.current = fields;
  }, [fields]);

  // refs to persist between renders
  const spriteInfoRef = useRef<
    Record<
      number,
      { sprite: Sprite; baseScale: number; phase: number; speed: number }
    >
  >({});
  const tickerRef = useRef<((delta: number) => void) | null>(null);
  const graphicsMapRef = useRef<Record<number, Graphics>>({});
  const selectedIndexRef = useRef<number>(-1);

  // updateCanvas accepts optional fields and selected index so we can rerender immediately with new data
  const updateCanvas = (fieldsArg?: IField[], selArg?: number) => {
    if (!pixiContainer.current || !hexLayerRef.current) return;

    // Clean previous ticker if any
    if (tickerRef.current) {
      Ticker.shared.remove(tickerRef.current);
      tickerRef.current = null;
    }
    // Reset sprite info and graphics map
    spriteInfoRef.current = {};
    graphicsMapRef.current = {};
    selectedIndexRef.current =
      typeof selArg === "number" ? selArg : selectedFieldIndex;

    // Remove previous hexLayer's children (clear all)
    hexLayerRef.current?.removeChildren();

    // Get the width and compute rect size
    // NOTE: If container is a div, getBoundingClientRect().width, else fallback
    let containerWidth = 400; // fallback
    const container = pixiContainer.current;
    containerWidth = container.getBoundingClientRect().width;

    const rectSize = containerWidth / BALLS_PER_ROW;

    // Use provided fields or current fieldsRef
    const localFields = fieldsArg ?? fieldsRef.current;

    // For drawing
    for (let i = 0; i < localFields.length; i++) {
      const field = localFields[i];
      const row = Math.floor(i / BALLS_PER_ROW);
      const col = i % BALLS_PER_ROW;

      // Draw rectangle - default dark background, will highlight on selection
      const graphics = new Graphics();
      graphics.lineStyle(1, 0x5c3fff, 1);
      graphics.beginFill(0x0f0e10, 1);
      graphics.drawRect(0, 0, rectSize, rectSize);
      graphics.endFill();

      graphics.x = col * rectSize;
      graphics.y = row * rectSize;

      // interaction
      try {
        graphics.eventMode = "static";
        graphics.cursor = "pointer";
      } catch {
        graphics.interactive = true;
      }

      // store graphics reference for later resets
      graphicsMapRef.current[i] = graphics;

      // pointer event to set selected index and update visuals (or transfer ball)
      graphics.on("pointerdown", () => {
        const currentFields = fieldsRef.current;
        const clickedHasBall = !!currentFields[i]?.ball;
        const sel = selectedIndexRef.current;

        // Case 1: nothing selected yet
        if (sel === -1) {
          if (clickedHasBall) {
            // select clicked cell
            // highlight current
            graphics.clear();
            graphics.lineStyle(1, 0x5c3fff, 1);
            graphics.beginFill(0x7f5cff, 1);
            graphics.drawRect(0, 0, rectSize, rectSize);
            graphics.endFill();

            selectedIndexRef.current = i;
            setSelectedFieldIndex(i);

            // initialize phase for the newly selected sprite (if exists)
            const newInfo = spriteInfoRef.current[i];
            if (newInfo) {
              newInfo.phase = Math.random() * Math.PI * 2;
            }
          }
          // if clicked empty and none selected, do nothing
          return;
        }

        // Case 2: there is an existing selection
        if (sel === i) {
          // clicked the currently selected cell -> deselect
          graphics.clear();
          graphics.lineStyle(1, 0x5c3fff, 1);
          graphics.beginFill(0x0f0e10, 1);
          graphics.drawRect(0, 0, rectSize, rectSize);
          graphics.endFill();

          // reset sprite scale if exists
          const prevInfo = spriteInfoRef.current[sel];
          if (prevInfo && prevInfo.sprite) {
            prevInfo.sprite.scale.set(prevInfo.baseScale);
            prevInfo.phase = 0;
          }

          selectedIndexRef.current = -1;
          setSelectedFieldIndex(-1);
          return;
        }

        // sel !== -1 and sel !== i
        const selectedField = currentFields[sel];

        // If clicked cell has a ball -> switch selection to clicked cell
        if (clickedHasBall) {
          // reset previous highlight and sprite
          if (graphicsMapRef.current[sel]) {
            const prevG = graphicsMapRef.current[sel];
            prevG.clear();
            prevG.lineStyle(1, 0x5c3fff, 1);
            prevG.beginFill(0x0f0e10, 1);
            prevG.drawRect(0, 0, rectSize, rectSize);
            prevG.endFill();
          }
          const prevInfo = spriteInfoRef.current[sel];
          if (prevInfo && prevInfo.sprite) {
            prevInfo.sprite.scale.set(prevInfo.baseScale);
            prevInfo.phase = 0;
          }

          // highlight new selection (graphics already refers to clicked cell)
          graphics.clear();
          graphics.lineStyle(1, 0x5c3fff, 1);
          graphics.beginFill(0x7f5cff, 1);
          graphics.drawRect(0, 0, rectSize, rectSize);
          graphics.endFill();

          selectedIndexRef.current = i;
          setSelectedFieldIndex(i);

          const newInfo = spriteInfoRef.current[i];
          if (newInfo) {
            newInfo.phase = Math.random() * Math.PI * 2;
          }
          return;
        }

        // clicked is empty, try to transfer ball from selected to clicked
        if (selectedField && selectedField.ball) {
          // build new fields array
          const newFields = [...currentFields];
          newFields[i] = { ball: selectedField.ball };
          newFields[sel] = {};

          // commit state + fieldsRef
          setFields(newFields);
          fieldsRef.current = newFields;

          // clear selection after move
          selectedIndexRef.current = -1;
          setSelectedFieldIndex(-1);

          // re-render canvas with updated fields and no selection
          updateCanvas(newFields, -1);
        }
      });

      hexLayerRef.current.addChild(graphics);

      // Place ball if any
      if (field.ball) {
        const texture = BALLS[field.ball];
        if (texture) {
          const sprite = new Sprite(texture);

          // Set sprite size: 90% of rectSize, maintaining aspect ratio using scale
          const targetSize = rectSize * 0.9;
          const baseScale = Math.min(
            targetSize / texture.width,
            targetSize / texture.height
          );
          sprite.scale.set(baseScale);

          // Center sprite in rectangle using anchor
          sprite.anchor.set(0.5);
          sprite.x = graphics.x + rectSize / 2;
          sprite.y = graphics.y + rectSize / 2;
          hexLayerRef.current.addChild(sprite);

          // Store sprite info by index (do NOT animate all; we'll animate only selected)
          spriteInfoRef.current[i] = {
            sprite,
            baseScale,
            phase: Math.random() * Math.PI * 2,
            speed: 1,
          };
        }
      }
    }

    // If selArg points to a valid index, highlight it visually (ensure highlight after rendering sprites)
    const selToUse = typeof selArg === "number" ? selArg : selectedFieldIndex;
    if (selToUse !== -1 && graphicsMapRef.current[selToUse]) {
      const g = graphicsMapRef.current[selToUse];
      g.clear();
      g.lineStyle(1, 0x5c3fff, 1);
      g.beginFill(0x7f5cff, 1);
      g.drawRect(0, 0, rectSize, rectSize);
      g.endFill();
    }

    // Start ticker animation for scale up/down — only animate the selected sprite
    const animate = (delta: number) => {
      const sel = selectedIndexRef.current;
      if (sel === -1) return;
      const info = spriteInfoRef.current[sel];
      if (!info) return;
      info.phase += 0.12 * delta * info.speed;
      const scaleMultiplier = 1 + 0.12 * Math.sin(info.phase); // slightly stronger
      info.sprite.scale.set(info.baseScale * scaleMultiplier);
    };
    tickerRef.current = animate;
    Ticker.shared.add(animate);
  };

  // keep selection ref / sprite scales in sync if selection changes from outside
  useEffect(() => {
    const prev = selectedIndexRef.current;
    if (prev !== -1 && spriteInfoRef.current[prev]) {
      // reset previous sprite scale
      const prevInfo = spriteInfoRef.current[prev];
      prevInfo.sprite.scale.set(prevInfo.baseScale);
      prevInfo.phase = 0;
    }

    selectedIndexRef.current = selectedFieldIndex;

    if (
      selectedFieldIndex !== -1 &&
      spriteInfoRef.current[selectedFieldIndex]
    ) {
      // initialize phase for new selected sprite so animation starts smoothly
      spriteInfoRef.current[selectedFieldIndex].phase =
        Math.random() * Math.PI * 2;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFieldIndex]);

  useEffect(() => {
    if (isInitialized) {
      updateCanvas();
    }
    // cleanup when component unmounts
    return () => {
      if (tickerRef.current) {
        Ticker.shared.remove(tickerRef.current);
        tickerRef.current = null;
      }
      spriteInfoRef.current = {};
      graphicsMapRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  return <div className={styles.gridlineMainCanvas} ref={pixiContainer}></div>;
};

export default GridlineMainCanvas;
