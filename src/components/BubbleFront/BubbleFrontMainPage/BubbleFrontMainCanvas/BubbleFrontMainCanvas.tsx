import React, { useEffect, useRef, useState } from "react";
import { usePixi } from "../../../../hooks/influence/usePixi";

import styles from "./BubbleFrontMainCanvas.module.scss";
import {
  Application,
  Container,
  ICanvas,
  Sprite,
  SVGResource,
  Texture,
} from "pixi.js";
import { getHexSvg } from "../../../../utils/influence/getHexSvg";
import {
  chemicalBombImage,
  fireBallImage,
  iceBallImage,
  lightingBBallImage,
  nuclearBallImage,
} from "../../../../assets/imageMaps";
import { BUBBLE_FRONT_GUN_ID } from "../../../../constants/bubbleFront/bubbleFrontGunId";

const HEX_IN_LINE = 10;
const LINES_COUNT = 7;
const DEFAULT_HEX_LINES_COUNT = 3;

const BALLS = {
  chemicalBomb: Texture.from(chemicalBombImage),
  fireBall: Texture.from(fireBallImage),
  iceBall: Texture.from(iceBallImage),
  lightingBBall: Texture.from(lightingBBallImage),
  nuclearBall: Texture.from(nuclearBallImage),
};
const ballKeys = Object.keys(BALLS) as (keyof typeof BALLS)[];

const generateRandomBallsArr = (length: number) => {
  return Array.from({ length }).map(() => ({
    ball: ballKeys[Math.floor(Math.random() * ballKeys.length)],
  }));
};

const getGunSettings = () => {
  const gunEl = document.querySelector(`#${BUBBLE_FRONT_GUN_ID}`);
  if (gunEl) {
    const gunRect = gunEl.getBoundingClientRect();
    const centerX = gunRect.left + gunRect.width / 2;
    const centerY = gunRect.top + gunRect.height / 2;
    // Type assertion to HTMLElement to access dataset
    const rotation = +(gunEl instanceof HTMLElement && gunEl.dataset?.rotation
      ? gunEl.dataset.rotation
      : 0);
    return { centerX, centerY, rotation };
  } else return { centerX: 0, centerY: 0, rotation: 0 };
};

const BubbleFrontMainCanvas = () => {
  const arrLength = Array.from({ length: DEFAULT_HEX_LINES_COUNT }).reduce(
    (acc: number, _, idx) => {
      return acc + (idx % 2 === 1 ? HEX_IN_LINE - 1 : HEX_IN_LINE);
    },
    0
  );
  const [hexes] = useState<{ ball: keyof typeof BALLS }[]>(
    generateRandomBallsArr(arrLength)
  );
  const [readyBalls, setReadyBalls] = useState(generateRandomBallsArr(2));
  const [hexSize, setHexSize] = useState(0);
  const hexSizeRef = useRef(hexSize);

  useEffect(() => {
    hexSizeRef.current = hexSize;
  }, [hexSize]);

  const onInitApp = (app: Application<ICanvas>, hexLayer: Container) => {
    (app.view as HTMLCanvasElement).addEventListener(
      "mousedown",
      (e: MouseEvent) => {
        const { centerX, centerY, rotation } = getGunSettings();

        // Create sprite with readyBalls[0]
        if (readyBalls.length > 0) {
          const ballType = readyBalls[0].ball;

          const ballSprite = new Sprite(BALLS[ballType]);

          const canvasTop = app.view.getBoundingClientRect?.();

          // Position the ball at the gun center
          ballSprite.width = hexSizeRef.current; // Adjust size as needed
          ballSprite.height = hexSizeRef.current;
          ballSprite.x = centerX - hexSizeRef.current;
          ballSprite.y = centerY - (canvasTop?.y || 0);

          // Add ball to the hex layer
          hexLayer.addChild(ballSprite);

          // Calculate movement direction based on rotation
          // Adjust for -90 degree offset and convert to radians
          const angleInRadians = ((rotation + 90) * Math.PI) / 180;
          const speed = 5; // Adjust speed as needed
          const velocityX = Math.cos(angleInRadians) * speed;
          const velocityY = Math.sin(angleInRadians) * speed;

          // Animation function
          const animateBall = () => {
            ballSprite.x -= velocityX;
            ballSprite.y -= velocityY;
            console.log("animateBall", ballSprite.x, ballSprite.y);

            // Continue animation if ball is still on screen
            if (
              ballSprite.x > 0 &&
              ballSprite.x < app.screen.width &&
              ballSprite.y > 0
            ) {
              requestAnimationFrame(animateBall);
            } else {
              // Remove ball when it goes off screen
              hexLayer.removeChild(ballSprite);
              ballSprite.destroy();
            }
          };

          // Start animation
          animateBall();
        }
      }
    );
  };

  const { isInitialized, pixiContainer, appRef, hexLayerRef } =
    usePixi(onInitApp);

  const updateCanvas = () => {
    if (!pixiContainer.current || !hexLayerRef.current) return;

    // Clear previous children to avoid memory leaks and overdraw
    hexLayerRef.current.removeChildren().forEach((child) => {
      child.destroy({ children: true, texture: false });
    });
    const spriteBatch: Sprite[] = [];

    const graphicsBatch: Sprite[] = [];

    const containerWidth = pixiContainer.current.getBoundingClientRect().width;

    // Calculate hex size to fit both width and height
    const hexSize = containerWidth / HEX_IN_LINE;
    const halfHexSize = hexSize / 2;
    // Calculate the total width and height of the hex grid
    setHexSize(hexSize);
    let globalIndex = 0;
    for (let l = 0; l < LINES_COUNT; l++) {
      // Offset every other row for hex grid
      const isOdd = l % 2 === 1;
      const hexesInRow = HEX_IN_LINE - (isOdd ? 1 : 0);
      for (let i = 0; i < hexesInRow; i++) {
        const x = i * hexSize + (isOdd ? hexSize / 2 : 0);
        const y = l * hexSize * 0.8; // Vertical spacing for hex grid
        const index = globalIndex;
        // Create sprite with the ball image
        const ballType = hexes[index]?.ball;
        const sprite = new Sprite(BALLS[ballType]);
        sprite.x = x;
        sprite.y = y;
        sprite.width = hexSize;
        sprite.height = hexSize;

        spriteBatch.push(sprite);

        // load hex texture
        const svgString = getHexSvg(halfHexSize, undefined, "#3D2B7E", [2, 4]);
        const texture = Texture.from(svgString, {
          resourceOptions: { scale: 1, resource: SVGResource }, // Important
        });
        const textureSprite = new Sprite(texture);

        textureSprite.x = x;
        textureSprite.y = y;

        graphicsBatch.push(textureSprite);
        globalIndex++;
      }
    }
    // Add ball sprites to the layer
    spriteBatch.forEach((sprite) => hexLayerRef.current?.addChild(sprite));

    // Add hex graphics to the layer
    graphicsBatch.forEach((graphics) =>
      hexLayerRef.current?.addChild(graphics)
    );
  };

  useEffect(() => {
    if (hexLayerRef.current) {
      updateCanvas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  return (
    <div className={styles.bubbleFrontMainCanvas}>
      <div
        ref={pixiContainer}
        className={styles.bubbleFrontMainCanvas__container}
      ></div>
    </div>
  );
};

export default BubbleFrontMainCanvas;
