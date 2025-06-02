import React, { useEffect, useState } from "react";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";

import styles from "./GamePlayAreaOrintationCheckModal.module.scss";

interface Props {
  updateCanvas: () => void;
}

const checkOrientation = () =>
  window.screen?.orientation &&
  window.screen?.orientation.type.includes("landscape");

const GamePlayAreaOrintationCheckModal: React.FC<Props> = ({
  updateCanvas,
}) => {
  const [isOrintationLanscape, setIsOrintationLanscape] = useState(
    checkOrientation()
  );

  useEffect(() => {
    const onOrientationUpdate = () => {
      setIsOrintationLanscape(checkOrientation());
      updateCanvas();
    };
    window.screen.orientation?.addEventListener("change", onOrientationUpdate);

    return () => {
      window.screen.orientation?.removeEventListener(
        "change",
        onOrientationUpdate
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <TransitionProvider
      style={TransitionStyleTypes.opacity}
      inProp={!isOrintationLanscape}
      className={styles.gamePlayAreaOrintationCheckModal}
    >
      <h3 className={styles.gamePlayAreaOrintationCheckModal__text}>
        Пожалуйста, поменяйте ориентацию на ландшафтную для продолжения игры
      </h3>
    </TransitionProvider>
  );
};

export default GamePlayAreaOrintationCheckModal;
