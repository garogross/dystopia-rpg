import React, { useState } from "react";
import {
  BottomLeftWing,
  BottomRightWing,
  TopLeftWing,
  TopRightWing,
  LeftBtnBg,
  RoghtBtnBg,
} from "../../layout/icons/BubbleFront/BubbleFrontHeader";
import {
  HeaderPremiumIcon,
  HeaderSettingsIcon,
  HeaderSwitcherIcon,
} from "../../layout/icons/Common/Header";
import { DotsLine } from "../../layout/icons/RPGGame/Common";
import { useAppSelector } from "../../../hooks/redux";
import { formatNumber } from "../../../utils/formatNumber";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { cpImage, cpImageWebp } from "../../../assets/imageMaps";

import styles from "./BubbleFrontHeader.module.scss";
import { useNavigate } from "react-router-dom";
import { onBoardingPagePath } from "../../../router/constants";
import SettingsModal from "../../SettingsModal/SettingsModal";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

const { getPremiumText } = TRANSLATIONS.common;
const BubbleFrontHeader = () => {
  const navigate = useNavigate();
  const cp = useAppSelector((state) => state.profile.stats.cp);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const [settingsOpened, setSettingsOpened] = useState(false);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.top}
      className={styles.bubbleFrontHeader}
    >
      <div className={styles.bubbleFrontHeader__sideCol}>
        <TopLeftWing />
        <div className={styles.bubbleFrontHeader__sideColMain}>
          <button
            onClick={() => navigate(onBoardingPagePath)}
            className={styles.bubbleFrontHeader__colBtn}
          >
            <HeaderSwitcherIcon />
            <div className={styles.bubbleFrontHeader__colBtnBg}>
              <LeftBtnBg />
            </div>
          </button>
          <div className={styles.bubbleFrontHeader__dotsline}>
            <DotsLine preserveAspectRatio />
          </div>
        </div>
        <BottomLeftWing />
      </div>
      <div className={styles.bubbleFrontHeader__centerCol}>
        <div className={styles.bubbleFrontHeader__cp}>
          <span>{formatNumber(cp)}</span>
          <ImageWebp
            src={cpImage}
            srcSet={cpImageWebp}
            alt="cash points"
            className={styles.bubbleFrontHeader__cpImage}
          />
        </div>
        <button className={styles.bubbleFrontHeader__premiumBtn}>
          <HeaderPremiumIcon />
          {getPremiumText[language]}
        </button>
      </div>
      <div className={styles.bubbleFrontHeader__sideCol}>
        <TopRightWing />
        <div
          className={`${styles.bubbleFrontHeader__sideColMain} ${styles.bubbleFrontHeader__sideColMain_right}`}
        >
          <div className={styles.bubbleFrontHeader__dotsline}>
            <DotsLine preserveAspectRatio />
          </div>
          <button
            onClick={() => setSettingsOpened(true)}
            className={styles.bubbleFrontHeader__colBtn}
          >
            <HeaderSettingsIcon width={16} />
            <div className={styles.bubbleFrontHeader__colBtnBg}>
              <RoghtBtnBg />
            </div>
          </button>
        </div>
        <BottomRightWing />
      </div>
      <SettingsModal
        show={settingsOpened}
        onClose={() => setSettingsOpened(false)}
      />
    </TransitionProvider>
  );
};

export default BubbleFrontHeader;
