import React, { useEffect, useState } from "react";
import styles from "./GamePlayArea.module.scss";
import {
  gamePlayAreaBgImage,
  positionPlaceImage,
} from "../../../../assets/images";
import { Game } from "../../../../canvasModels/Game";

const GamePlayArea = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      setGame(new Game(canvasRef.current));
    }
  }, [canvasRef]);

  useEffect(() => {
    if (game) {
      game.drawCourts();
    }
  }, [game]);
  const width = canvasRef.current?.parentElement?.clientWidth;
  const height = canvasRef.current?.parentElement?.clientHeight;
  return (
    <div
      className={styles.gamePlayArea}
      style={{
        backgroundImage: `url(${gamePlayAreaBgImage})`,
      }}
    >
      <header className={styles.gamePlayArea__header}></header>
      <section className={styles.gamePlayArea__canvasWrapper}>
        <canvas ref={canvasRef} width={width} height={height}></canvas>
        <img
          src={positionPlaceImage}
          id="positionPlace"
          alt="positionPlace"
          width={200}
          height={200}
          style={{ visibility: "hidden", position: "absolute" }}
        />
      </section>
      <footer className={styles.gamePlayArea__footer}></footer>
    </div>
  );
};

export default GamePlayArea;
