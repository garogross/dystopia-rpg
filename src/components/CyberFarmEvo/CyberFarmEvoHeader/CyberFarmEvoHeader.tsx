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
import CyberFarmEvoLanguageMenuBar from "../CyberFarmEvoLanguageMenuBar/CyberFarmEvoLanguageMenuBar";
import CyberFarmEvoUiSettingsMenuBar from "../CyberFarmEvoUiSettingsMenuBar/CyberFarmEvoUiSettingsMenuBar";
import CyberFarmEvoSupportMenuBar from "../CyberFarmEvoSupportMenuBar/CyberFarmEvoSupportMenuBar";

const CyberFarmEvoHeader = () => {
  const cp = useAppSelector((state) => state.profile.stats.cp);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [profileModalOpened, setProfileModalOpened] = useState(false);
  const [languageModalOpened, setLanguageModalOpened] = useState(false);
  const [uiSettingsModalOpened, setUiSettingsModalOpened] = useState(false);
  const [supportModalOpened, setSupportModalOpened] = useState(false);
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
            className={`${styles.cyberFarmEvoHeader__colBtn} ${
              profileModalOpened ? styles.cyberFarmEvoHeader__colBtn_active : ""
            }`}
          >
            <ProfileIcon />
            <span>Профиль</span>
            <div className={styles.cyberFarmEvoHeader__colBtnBg}>
              <LeftBtnBg />
            </div>
          </button>
          {!profileModalOpened && (
            <div className={styles.cyberFarmEvoHeader__dotsline}>
              <DotsLine preserveAspectRatio />
            </div>
          )}
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
          {!supportModalOpened && (
            <div className={styles.cyberFarmEvoHeader__dotsline}>
              <DotsLine preserveAspectRatio />
            </div>
          )}
          <button
            onClick={() => setSupportModalOpened(true)}
            className={`${styles.cyberFarmEvoHeader__colBtn} ${
              styles.cyberFarmEvoHeader__colBtn_right
            } ${
              supportModalOpened ? styles.cyberFarmEvoHeader__colBtn_active : ""
            }`}
          >
            <span>Справка</span>
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
        openUiSettings={() => setUiSettingsModalOpened(true)}
        openLanguageMenu={() => setLanguageModalOpened(true)}
      />
      <CyberFarmEvoLanguageMenuBar
        show={languageModalOpened}
        onClose={() => setLanguageModalOpened(false)}
      />
      <CyberFarmEvoUiSettingsMenuBar
        show={uiSettingsModalOpened}
        onClose={() => setUiSettingsModalOpened(false)}
      />
      <CyberFarmEvoSupportMenuBar
        show={supportModalOpened}
        onClose={() => setSupportModalOpened(false)}
      />
    </TransitionProvider>
  );
};

export default CyberFarmEvoHeader;
