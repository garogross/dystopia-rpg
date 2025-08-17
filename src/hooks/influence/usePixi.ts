import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../redux";
import { Application, Container } from "pixi.js";
import { getPlatformType } from "../../utils/getPlatformType";

type OffsetType = {
  x: number;
  y: number;
};

export const usePixiTs = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [isInitialized, setIsInitialized] = useState(false);
  const [offset, setOffset] = useState<OffsetType>({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState(1);
  const pixiContainer = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application>();
  const hexLayerRef = useRef<Container>();
  const isDraggingRef = useRef(false);

  const isMobile = getPlatformType();

  useEffect(() => {
    if (!gameInited || !pixiContainer.current) return;
    let canvas: HTMLCanvasElement | null = null;

    const initPixiMap = () => {
      // Detect mobile for lower resolution and antialias

      // PIXI v7.2: Application constructor takes options directly, and .canvas is now .view
      const app = new Application({
        resizeTo: pixiContainer.current as HTMLElement,
        backgroundAlpha: 0,
        antialias: !isMobile, // Disable antialias on mobile for perf
        // useContextAlpha: false, // Perf: disables alpha channel if not needed
        resolution: isMobile ? 2 : window.devicePixelRatio,
        autoStart: true, // Auto-starts the render loop
        sharedTicker: true, // Use shared ticker for better performance

        // Automatic resize options
        autoDensity: true, // Adjust for device pixel ratio

        // Advanced options
        powerPreference: "high-performance",
      });

      // In v7.2, the canvas is called .view
      if (app?.view && pixiContainer.current) {
        pixiContainer.current.appendChild(app.view as HTMLCanvasElement);
        canvas = app.view as HTMLCanvasElement;
      }
      appRef.current = app;

      const hexLayer = new Container();
      app.stage.addChild(hexLayer);
      hexLayerRef.current = hexLayer;

      hexLayer.x = app.screen.width / 2;
      hexLayer.y = app.screen.height / 2;

      // Perf: avoid event crawling
      // hexLayer.interactiveChildren = false;

      // Set initial offset to 0 since we're already centered
      setOffset({ x: 0, y: 0 });
      setIsInitialized(true);

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
          hexLayer.x += e.clientX - lastX;
          hexLayer.y += e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;
          isDraggingRef.current = true; // Set drag flag if moved
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
          isDraggingRef.current = true;

          if (e.touches.length === 1 && touchDragging) {
            const touch = e.touches[0];
            hexLayer.x += touch.clientX - lastTouchX;
            hexLayer.y += touch.clientY - lastTouchY;
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

    initPixiMap();

    return () => {
      if (appRef.current) {
        const view = appRef.current.view as HTMLCanvasElement;
        if (view) {
          view.replaceWith(view.cloneNode(true));
          // Quick hack: clears all attached listeners
        }
        appRef.current.destroy(true, { children: true, texture: true });
        appRef.current = undefined;
      }
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      if (pixiContainer.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        pixiContainer.current.innerHTML = "";
      }
      // Reset refs and state
      hexLayerRef.current = undefined;
      setIsInitialized(false);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameInited]);

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
