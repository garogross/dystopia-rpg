import React, { useState } from "react";
import { CopyIcon, DotslineLong, EditIcon } from "../../../layout/icons/Common";
import { InfoDropDownArrowIcon } from "../../../layout/icons/Influence/InfluencePlayer";
import { useAppSelector } from "../../../../hooks/redux";

import styles from "./InfluencePlayerMain.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";

const {
  copyText,
  clanText,
  apCostReductionText,
  sectorAttackText,
  constructionText,
  buildingRepairText,
} = TRANSLATIONS.influence.player.main;

const InfluencePlayerMain = () => {
  const avatar = useAppSelector((state) => state.profile.avatar);
  const username = useAppSelector((state) => state.profile.username);
  const tgId = useAppSelector((state) => state.profile.tgId);
  const language = useAppSelector((state) => state.ui.language);
  const clan = "";
  const [opened, setOpened] = useState(true);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    if (tgId) {
      navigator.clipboard.writeText(tgId.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div
      className={`${styles.influencePlayerMain} ${
        !opened ? styles.influencePlayerMain_closed : ""
      }`}
    >
      <button
        className={styles.influencePlayerMain__header}
        onClick={() => setOpened((prev) => !prev)}
      >
        <div className={styles.influencePlayerMain__headerInner}>
          <div className={styles.influencePlayerMain__avatar}>
            {avatar && (
              <img
                src={avatar}
                alt="avatar"
                className={styles.influencePlayerMain__avatarImg}
              />
            )}
          </div>
          <div className={styles.influencePlayerMain__headerContent}>
            <div className={styles.influencePlayerMain__headerContentInner}>
              <button className={styles.influencePlayerMain__nameEditBtn}>
                <span>{username}</span>
                <EditIcon />
              </button>
              <div className={styles.influencePlayerMain__dropdownArrowWrapper}>
                <InfoDropDownArrowIcon rotated={opened} />
              </div>
            </div>
          </div>
        </div>
      </button>
      <TransitionProvider
        inProp={opened}
        style={TransitionStyleTypes.height}
        height={200}
        className={styles.influencePlayerMain__dropdownContent}
      >
        <div className={styles.influencePlayerMain__dropdownContentCol}>
          <span className={styles.influencePlayerMain__boldText}>ID:</span>
          <button
            onClick={onCopy}
            className={styles.influencePlayerMain__copyBtn}
          >
            <span className={styles.influencePlayerMain__valueText}>
              {tgId}
            </span>
            <CopyIcon />
            <TransitionProvider
              inProp={copied}
              style={TransitionStyleTypes.opacity}
              className={styles.influencePlayerMain__valueText}
            >
              {copyText[language]}
            </TransitionProvider>
          </button>
        </div>
        {clan && (
          <div className={styles.influencePlayerMain__dropdownContentCol}>
            <span className={styles.influencePlayerMain__boldText}>
              {clanText[language]}:{" "}
            </span>
            <span className={styles.influencePlayerMain__valueText}>
              {clan}
            </span>
          </div>
        )}
        <div className={styles.influencePlayerMain__dropdownContentCol}>
          <span className={styles.influencePlayerMain__boldText}>
            {apCostReductionText[language]}{" "}
          </span>
          <span className={styles.influencePlayerMain__dotsLine}>
            <DotslineLong preserveAspectRatio />{" "}
          </span>
        </div>
        <div className={styles.influencePlayerMain__dropdownContentCol}>
          <span className={styles.influencePlayerMain__boldText}>
            - {sectorAttackText[language]}:{" "}
          </span>
          <span className={styles.influencePlayerMain__valueText}>−10%</span>
        </div>
        <div className={styles.influencePlayerMain__dropdownContentCol}>
          <span className={styles.influencePlayerMain__boldText}>
            - {constructionText[language]}:
          </span>
          <span className={styles.influencePlayerMain__valueText}>−5%</span>
        </div>
        <div className={styles.influencePlayerMain__dropdownContentCol}>
          <span className={styles.influencePlayerMain__boldText}>
            - {buildingRepairText[language]}:
          </span>
          <span className={styles.influencePlayerMain__valueText}>−20%</span>
        </div>
      </TransitionProvider>
    </div>
  );
};

export default InfluencePlayerMain;
