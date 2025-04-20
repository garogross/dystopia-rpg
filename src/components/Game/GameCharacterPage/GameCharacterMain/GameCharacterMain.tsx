import React from "react";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  personModel1Image,
  personModel1ImageWebp,
} from "../../../../assets/images";
import styles from "./GameCharacterMain.module.scss";

const GameCharacterMain = () => {
  return (
    <div className={styles.gameCharacterMain}>
      <ImageWebp
        className={styles.gameCharacterMain__character}
        pictureClass={styles.gameCharacterMain__characterPicture}
        src={personModel1Image}
        alt="character"
        srcSet={personModel1ImageWebp}
      />
    </div>
  );
};

export default GameCharacterMain;
