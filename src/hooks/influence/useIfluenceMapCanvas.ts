import { useRef, useState } from "react";
import { Application, Container, ICanvas } from "pixi.js";
import { usePixi } from "./usePixi";

type OffsetType = {
  x: number;
  y: number;
};
const CLICKABLE_TRESHOLD = 2;

export const useIfluenceMapCanvas = () => {
  const [offset, setOffset] = useState<OffsetType>({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState(1);

  const isDraggingRef = useRef(false);

  const onInit = (app: Application<ICanvas>, hexLayer: Container) => {
    setOffset({ x: 0, y: 0 });

    // Enable panning & zooming
    let dragging = false,
      lastX = 0,
      lastY = 0;
    (app.view as HTMLCanvasElement).addEventListener(
      "mousedown",
      (e: MouseEvent) => {
        isDraggingRef.current = false; // Reset drag flag
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    );
    (app.view as HTMLCanvasElement).addEventListener(
      "mousemove",
      (e: MouseEvent) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        hexLayer.x += dx;
        hexLayer.y += dy;
        if (Math.sqrt(dx * dx + dy * dy) > CLICKABLE_TRESHOLD) {
          isDraggingRef.current = true;
        }
        lastX = e.clientX;
        lastY = e.clientY;
      }
    );
    const onMouseUp = () => {
      setOffset({
        x: hexLayer.x - app.screen.width / 2,
        y: hexLayer.y - app.screen.height / 2,
      });
      dragging = false;
    };
    (app.view as HTMLCanvasElement).addEventListener("mouseup", onMouseUp);
    (app.view as HTMLCanvasElement).addEventListener("mouseleave", onMouseUp);
    // Remove duplicate mousemove event (already added above)
    // (app.view as HTMLCanvasElement).addEventListener("mousemove", ...);

    // --- Mobile touch support ---
    let lastTouchX = 0,
      lastTouchY = 0,
      touchDragging = false,
      lastTouchDist = 0;
    (app.view as HTMLCanvasElement).addEventListener(
      "touchstart",
      (e: TouchEvent) => {
        isDraggingRef.current = false;

        if (e.touches.length === 1) {
          touchDragging = true;
          lastTouchX = e.touches[0].clientX;
          lastTouchY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
          // Pinch zoom start
          touchDragging = false;
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          lastTouchDist = Math.sqrt(dx * dx + dy * dy);
        }
      }
    );
    (app.view as HTMLCanvasElement).addEventListener(
      "touchmove",
      (e: TouchEvent) => {
        if (e.touches.length === 1 && touchDragging) {
          const touch = e.touches[0];
          const dx = touch.clientX - lastTouchX;
          const dy = touch.clientY - lastTouchY;
          hexLayer.x += dx;
          hexLayer.y += dy;
          // Only set drag flag if moved more than 5px
          if (Math.sqrt(dx * dx + dy * dy) > CLICKABLE_TRESHOLD) {
            isDraggingRef.current = true;
          }
          lastTouchX = touch.clientX;
          lastTouchY = touch.clientY;
        } else if (e.touches.length === 2) {
          // Pinch zoom
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (lastTouchDist) {
            const scaleFactor = dist / lastTouchDist;
            const minScale = 0.7;
            const maxScale = 1.3;
            let newScaleX = hexLayer.scale.x * scaleFactor;
            let newScaleY = hexLayer.scale.y * scaleFactor;
            newScaleX = Math.max(minScale, Math.min(maxScale, newScaleX));
            newScaleY = Math.max(minScale, Math.min(maxScale, newScaleY));
            hexLayer.scale.x = newScaleX;
            hexLayer.scale.y = newScaleY;
            setScale(hexLayer.scale.y);
          }
          lastTouchDist = dist;
        }
        e.preventDefault();
      },
      { passive: false }
    );
    (app.view as HTMLCanvasElement).addEventListener(
      "touchend",
      (e: TouchEvent) => {
        touchDragging = false;
        lastTouchDist = 0;
        setOffset({
          x: hexLayer.x - app.screen.width / 2,
          y: hexLayer.y - app.screen.height / 2,
        });
      }
    );

    let wheelTimeout: NodeJS.Timeout | null = null;
    (app.view as HTMLCanvasElement).addEventListener(
      "wheel",
      (e: WheelEvent) => {
        const scaleFactor = e.deltaY < 0 ? 1.1 : 0.9;
        const minScale = 0.7;
        const maxScale = 1.3;
        let newScaleX = hexLayer.scale.x * scaleFactor;
        let newScaleY = hexLayer.scale.y * scaleFactor;
        // Clamp the scale values
        newScaleX = Math.max(minScale, Math.min(maxScale, newScaleX));
        newScaleY = Math.max(minScale, Math.min(maxScale, newScaleY));
        hexLayer.scale.x = newScaleX;
        hexLayer.scale.y = newScaleY;

        // Debounce updating the React state until wheel ends
        if (wheelTimeout) clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          setScale(hexLayer.scale.y);
        }, 100);
      }
    );
  };

  const { isInitialized, pixiContainer, appRef, hexLayerRef } = usePixi(onInit);

  return {
    isInitialized,
    offset,
    scale,
    pixiContainer,
    appRef,
    hexLayerRef,
    isDraggingRef,
  };
};
