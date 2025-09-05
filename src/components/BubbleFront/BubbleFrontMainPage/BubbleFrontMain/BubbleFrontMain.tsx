import React, { useState } from "react";
import styles from "./BubbleFrontMain.module.scss";
import BubbleFrontMainCanvas from "../BubbleFrontMainCanvas/BubbleFrontMainCanvas";
import BubbleFrontMainHeader from "../BubbleFrontMainHeader/BubbleFrontMainHeader";

const BubbleFrontMain = () => {
  const [score, setScore] = useState(0);
  return (
    <div className={`container ${styles.bubbleFrontMain}`}>
      <BubbleFrontMainHeader score={score} />
      <BubbleFrontMainCanvas score={score} setScore={setScore} />
    </div>
  );
};

export default BubbleFrontMain;
