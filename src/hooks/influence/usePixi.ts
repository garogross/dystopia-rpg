import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../redux";
import { Application, Container, ICanvas } from "pixi.js";
import { getPlatformType } from "../../utils/getPlatformType";

export const usePixi = (
  onInit?: (app: Application<ICanvas>, hexLayer: Container) => void,
  centered?: boolean
) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [isInitialized, setIsInitialized] = useState(false);

  const pixiContainer = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application>();
  const hexLayerRef = useRef<Container>();

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
        // Ensure canvas behaves like a block element to avoid inline-gap quirks
        (app.view as HTMLCanvasElement).style.display = "block";
        pixiContainer.current.appendChild(app.view as HTMLCanvasElement);
        canvas = app.view as HTMLCanvasElement;
      }
      appRef.current = app;

      const hexLayer = new Container();
      app.stage.addChild(hexLayer);
      hexLayerRef.current = hexLayer;

      if (centered) {
        hexLayer.x = app.screen.width / 2;
        hexLayer.y = app.screen.height / 2;
      }

      // Perf: avoid event crawling
      // hexLayer.interactiveChildren = false;

      setIsInitialized(true);
      onInit?.(app, hexLayer);
    };

    initPixiMap();

    return () => {
      if (appRef.current) {
        const view = appRef.current.view as HTMLCanvasElement;
        if (view) {
          view.replaceWith(view.cloneNode(true));
          // Quick hack: clears all attached listeners
        }
        appRef.current.destroy(true, {
          children: true,
          texture: false,
          baseTexture: false,
        });
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
    pixiContainer,
    appRef,
    hexLayerRef,
  };
};
