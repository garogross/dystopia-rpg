import { useState, useEffect, useCallback } from "react";
import { Game } from "../canvasModels/Game"; // Adjust path
import { PositionPlace } from "../canvasModels/PositionPlace"; // Adjust path

interface UseCanvasGameProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  game: Game | null;
  initGame: (game: Game) => void;
  setLoading: (loading: boolean) => void;
  animating: boolean;
  isOurStep: boolean; // From battle logic
  onSelectPlace: (place: PositionPlace | null) => void; // Callback to inform battle logic
}

export const useCanvasGame = ({
  canvasRef,
  game,
  initGame,
  setLoading,
  animating,
  isOurStep,
  onSelectPlace,
}: UseCanvasGameProps) => {
  const [sizes, setSizes] = useState<[number, number]>([0, 0]);

  const updateCanvasSizes = useCallback(() => {
    const width = canvasRef.current?.parentElement?.clientWidth || 0;
    const height = canvasRef.current?.parentElement?.clientHeight || 0;
    setSizes([width, height]);
  }, [canvasRef]);

  useEffect(() => {
    if (canvasRef.current) {
      updateCanvasSizes();
    }
  }, [canvasRef, updateCanvasSizes]);

  useEffect(() => {
    if (sizes.every((size) => size) && canvasRef.current) {
      initGame(new Game(canvasRef.current));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, sizes]);

  const onClickCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!game || !game.courts || animating || !isOurStep) return;

    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    const rightCourtPlaces = game.courts[1].lines.flatMap(
      (line) => line.places
    );
    const curPlace = rightCourtPlaces.find(
      (place) =>
        place.checkTarget(x, y) && place.character && !place.character.death
    );

    if (curPlace) {
      rightCourtPlaces.forEach((place) => place.hidePlace());
      curPlace.showPlace();
      game.updateCanvas();
      onSelectPlace(curPlace); // Inform battle logic about selected place
    } else {
      // If nothing selected or clicking outside a character, clear selection
      onSelectPlace(null); // Pass null to clear selection
      game.courts[1].lines
        .flatMap((line) => line.places)
        .forEach((place) => place.hidePlace());
      game.updateCanvas();
    }
  };

  const onUpdateCanvas = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      updateCanvasSizes();
    }, 100);
  }, [setLoading, updateCanvasSizes]);

  return {
    game,
    sizes,
    onClickCanvas,
    onUpdateCanvas,
  };
};
