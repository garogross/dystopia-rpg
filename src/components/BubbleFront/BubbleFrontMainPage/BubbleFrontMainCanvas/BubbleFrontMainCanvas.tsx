import React, { useEffect, useRef, useState } from "react";
import { usePixi } from "../../../../hooks/influence/usePixi";

import styles from "./BubbleFrontMainCanvas.module.scss";
import {
  Application,
  Container,
  DisplayObject,
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
import { useCopyRef } from "../../../../hooks/useCopyRef";

const HEX_IN_LINE = 15;
const LINES_COUNT = 15;
const DEFAULT_HEX_LINES_COUNT = 3;

const getHexesCountInrow = (lineIndex: number) => {
  const isOdd = lineIndex % 2 === 1;
  return HEX_IN_LINE - (isOdd ? 1 : 0);
};
const BALLS = {
  chemicalBomb: Texture.from(chemicalBombImage),
  fireBall: Texture.from(fireBallImage),
  iceBall: Texture.from(iceBallImage),
  lightingBBall: Texture.from(lightingBBallImage),
  nuclearBall: Texture.from(nuclearBallImage),
};
const ballKeys = Object.keys(BALLS) as (keyof typeof BALLS)[];

const getRandomBall = () =>
  ballKeys[Math.floor(Math.random() * ballKeys.length)];

interface IBall {
  ball: (typeof ballKeys)[0] | null;
  position?: { x: number; y: number };
}
const generateRandomBallsArr = (): IBall[][] => {
  return Array.from({ length: LINES_COUNT }, (_, lineIndex) =>
    Array.from({ length: getHexesCountInrow(lineIndex) }, () => ({
      ball: lineIndex < DEFAULT_HEX_LINES_COUNT ? getRandomBall() : null,
    }))
  );
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

// Helpers
function getSpriteCenter(sprite: DisplayObject) {
  const b = (sprite as any).getBounds(); // world-space AABB (accounts for anchor/scale)
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}

function segmentCircleTOI(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  c: { x: number; y: number },
  r: number
): number | null {
  // Solve |(p0 + d*t) - c|^2 = r^2 for t in [0,1]
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const fx = p0.x - c.x;
  const fy = p0.y - c.y;

  const a = dx * dx + dy * dy;
  const b = 2 * (fx * dx + fy * dy);
  const cTerm = fx * fx + fy * fy - r * r;

  if (cTerm <= 0) return 0; // already overlapping at start
  if (a === 0) return null; // no movement this tick

  const disc = b * b - 4 * a * cTerm;
  if (disc < 0) return null;

  const sqrt = Math.sqrt(disc);
  const t1 = (-b - sqrt) / (2 * a);
  const t2 = (-b + sqrt) / (2 * a);

  // earliest hit within the step
  if (t1 >= 0 && t1 <= 1) return t1;
  if (t2 >= 0 && t2 <= 1) return t2;
  return null;
}

const BubbleFrontMainCanvas = () => {
  const [hexes, setHexes] = useState<IBall[][]>(generateRandomBallsArr());
  const [readyBalls, setReadyBalls] = useState(
    Array.from({ length: 2 }, () => getRandomBall())
  );
  const [hexSize, setHexSize] = useState(0);
  const hexSizeRef = useCopyRef(hexSize);
  const hexesRef = useCopyRef(hexes);
  const hexesWithBalls = hexes.flat().filter((item) => item.ball);

  const strikeBall = (app: Application<ICanvas>, hexLayer: Container) => {
    const { centerX, centerY, rotation } = getGunSettings();

    // Create sprite with readyBalls[0]
    if (readyBalls.length > 0) {
      const ballType = readyBalls[0];

      const ballSprite = new Sprite(BALLS[ballType]);

      const canvasRect = app.view.getBoundingClientRect?.();
      ballSprite.anchor.set(0.5);
      ballSprite.scale.set(0);
      ballSprite.x = centerX - (canvasRect?.x || 0);
      ballSprite.y = centerY - (canvasRect?.y || 0);

      // Add ball to the hex layer
      hexLayer.addChild(ballSprite);

      // Calculate movement direction based on rotation
      // Adjust for -90 degree offset and convert to radians
      const angleInRadians = ((rotation + 90) * Math.PI) / 180;
      const moveSpeed = 10; // Adjust speed as needed
      const scaleSpeed = 0.03; // Adjust speed as needed (0..1 per frame)
      let velocityX = Math.cos(angleInRadians) * moveSpeed;
      let velocityY = Math.sin(angleInRadians) * moveSpeed;

      // Determine target scale so that final visual size equals hex size
      const baseTextureWidth =
        ballSprite.texture.orig?.width || ballSprite.texture.width;
      const targetScale =
        baseTextureWidth > 0 ? hexSizeRef.current / baseTextureWidth : 1;

      const hittableBallsLines = hexesRef.current.filter((line, index, arr) => {
        if (!line.some((item) => item.ball)) return false;
        const isCurLineFilled =
          line.filter((item) => item.ball).length !== getHexesCountInrow(index);
        const isNextLineFilled =
          arr[index + 1]?.filter((item) => item.ball)?.length !==
          getHexesCountInrow(index + 1);
        return isCurLineFilled || isNextLineFilled;
      });

      // Animation function
      const animateBall = () => {
        ballSprite.x -= velocityX;
        ballSprite.y -= velocityY;

        // Smoothly scale up to target size
        const currentScale = ballSprite.scale.x; // uniform scale
        if (currentScale < targetScale) {
          const nextScale = Math.min(currentScale + scaleSpeed, targetScale);
          ballSprite.scale.set(nextScale);
        }

        // Compute current radius for collision (texture size * scale / 2)
        const currentRadius = (baseTextureWidth * ballSprite.scale.x) / 2;

        // Bounce on left/right walls
        if (ballSprite.x - currentRadius <= 0) {
          ballSprite.x = currentRadius;
          velocityX = -velocityX;
        } else if (ballSprite.x + currentRadius >= app.screen.width) {
          ballSprite.x = app.screen.width - currentRadius;
          velocityX = -velocityX;
        }

        // check touch to grid balls
        const prevCenter = getSpriteCenter(ballSprite);

        const currCenter = getSpriteCenter(ballSprite);
        const movingR = (ballSprite as any).getBounds().width / 2;

        // Assuming grid balls are sized by your hex size:
        const gridR = hexSizeRef.current / 2;

        // 4) Find first touched (closest time-of-impact) ball this frame:
        let best: { item: any; t: number } | null = null;

        for (const item of hittableBallsLines.flat()) {
          if (!item.position || !item.ball) continue;

          // If item.position is top-left of the hex cell:
          const cx = item.position.x + gridR;
          const cy = item.position.y + gridR;

          // Broad-phase: quick AABB sweep reject (optional but fast)
          const minX = Math.min(prevCenter.x, currCenter.x) - (movingR + gridR);
          const maxX = Math.max(prevCenter.x, currCenter.x) + (movingR + gridR);
          const minY = Math.min(prevCenter.y, currCenter.y) - (movingR + gridR);
          const maxY = Math.max(prevCenter.y, currCenter.y) + (movingR + gridR);
          if (cx < minX || cx > maxX || cy < minY || cy > maxY) continue;

          // Narrow-phase: swept segment vs circle (includes all sides)
          const t = segmentCircleTOI(
            prevCenter,
            currCenter,
            { x: cx, y: cy },
            movingR + gridR
          );
          if (t !== null && (best === null || t < best.t)) {
            best = { item, t };
          }
        }

        // 5) Result
        const touchedBall = best?.item ?? null;

        if (!touchedBall) {
          requestAnimationFrame(animateBall);
        } else {
          const curLineIndex = hexesRef.current.findIndex((line) => {
            const lineY = line[0]?.position?.y || 0;

            return (
              ballSprite.y >= lineY && ballSprite.y < lineY + ballSprite.height
            );
          });

          if (curLineIndex !== -1) {
            const hexIndex = hexesRef.current[curLineIndex].findIndex(
              (item) => {
                const x = item.position?.x || 0;
                return (
                  (ballSprite.x >= x &&
                    ballSprite.x <= x + ballSprite.width / 2) ||
                  (ballSprite.x >= x + ballSprite.width / 2 &&
                    ballSprite.x <= x + ballSprite.width)
                );
              }
            );

            if (hexIndex !== -1) {
              setHexes((prev) => {
                const newHexes = [...prev];
                newHexes[curLineIndex] = [...newHexes[curLineIndex]];
                newHexes[curLineIndex][hexIndex] = {
                  ...newHexes[curLineIndex][hexIndex],
                  ball: ballType,
                };
                return newHexes;
              });
            }
            ballSprite.destroy();
            hexLayer.removeChild(ballSprite);
          }
          // Remove ball when it goes off screen or exceeds bounces
          // hexLayer.removeChild(ballSprite);
          // ballSprite.destroy();
        }
      };

      // Start animation
      animateBall();
    }
  };

  const onInitApp = (app: Application<ICanvas>, hexLayer: Container) => {
    (app.view as HTMLCanvasElement).addEventListener(
      "mousedown",
      (e: MouseEvent) => {
        strikeBall(app, hexLayer);
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
    const updatingHexes = [...hexes];

    for (let l = 0; l < LINES_COUNT; l++) {
      // Offset every other row for hex grid
      const hexesInRow = getHexesCountInrow(l);
      const isOdd = hexesInRow < HEX_IN_LINE; // l % 2 === 1;
      for (let i = 0; i < hexesInRow; i++) {
        const x = i * hexSize + (isOdd ? hexSize / 2 : 0);
        const y = l * hexSize * 0.8; // Vertical spacing for hex grid
        updatingHexes[l][i].position = { x, y };
        // Create sprite with the ball image
        const curBall = hexes[l]?.[i].ball;
        if (curBall) {
          const ballType = curBall;
          const sprite = new Sprite(BALLS[ballType]);
          sprite.x = x;
          sprite.y = y;
          sprite.width = hexSize;
          sprite.height = hexSize;
          spriteBatch.push(sprite);
        }

        // load hex texture
        const svgString = getHexSvg(halfHexSize, undefined, "#3D2B7E", [2, 4]);
        const texture = Texture.from(svgString, {
          resourceOptions: { scale: 1, resource: SVGResource }, // Important
        });
        const textureSprite = new Sprite(texture);

        textureSprite.x = x;
        textureSprite.y = y;

        graphicsBatch.push(textureSprite);
      }
    }

    setHexes(updatingHexes);
    // Add ball sprites to the layer
    spriteBatch.forEach((sprite) => hexLayerRef.current?.addChild(sprite));

    // Add hex graphics to the layer
    graphicsBatch.forEach((graphics) =>
      hexLayerRef.current?.addChild(graphics)
    );
  };

  useEffect(() => {
    if (hexLayerRef.current && hexesWithBalls.length) {
      updateCanvas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, hexesWithBalls.length]);

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
