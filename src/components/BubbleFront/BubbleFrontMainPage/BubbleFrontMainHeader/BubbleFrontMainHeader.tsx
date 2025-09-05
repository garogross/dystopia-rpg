import React from "react";
import HeaderWithBackButton from "../../../layout/HeaderWithBackButton/HeaderWithBackButton";
import { useNavigate } from "react-router-dom";
import { miniGamesPagePath } from "../../../../router/constants";

import styles from "./BubbleFrontMainHeader.module.scss";
import { useAppSelector } from "../../../../hooks/redux";
import { BUBBLE_FRONT_LEVELS_SETTINGS } from "../../../../constants/bubbleFront/BubbleFrontLevelsSettings";
import { DifficultyIcon } from "../../../layout/icons/BubbleFront/BubbleFrontMainPage/BubbleFrontMainHeader";

interface Props {
  score: number;
}

const BubbleFrontMainHeader: React.FC<Props> = ({ score }) => {
  const navigate = useNavigate();
  const curDifficultylevel = useAppSelector(
    (state) => state.bubbleFront.global.curDifficultylevel
  );

  const difficlutyKeys = Object.keys(BUBBLE_FRONT_LEVELS_SETTINGS);
  const levelindex = difficlutyKeys.indexOf(curDifficultylevel);
  return (
    <div className={styles.bubbleFrontMainHeader}>
      <HeaderWithBackButton
        onClose={() => {
          navigate(miniGamesPagePath);
        }}
        title="Bubble Front"
      />
      <div className={styles.bubbleFrontMainHeader__info}>
        <div className={styles.bubbleFrontMainHeader__infoItem}>
          <div className={styles.bubbleFrontMainHeader__infoItemInner}>
            очки: {score}
          </div>
        </div>
        <div className={styles.bubbleFrontMainHeader__centerLine}></div>
        <div className={styles.bubbleFrontMainHeader__infoItem}>
          <div className={styles.bubbleFrontMainHeader__infoItemInner}>
            <span>Сложность:</span>
            <div className={styles.bubbleFrontMainHeader__difficulty}>
              {Array.from({ length: 3 }, (_, i) => (
                <DifficultyIcon hidden={i > levelindex} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleFrontMainHeader;
