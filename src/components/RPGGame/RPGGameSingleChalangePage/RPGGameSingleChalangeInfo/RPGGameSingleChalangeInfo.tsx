import React, { useState } from "react";

import styles from "./RPGGameSingleChalangeInfo.module.scss";
import {
  CyberRodentIcon,
  RoboshooterIcon,
  RPGGameSingleChalangeStartIcon,
} from "../../../layout/icons/RPGGame/RPGGameSingleChalangePage";
import { EStats } from "../../../../constants/EStats";
import { ArrowIcon } from "../../../layout/icons/Common";
import { DotsLine } from "../../../layout/icons/RPGGame/Common";
import StatImg from "../../../layout/StatImg/StatImg";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useNavigate } from "react-router-dom";
import { rpgGamePlayAreaPagePath } from "../../../../router/constants";

const compositions = [
  {
    name: "Кибер-Грызун X2",
    icon: <CyberRodentIcon />,
  },
  {
    name: "Робострелок X1",
    icon: <RoboshooterIcon />,
  },
];

const possibleRewards = [
  {
    name: "10–30 кредитов",
    stat: EStats.kredit,
  },
  {
    name: "Тёмная материя (шанс 2%)",
    stat: EStats.darkMatter,
  },
];

const accordions = [
  { name: "Состав противника", list: compositions },
  { name: "Возможные награды", list: possibleRewards },
];

const RPGGameSingleChalangeInfo = () => {
  const navigate = useNavigate();
  const [activeAccordionIndexes, setActiveAccordionIndexes] = useState<
    number[]
  >([]);
  return (
    <div className={styles.rpgGameSingleChalangeInfo}>
      <div className={styles.rpgGameSingleChalangeInfo__accordions}>
        {accordions.map((accordion, accordionIndex) => (
          <div
            key={accordionIndex}
            className={styles.rpgGameSingleChalangeInfo__accordionItem}
          >
            <button
              onClick={() => {
                setActiveAccordionIndexes((prev) =>
                  prev.includes(accordionIndex)
                    ? prev.filter((i) => i !== accordionIndex)
                    : [...prev, accordionIndex]
                );
              }}
              className={styles.rpgGameSingleChalangeInfo__accordionBtn}
            >
              <div className={styles.rpgGameSingleChalangeInfo__dotLines}>
                <DotsLine />
              </div>
              <div
                className={styles.rpgGameSingleChalangeInfo__accordionBtnMain}
              >
                <span>{accordion.name}</span>
                <ArrowIcon
                  rotate={activeAccordionIndexes.includes(accordionIndex)}
                />
              </div>
              <div className={styles.rpgGameSingleChalangeInfo__dotLines}>
                <DotsLine />
              </div>
            </button>
            <TransitionProvider
              className={styles.rpgGameSingleChalangeInfo__accordiondropdown}
              style={TransitionStyleTypes.height}
              height={60}
              inProp={activeAccordionIndexes.includes(accordionIndex)}
            >
              {accordion.list.map((item, index) => (
                <div
                  key={index}
                  className={styles.rpgGameSingleChalangeInfo__dropdownListItem}
                >
                  <div
                    className={
                      styles.rpgGameSingleChalangeInfo__dropdownListItemImgWrapper
                    }
                  >
                    {"icon" in item ? item.icon : <StatImg stat={item.stat} />}
                  </div>
                  <span
                    className={
                      styles.rpgGameSingleChalangeInfo__dropdownListItemText
                    }
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </TransitionProvider>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate(rpgGamePlayAreaPagePath)}
        className={styles.rpgGameSingleChalangeInfo__startBtn}
      >
        <div className={styles.rpgGameSingleChalangeInfo__startBtnInner}>
          <RPGGameSingleChalangeStartIcon />
          <span>Начать бой</span>
        </div>
      </button>
    </div>
  );
};

export default RPGGameSingleChalangeInfo;
