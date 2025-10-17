import React, { useEffect, useState } from "react";

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
import { Graphics, Sprite, Texture } from "pixi.js";

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

  const updateCanvas = () => {
    if (!pixiContainer.current || !hexLayerRef.current) return;
    // INSERT_YOUR_CODE

    // Get width of the Pixi container
    const container = pixiContainer.current;
    console.log({ container });

    // Remove previous hexLayer's children (clear all)
    hexLayerRef.current?.removeChildren();

    // Get the width and compute rect size
    // NOTE: If container is a div, getBoundingClientRect().width, else fallback
    let containerWidth = 400; // fallback
    containerWidth = container.getBoundingClientRect().width;
    console.log({ containerWidth });

    const rectSize = containerWidth / BALLS_PER_ROW;

    // For drawing
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const row = Math.floor(i / BALLS_PER_ROW);
      const col = i % BALLS_PER_ROW;

      // Draw rectangle
      const graphics = new Graphics();
      graphics.lineStyle(1, 0x7f5cff, 1);
      graphics.beginFill(0x000000, 0); // transparent
      graphics.drawRect(0, 0, rectSize, rectSize);
      graphics.endFill();

      graphics.x = col * rectSize;
      graphics.y = row * rectSize;

      hexLayerRef.current.addChild(graphics);

      // Place ball if any
      if (field.ball) {
        const texture = BALLS[field.ball];
        if (texture) {
          const sprite = new Sprite(texture);

          // Set sprite size: 90% of rectSize, maintaining aspect ratio
          const targetSize = rectSize * 0.9;
          const scale = Math.min(
            targetSize / texture.width,
            targetSize / texture.height
          );
          sprite.width = texture.width * scale;
          sprite.height = texture.height * scale;

          // Center sprite in rectangle
          sprite.x = graphics.x + (rectSize - sprite.width) / 2;
          sprite.y = graphics.y + (rectSize - sprite.height) / 2;

          hexLayerRef.current.addChild(sprite);
        }
      }
    }
  };
  useEffect(() => {
    if (isInitialized) {
      updateCanvas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  return <div className={styles.gridlineMainCanvas} ref={pixiContainer}></div>;
};

export default GridlineMainCanvas;
