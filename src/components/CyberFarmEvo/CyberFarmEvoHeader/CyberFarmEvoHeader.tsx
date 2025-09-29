import React, { useState } from "react";
import styles from "./CyberFarmEvoHeader.module.scss";
import { useAppSelector } from "../../../hooks/redux";

import { DotsLine } from "../../layout/icons/RPGGame/Common";
import { formatNumber } from "../../../utils/formatNumber";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import {
  BottomLeftWing,
  BottomRightWing,
  TopLeftWing,
  TopRightWing,
} from "../../layout/icons/BubbleFront/BubbleFrontHeader";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { cpImage, cpImageWebp } from "../../../assets/imageMaps";
import {
  HelpCenterIcon,
  LeftBtnBg,
  ProfileIcon,
  RightBtnBg,
} from "../../layout/icons/CyberFarmEvo/Header";
import CyberFarmEvoProfileMenuBar from "../CyberFarmEvoProfileMenuBar/CyberFarmEvoProfileMenuBar";

const CyberFarmEvoHeader = () => {
  const cp = useAppSelector((state) => state.profile.stats.cp);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [profileModalOpened, setProfileModalOpened] = useState(false);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.top}
      className={styles.cyberFarmEvoHeader}
    >
      <div className={styles.cyberFarmEvoHeader__sideCol}>
        <TopLeftWing />
        <div className={styles.cyberFarmEvoHeader__sideColMain}>
          <button
            onClick={() => setProfileModalOpened(true)}
            className={styles.cyberFarmEvoHeader__colBtn}
          >
            <ProfileIcon />
            <div className={styles.cyberFarmEvoHeader__colBtnBg}>
              <LeftBtnBg />
            </div>
          </button>
          <div className={styles.cyberFarmEvoHeader__dotsline}>
            <DotsLine preserveAspectRatio />
          </div>
        </div>
        <BottomLeftWing />
      </div>
      <div className={styles.cyberFarmEvoHeader__centerCol}>
        <div className={styles.cyberFarmEvoHeader__cp}>
          <span>{formatNumber(cp)}</span>
          <ImageWebp
            src={cpImage}
            srcSet={cpImageWebp}
            alt="cash points"
            className={styles.cyberFarmEvoHeader__cpImage}
          />
        </div>
      </div>
      <div className={styles.cyberFarmEvoHeader__sideCol}>
        <TopRightWing />
        <div
          className={`${styles.cyberFarmEvoHeader__sideColMain} ${styles.cyberFarmEvoHeader__sideColMain_right}`}
        >
          <div className={styles.cyberFarmEvoHeader__dotsline}>
            <DotsLine preserveAspectRatio />
          </div>
          <button className={styles.cyberFarmEvoHeader__colBtn}>
            <HelpCenterIcon />
            <div className={styles.cyberFarmEvoHeader__colBtnBg}>
              <RightBtnBg />
            </div>
          </button>
        </div>
        <BottomRightWing />
      </div>
      <CyberFarmEvoProfileMenuBar
        show={profileModalOpened}
        onClose={() => setProfileModalOpened(false)}
      />
    </TransitionProvider>
  );
};

export default CyberFarmEvoHeader;
