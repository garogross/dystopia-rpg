import React from "react";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  personModel1Image,
  personModel1ImageWebp,
} from "../../../../assets/images";
import styles from "./GameCharacterMain.module.scss";
import TransitionProvider, { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";
const GameCharacterMain = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      className={styles.gameCharacterMain}
      style={TransitionStyleTypes.left}
      inProp={gameInited}
    >
      <ImageWebp
        className={styles.gameCharacterMain__character}
        pictureClass={styles.gameCharacterMain__characterPicture}
        src={personModel1Image}
        alt="character"
        srcSet={personModel1ImageWebp}
      />
    </TransitionProvider>
  );
};

export default GameCharacterMain;
