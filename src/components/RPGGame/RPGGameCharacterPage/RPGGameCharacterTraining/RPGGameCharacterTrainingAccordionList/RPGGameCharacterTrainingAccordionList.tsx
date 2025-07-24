import React, { useState } from "react";
import styles from "./RPGGameCharacterTrainingAccordionList.module.scss";
import { ArrowIcon } from "../../../../layout/icons/Common";
import { PlusIcon } from "../../../../layout/icons/RPGGame/Common";
import {
  RPGGameCharacterTrainingUpgradeIcon,
  RPGGameCharacterTrainingDotline,
} from "../../../../layout/icons/RPGGame/RPGGameCharacterPage/RPGGameCharacterTraining/development";
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

export const RPGGameCharacterTrainingAccordionList: React.FC<Props> = ({
  data,
}) => {
  const accaunt = 150;
  const [openSections, setOpenSections] = useState<string[]>(
    data.map((item) => item.name)
  );
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const toggleSection = (sectionName: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((name) => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  return (
    <div className={styles.rpgGameCharacterTrainingAccordionList}>
      {data.map((item, index) => (
        <div
          className={styles.rpgGameCharacterTrainingAccordionList__item}
          key={item.name}
        >
          <div
            className={styles.rpgGameCharacterTrainingAccordionList__itemHeader}
            onClick={() => toggleSection(item.name)}
          >
            <TransitionProvider
              inProp={gameInited}
              style={TransitionStyleTypes.bottom}
              delay={index * 100}
              className={
                styles.rpgGameCharacterTrainingAccordionList__itemHeaderTitleBlock
              }
            >
              <h6
                className={
                  styles.rpgGameCharacterTrainingAccordionList__itemHeaderTitleText
                }
              >
                {item.name}
              </h6>
              <div>
                <ArrowIcon rotate={openSections.includes(item.name)} />
              </div>
            </TransitionProvider>
            {!item.unavailableUpgrades && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                disabled={item.price >= accaunt}
                className={
                  styles.rpgGameCharacterTrainingAccordionList__itemHeaderPayBtn
                }
              >
                {item.price < accaunt
                  ? `Улучшить за: ${item.price}`
                  : `Неоходимо: ${item.price}`}
              </button>
            )}
          </div>
          <TransitionProvider
            className={
              styles.rpgGameCharacterTrainingAccordionList__dropdownList
            }
            inProp={openSections.includes(item.name)}
            height={25 * item.items.length + 10 * (item.items.length - 1)}
            style={TransitionStyleTypes.height}
          >
            {item.items.map((item) => (
              <div
                className={
                  styles.rpgGameCharacterTrainingAccordionList__dropdownItem
                }
                key={item.name}
              >
                <span
                  className={
                    styles.rpgGameCharacterTrainingAccordionList__dropdownItemNameText
                  }
                >
                  {item.name}
                </span>
                {item.condition && (
                  <span
                    className={
                      styles.rpgGameCharacterTrainingAccordionList__dropdownItemConditionText
                    }
                  >
                    {item.condition}
                  </span>
                )}
                <div
                  className={
                    styles.rpgGameCharacterTrainingAccordionList__dropdownItemLevel
                  }
                >
                  {item.level && (
                    <button
                      className={
                        styles.rpgGameCharacterTrainingAccordionList__dropdownItemLevelAddBtn
                      }
                    >
                      <PlusIcon />
                    </button>
                  )}
                  <span
                    className={
                      styles.rpgGameCharacterTrainingAccordionList__dropdownItemLevelText
                    }
                  >
                    {item.level}
                  </span>
                  <RPGGameCharacterTrainingUpgradeIcon />
                </div>
                <div
                  className={
                    styles.rpgGameCharacterTrainingAccordionList__dropdownItemLine
                  }
                >
                  <RPGGameCharacterTrainingDotline />
                </div>
              </div>
            ))}
          </TransitionProvider>
        </div>
      ))}
    </div>
  );
};

export default RPGGameCharacterTrainingAccordionList;
