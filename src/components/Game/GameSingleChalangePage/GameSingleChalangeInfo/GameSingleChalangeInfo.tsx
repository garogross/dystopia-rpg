import React, { useState } from "react";

import styles from "./GameSingleChalangeInfo.module.scss";
import CyberRodentIcon from "../../../layout/icons/game/GameSingleChalangePage/CyberRodentIcon";
import RoboshooterIcon from "../../../layout/icons/game/GameSingleChalangePage/RoboshooterIcon";
import { EStats } from "../../../../constants/EStats";
import { DotsLine } from "../../../layout/icons/game/Common/DotsLine";
import ArrowIcon from "../../../layout/icons/game/Common/ArrowIcon";
import StatImg from "../../../layout/StatImg/StatImg";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import GameSingleChalangeStartIcon from "../../../layout/icons/game/GameSingleChalangePage/GameSingleChalangeStartIcon";
import { useNavigate } from "react-router-dom";
import { gamePlayAreaPagePath } from "../../../../router/constants";

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

const GameSingleChalangeInfo = () => {
  const navigate = useNavigate();
  const [activeAccordionIndexes, setActiveAccordionIndexes] = useState<
    number[]
  >([]);
  return (
    <div className={styles.gameSingleChalangeInfo}>
      <div className={styles.gameSingleChalangeInfo__accordions}>
        {accordions.map((accordion, accordionIndex) => (
          <div
            key={accordionIndex}
            className={styles.gameSingleChalangeInfo__accordionItem}
          >
            <button
              onClick={() => {
                setActiveAccordionIndexes((prev) =>
                  prev.includes(accordionIndex)
                    ? prev.filter((i) => i !== accordionIndex)
                    : [...prev, accordionIndex]
                );
              }}
              className={styles.gameSingleChalangeInfo__accordionBtn}
            >
              <div className={styles.gameSingleChalangeInfo__dotLines}>
                <DotsLine />
              </div>
              <div className={styles.gameSingleChalangeInfo__accordionBtnMain}>
                <span>{accordion.name}</span>
                <ArrowIcon
                  rotate={activeAccordionIndexes.includes(accordionIndex)}
                />
              </div>
              <div className={styles.gameSingleChalangeInfo__dotLines}>
                <DotsLine />
              </div>
            </button>
            <TransitionProvider
              className={styles.gameSingleChalangeInfo__accordiondropdown}
              style={TransitionStyleTypes.height}
              height={60}
              inProp={activeAccordionIndexes.includes(accordionIndex)}
            >
              {accordion.list.map((item, index) => (
                <div
                  key={index}
                  className={styles.gameSingleChalangeInfo__dropdownListItem}
                >
                  <div
                    className={
                      styles.gameSingleChalangeInfo__dropdownListItemImgWrapper
                    }
                  >
                    {"icon" in item ? item.icon : <StatImg stat={item.stat} />}
                  </div>
                  <span
                    className={
                      styles.gameSingleChalangeInfo__dropdownListItemText
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
        onClick={() => navigate(gamePlayAreaPagePath)}
        className={styles.gameSingleChalangeInfo__startBtn}
      >
        <div className={styles.gameSingleChalangeInfo__startBtnInner}>
          <GameSingleChalangeStartIcon />
          <span>Начать бой</span>
        </div>
      </button>
    </div>
  );
};

export default GameSingleChalangeInfo;
