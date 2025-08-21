import React from "react";
import styles from "./BubbleFrontMain.module.scss";
import BubbleFrontMainCanvas from "../BubbleFrontMainCanvas/BubbleFrontMainCanvas";
import BubbleFrontMainHeader from "../BubbleFrontMainHeader/BubbleFrontMainHeader";

const BubbleFrontMain = () => {
  //   const { isInitialized, pixiContainer, appRef, hexLayerRef } = usePixi();

  return (
    <div className={`container ${styles.bubbleFrontMain}`}>
      <BubbleFrontMainHeader />
      <BubbleFrontMainCanvas />
    </div>
  );
};

export default BubbleFrontMain;
