import React from "react";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  personModel1Image,
  personModel1ImageWebp,
} from "../../../../assets/imageMaps";
import styles from "./RPGGameCharacterMain.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";
const RPGGameCharacterMain = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      className={styles.rpgGameCharacterMain}
      style={TransitionStyleTypes.left}
      inProp={gameInited}
    >
      <ImageWebp
        className={styles.rpgGameCharacterMain__character}
        pictureClass={styles.rpgGameCharacterMain__characterPicture}
        src={personModel1Image}
        alt="character"
        srcSet={personModel1ImageWebp}
      />
    </TransitionProvider>
  );
};

export default RPGGameCharacterMain;
