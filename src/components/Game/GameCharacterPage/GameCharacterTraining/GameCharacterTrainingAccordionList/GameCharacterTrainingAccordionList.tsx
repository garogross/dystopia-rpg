import React, { useState } from "react";
import styles from "./GameCharacterTrainingAccordionList.module.scss";
import { PlusIcon } from "../../../../layout/icons/game/Common/PlusIcon";
import GameCharacterTrainingUpgradeIcon from "../../../../layout/icons/game/GameCharacterPage/GameCharacterTraining/development/GameCharacterTrainingUpgradeIcon";
import ArrowIcon from "../../../../layout/icons/game/Common/ArrowIcon";
import GameCharacterTrainingDotline from "../../../../layout/icons/game/GameCharacterPage/GameCharacterTraining/development/GameCharacterTrainingDotline";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../../hooks/redux";

interface Props {
  // Add props as needed
  data: TrainingCategory[];
}

interface TrainingItem {
  name: string;
  level?: number;
  condition?: string;
}

export interface TrainingCategory {
  name: string;
  price: number;
  unavailableUpgrades?: boolean;
  items: TrainingItem[];
}



export const GameCharacterTrainingAccordionList: React.FC<
  Props
> = ({ data }) => {
  const accaunt = 150;
  const [openSections, setOpenSections] = useState<string[]>(data.map(item => item.name));
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const toggleSection = (sectionName: string) => {
    setOpenSections(prev => 
      prev.includes(sectionName)
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  return (
    <div className={styles.gameCharacterTrainingAccordionList}>
      {data.map((item, index) => (
        <div
          className={styles.gameCharacterTrainingAccordionList__item}
          key={item.name}
        >
          <div 
            className={styles.gameCharacterTrainingAccordionList__itemHeader}
            onClick={() => toggleSection(item.name)}
          >
            <TransitionProvider
              inProp={gameInited}
              style={TransitionStyleTypes.bottom}
              delay={index * 100}
              className={
                styles.gameCharacterTrainingAccordionList__itemHeaderTitleBlock
              }
            >
              <h6
                className={
                  styles.gameCharacterTrainingAccordionList__itemHeaderTitleText
                }
              >
                {item.name}
              </h6>
              <div >
                <ArrowIcon rotate={openSections.includes(item.name)} />
              </div>
            </TransitionProvider>
            <button
              disabled={item.price >= accaunt}
              className={
                styles.gameCharacterTrainingAccordionList__itemHeaderPayBtn
              }
            >
              {item.price < accaunt
                ? `Улучшить за: ${item.price}`
                : `Неоходимо: ${item.price}`}
            </button>
          </div>
          <TransitionProvider
            className={styles.gameCharacterTrainingAccordionList__dropdownList}
            inProp={openSections.includes(item.name)}
            height={25 * item.items.length + 10 * (item.items.length - 1)}
            style={TransitionStyleTypes.height}
          >
            {item.items.map((item) => (
              <div
                className={
                  styles.gameCharacterTrainingAccordionList__dropdownItem
                }
                key={item.name}
              >
                <span
                  className={
                    styles.gameCharacterTrainingAccordionList__dropdownItemNameText
                  }
                >
                  {item.name}
                </span>
                {item.condition && (
                  <span
                    className={
                      styles.gameCharacterTrainingAccordionList__dropdownItemConditionText
                    }
                  >
                    {item.condition}
                  </span>
                )}
                <div
                  className={
                    styles.gameCharacterTrainingAccordionList__dropdownItemLevel
                  }
                >
                  {item.level && (
                    <button
                      className={
                        styles.gameCharacterTrainingAccordionList__dropdownItemLevelAddBtn
                      }
                    >
                      <PlusIcon />
                    </button>
                  )}
                  <span
                    className={
                      styles.gameCharacterTrainingAccordionList__dropdownItemLevelText
                    }
                  >
                    {item.level}
                  </span>
                  <GameCharacterTrainingUpgradeIcon />
                </div>
                <div
                  className={
                    styles.gameCharacterTrainingAccordionList__dropdownItemLine
                  }
                >
                  <GameCharacterTrainingDotline />
                </div>
              </div>
            ))}
          </TransitionProvider>
        </div>
      ))}
    </div>
  );
};

export default GameCharacterTrainingAccordionList;
