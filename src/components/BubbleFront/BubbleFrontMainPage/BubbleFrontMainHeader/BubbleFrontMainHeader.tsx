import React from "react";
import HeaderWithBackButton from "../../../layout/HeaderWithBackButton/HeaderWithBackButton";
import { useNavigate } from "react-router-dom";
import { miniGamesPagePath } from "../../../../router/constants";
import { MissesIcon } from "../../../layout/icons/BubbleFront/BubbleFrontMainPage/BubbleFrontMainHeader";

import styles from "./BubbleFrontMainHeader.module.scss";

const BubbleFrontMainHeader = () => {
  const navigate = useNavigate();
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
            очки: 1000
          </div>
        </div>
        <div className={styles.bubbleFrontMainHeader__centerLine}></div>
        <div className={styles.bubbleFrontMainHeader__infoItem}>
          <div className={styles.bubbleFrontMainHeader__infoItemInner}>
            <span>Промахи:</span>
            <div className={styles.bubbleFrontMainHeader__misses}>
              <MissesIcon />
              <MissesIcon />
              <div className={styles.bubbleFrontMainHeader__miss}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleFrontMainHeader;
