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

// minimum length of a line to remove
const MIN_LINE = 5;

// number of balls to spawn after a move if no lines removed
const SPAWN_COUNT = 3;

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
    fields[idx] = { ball: randomBall as EGridlineBalls };
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

  // road graphics and move state
  const roadGraphicsRef = useRef<Graphics[]>([]);
  const isMovingRef = useRef(false);

  // moving animation refs (replaces timeout)
  const movingAnimRef = useRef<{
    sprite: Sprite;
    points: { x: number; y: number }[];
    curIndex: number; // next point index in points array
    speedPerTick: number; // pixels per ticker delta unit
  } | null>(null);
  const moveTickerFnRef = useRef<((delta: number) => void) | null>(null);

  // Helper: compute neighbors (4-directional)
  const neighbors = (index: number) => {
    const row = Math.floor(index / BALLS_PER_ROW);
    const col = index % BALLS_PER_ROW;
    const result: number[] = [];
    if (row > 0) result.push(index - BALLS_PER_ROW); // up
    if (row < BALLS_PER_ROW - 1) result.push(index + BALLS_PER_ROW); // down
    if (col > 0) result.push(index - 1); // left
    if (col < BALLS_PER_ROW - 1) result.push(index + 1); // right
    return result;
  };

  // Helper: BFS shortest path from start to target.
  // Treat start as passable even if occupied; other nodes must be empty unless they are the target.
  const findShortestPath = (
    start: number,
    target: number,
    localFields: IField[]
  ): number[] | null => {
    if (start === target) return [start];
    const q: number[] = [];
    const visited = new Array(localFields.length).fill(false);
    const parent = new Array<number | null>(localFields.length).fill(null);

    q.push(start);
    visited[start] = true;

    while (q.length) {
      const cur = q.shift() as number;
      for (const nb of neighbors(cur)) {
        if (visited[nb]) continue;
        // allow stepping into target regardless (target should be empty in our use-case),
        // allow stepping into empty cells
        if (nb !== target && localFields[nb].ball) continue;
        visited[nb] = true;
        parent[nb] = cur;
        if (nb === target) {
          // reconstruct path
          const path: number[] = [nb];
          let p: number | null = parent[nb];
          while (p !== null) {
            path.push(p);
            p = parent[p];
          }
          return path.reverse(); // from start to target
        }
        q.push(nb);
      }
    }
    return null;
  };

  // New: find lines (horizontal, vertical, diagonal) of length >= MIN_LINE
  // Returns array of unique indices to remove
  const findLinesToRemove = (localFields: IField[]): number[] => {
    const toRemove = new Set<number>();
    const rows = BALLS_PER_ROW;
    const cols = BALLS_PER_ROW;

    const index = (r: number, c: number) => r * cols + c;

    // directions: [dr, dc]
    const dirs: [number, number][] = [
      [0, 1], // horizontal right
      [1, 0], // vertical down
      [1, 1], // diagonal down-right
      [1, -1], // diagonal down-left
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = index(r, c);
        const cell = localFields[i];
        if (!cell || !cell.ball) continue;
        const color = cell.ball;

        for (const [dr, dc] of dirs) {
          const prevR = r - dr;
          const prevC = c - dc;
          // if previous in this direction exists and same color, skip (we only start at the sequence head)
          if (
            prevR >= 0 &&
            prevR < rows &&
            prevC >= 0 &&
            prevC < cols &&
            localFields[index(prevR, prevC)]?.ball === color
          ) {
            continue;
          }

          // collect forward
          const seq: number[] = [i];
          let nr = r + dr;
          let nc = c + dc;
          while (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            const ni = index(nr, nc);
            if (localFields[ni]?.ball === color) {
              seq.push(ni);
            } else {
              break;
            }
            nr += dr;
            nc += dc;
          }

          if (seq.length >= MIN_LINE) {
            for (const idx of seq) toRemove.add(idx);
          }
        }
      }
    }

    return Array.from(toRemove);
  };

  // spawn N random balls into empty cells (mutates a shallow copy passed in)
  const spawnRandomBalls = (count: number, localFields: IField[]) => {
    const emptyIndices: number[] = [];
    for (let i = 0; i < localFields.length; i++) {
      if (!localFields[i] || !localFields[i].ball) emptyIndices.push(i);
    }
    if (emptyIndices.length === 0) return;

    // shuffle emptyIndices
    for (let i = emptyIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [emptyIndices[i], emptyIndices[j]] = [emptyIndices[j], emptyIndices[i]];
    }

    const ballTypes = Object.values(EGridlineBalls);
    const toPlace = Math.min(count, emptyIndices.length);
    for (let k = 0; k < toPlace; k++) {
      const idx = emptyIndices[k];
      const randomBall =
        ballTypes[Math.floor(Math.random() * ballTypes.length)];
      localFields[idx] = { ball: randomBall as EGridlineBalls };
    }
  };

  // Clear road graphics (if any)
  const clearRoadGraphics = () => {
    if (!hexLayerRef.current) return;
    for (const g of roadGraphicsRef.current) {
      if (g.parent) g.parent.removeChild(g);
      g.destroy();
    }
    roadGraphicsRef.current = [];
  };

  // Cancel pending move animation (if any)
  const cancelPendingMove = () => {
    // stop ticker handler for movement
    if (moveTickerFnRef.current) {
      Ticker.shared.remove(moveTickerFnRef.current);
      moveTickerFnRef.current = null;
    }
    // destroy moving sprite if exists
    if (movingAnimRef.current) {
      try {
        if (movingAnimRef.current.sprite.parent)
          movingAnimRef.current.sprite.parent.removeChild(
            movingAnimRef.current.sprite
          );
      } catch {}
      try {
        movingAnimRef.current.sprite.destroy();
      } catch {}
      movingAnimRef.current = null;
    }
    isMovingRef.current = false;
    clearRoadGraphics();
  };

  // updateCanvas accepts optional fields and selected index so we can rerender immediately with new data
  const updateCanvas = (fieldsArg?: IField[], selArg?: number) => {
    if (!pixiContainer.current || !hexLayerRef.current) return;

    // stop any existing ticker for regular sprite scaling (we'll add it back)
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

    // Clear any existing road markers (we will re-draw if needed)
    clearRoadGraphics();

    // Get the width and compute rect size
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
        // PIXI v7+ pattern
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        graphics.eventMode = "static";
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        graphics.cursor = "pointer";
      } catch {
        // fallback for older PIXI
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        graphics.interactive = true;
      }

      // store graphics reference for later resets
      graphicsMapRef.current[i] = graphics;

      // pointer event to set selected index and update visuals (or transfer ball)
      graphics.on("pointerdown", () => {
        // ignore inputs while moving
        if (isMovingRef.current) return;

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
          // Find path over empty cells
          const localCopy = [...currentFields];
          const path = findShortestPath(sel, i, localCopy);

          if (!path) {
            // no path found - optionally provide feedback (no-op now)
            return;
          }

          // Draw small white circles along the path (excluding the start index)
          clearRoadGraphics();
          for (let p = 1; p < path.length; p++) {
            const idx = path[p];
            const r = Math.floor(idx / BALLS_PER_ROW);
            const c = idx % BALLS_PER_ROW;
            const circle = new Graphics();
            circle.beginFill(0xffffff, 1);
            // small radius relative to rectSize
            const radius = Math.max(3, Math.floor(rectSize * 0.08));
            circle.drawCircle(0, 0, radius);
            circle.endFill();
            circle.x = c * rectSize + rectSize / 2;
            circle.y = r * rectSize + rectSize / 2;
            // ensure circles don't block pointer events
            try {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              circle.eventMode = "none";
            } catch {
              // fallback
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              circle.interactive = false;
            }
            hexLayerRef.current?.addChild(circle);
            roadGraphicsRef.current.push(circle);
          }

          // Set moving state to prevent concurrent interactions
          isMovingRef.current = true;

          // Prepare moving sprite (clone)
          const info = spriteInfoRef.current[sel];
          const texture =
            (info && info.sprite && info.sprite.texture) ||
            BALLS[selectedField.ball as EGridlineBalls];
          const movingSprite = new Sprite(texture);
          // compute baseScale
          const baseScale =
            info?.baseScale ??
            Math.min(
              (rectSize * 0.9) / (texture.width || rectSize),
              (rectSize * 0.9) / (texture.height || rectSize)
            );
          movingSprite.scale.set(baseScale);
          movingSprite.anchor.set(0.5);

          // start position - center of source cell
          const startRow = Math.floor(sel / BALLS_PER_ROW);
          const startCol = sel % BALLS_PER_ROW;
          movingSprite.x = startCol * rectSize + rectSize / 2;
          movingSprite.y = startRow * rectSize + rectSize / 2;

          // Add to layer
          hexLayerRef.current?.addChild(movingSprite);

          // destroy static sprite for source if present (we will redraw after animation)
          if (info && info.sprite) {
            try {
              if (info.sprite.parent)
                info.sprite.parent.removeChild(info.sprite);
            } catch {}
            try {
              info.sprite.destroy();
            } catch {}
            delete spriteInfoRef.current[sel];
          }

          // Build points array (centers of path nodes, starting from first step)
          const points: { x: number; y: number }[] = [];
          for (let p = 1; p < path.length; p++) {
            const idx = path[p];
            const r = Math.floor(idx / BALLS_PER_ROW);
            const c = idx % BALLS_PER_ROW;
            points.push({
              x: c * rectSize + rectSize / 2,
              y: r * rectSize + rectSize / 2,
            });
          }

          // movement speed - pixels per ticker delta unit (delta is ~1 at 60fps)
          const speedPerTick = Math.max(2, rectSize * 0.35);

          // register moving animation object
          movingAnimRef.current = {
            sprite: movingSprite,
            points,
            curIndex: 0,
            speedPerTick,
          };

          // Ticker callback to drive movement
          const moveTicker = (delta: number) => {
            const anim = movingAnimRef.current;
            if (!anim) return;
            if (anim.curIndex >= anim.points.length) {
              // finished: update fields and cleanup
              const newFields = [...fieldsRef.current];
              newFields[i] = { ball: selectedField.ball };
              newFields[sel] = {};

              // After the move, check for lines to remove
              const linesToRemove = findLinesToRemove(newFields);
              if (linesToRemove.length > 0) {
                // remove them
                for (const idx of linesToRemove) {
                  newFields[idx] = {};
                }
                // commit state + fieldsRef
                setFields(newFields);
                fieldsRef.current = newFields;

                // remove moving sprite
                try {
                  if (anim.sprite.parent)
                    anim.sprite.parent.removeChild(anim.sprite);
                } catch {}
                try {
                  anim.sprite.destroy();
                } catch {}
                movingAnimRef.current = null;

                // clear road and flags
                clearRoadGraphics();
                isMovingRef.current = false;

                // remove ticker handler
                if (moveTickerFnRef.current) {
                  Ticker.shared.remove(moveTickerFnRef.current);
                  moveTickerFnRef.current = null;
                }

                // clear selection
                selectedIndexRef.current = -1;
                setSelectedFieldIndex(-1);

                // re-render canvas with removals applied
                updateCanvas(newFields, -1);
                return;
              }

              // no lines found: spawn new balls and finalize
              // spawn SPAWN_COUNT new balls in random empty places
              spawnRandomBalls(SPAWN_COUNT, newFields);

              // commit state + fieldsRef
              setFields(newFields);
              fieldsRef.current = newFields;

              // remove moving sprite
              try {
                if (anim.sprite.parent)
                  anim.sprite.parent.removeChild(anim.sprite);
              } catch {}
              try {
                anim.sprite.destroy();
              } catch {}
              movingAnimRef.current = null;

              // clear road and flags
              clearRoadGraphics();
              isMovingRef.current = false;

              // remove ticker handler
              if (moveTickerFnRef.current) {
                Ticker.shared.remove(moveTickerFnRef.current);
                moveTickerFnRef.current = null;
              }

              // clear selection
              selectedIndexRef.current = -1;
              setSelectedFieldIndex(-1);

              // re-render canvas with updated fields
              updateCanvas(newFields, -1);
              return;
            }

            const target = anim.points[anim.curIndex];
            const dx = target.x - anim.sprite.x;
            const dy = target.y - anim.sprite.y;
            const dist = Math.hypot(dx, dy);
            const step = anim.speedPerTick * delta;
            if (dist <= step) {
              // snap to target and advance
              anim.sprite.x = target.x;
              anim.sprite.y = target.y;
              anim.curIndex += 1;
            } else {
              anim.sprite.x += (dx / dist) * step;
              anim.sprite.y += (dy / dist) * step;
            }
          };

          moveTickerFnRef.current = moveTicker;
          Ticker.shared.add(moveTicker);
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

    // Start ticker animation for scale up/down — only animate the selected sprite (if no moving animation in progress)
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
      // cancel any pending move animation
      cancelPendingMove();

      spriteInfoRef.current = {};
      graphicsMapRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  return <div className={styles.gridlineMainCanvas} ref={pixiContainer}></div>;
};

export default GridlineMainCanvas;
