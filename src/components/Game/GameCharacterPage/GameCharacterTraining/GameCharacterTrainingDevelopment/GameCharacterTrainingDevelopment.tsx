import React, { useState } from "react";
import styles from "./GameCharacterTrainingDevelopment.module.scss";
import { PlusIcon } from "../../../../layout/icons/game/Common/PlusIcon";
import GameCharacterTrainingUpgradeIcon from "../../../../layout/icons/game/GameCharacterPage/GameCharacterTraining/development/GameCharacterTrainingUpgradeIcon";
import ArrowIcon from "../../../../layout/icons/game/Common/ArrowIcon";
import GameCharacterTrainingDotline from "../../../../layout/icons/game/GameCharacterPage/GameCharacterTraining/development/ameCharacterTrainingDotline";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../../hooks/redux";

interface GameCharacterTrainingDevelopmentProps {
  // Add props as needed
}

interface TrainingItem {
  name: string;
  level?: number;
  condition?: string;
}

interface TrainingCategory {
  name: string;
  price: number;
  unavailableUpgrades?: boolean;
  items: TrainingItem[];
}

const data: TrainingCategory[] = [
  {
    name: "Характеристики",
    price: 100,
    items: [
      {
        name: "Сила",
        level: 5,
      },
      {
        name: "Ловкость",
        level: 4,
      },
      {
        name: "Меткость",
        level: 3,
      },
      {
        name: "Выносливость",
        level: 2,
      },
      {
        name: "Инициатива",
        level: 1,
      },
    ],
  },
  {
    name: "Параметры",
    price: 333,
    items: [
      {
        name: "Здоровье",
        level: 5,
      },
      {
        name: "Урон",
        level: 4,
      },
      {
        name: "Уворот",
        level: 3,
      },
      {
        name: "Контрудар",
        level: 2,
      },
    ],
  },
  {
    name: "Приёмы",
    price: 100,
    unavailableUpgrades: true,
    items: [
      {
        name: "Приём А",
        condition: "Использований 10/20",
      },
      {
        name: "Приём Б",
        condition: "Использований 10/20",
      },
    ],
  },
  {
    name: "Навыки",
    price: 100,
    unavailableUpgrades: true,
    items: [
      {
        name: "Ближний бой",
        condition: "Очки навыков 10/20",
      },
      {
        name: "Тяжелая броня",
        condition: "Очки навыков 10/20",
      },
    ],
  },
];

export const GameCharacterTrainingDevelopment: React.FC<
  GameCharacterTrainingDevelopmentProps
> = () => {
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
    <div className={styles.gameCharacterTrainingDevelopment}>
      {data.map((item, index) => (
        <div
          className={styles.gameCharacterTrainingDevelopment__item}
          key={item.name}
        >
          <div 
            className={styles.gameCharacterTrainingDevelopment__itemHeader}
            onClick={() => toggleSection(item.name)}
          >
            <TransitionProvider
              inProp={gameInited}
              style={TransitionStyleTypes.bottom}
              delay={index * 100}
              className={
                styles.gameCharacterTrainingDevelopment__itemHeaderTitleBlock
              }
            >
              <h6
                className={
                  styles.gameCharacterTrainingDevelopment__itemHeaderTitleText
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
                styles.gameCharacterTrainingDevelopment__itemHeaderPayBtn
              }
            >
              {item.price < accaunt
                ? `Улучшить за: ${item.price}`
                : `Неоходимо: ${item.price}`}
            </button>
          </div>
          <TransitionProvider
            className={styles.gameCharacterTrainingDevelopment__dropdownList}
            inProp={openSections.includes(item.name)}
            height={25 * item.items.length + 10 * (item.items.length - 1)}
            style={TransitionStyleTypes.height}
          >
            {item.items.map((item) => (
              <div
                className={
                  styles.gameCharacterTrainingDevelopment__dropdownItem
                }
                key={item.name}
              >
                <span
                  className={
                    styles.gameCharacterTrainingDevelopment__dropdownItemNameText
                  }
                >
                  {item.name}
                </span>
                {item.condition && (
                  <span
                    className={
                      styles.gameCharacterTrainingDevelopment__dropdownItemConditionText
                    }
                  >
                    {item.condition}
                  </span>
                )}
                <div
                  className={
                    styles.gameCharacterTrainingDevelopment__dropdownItemLevel
                  }
                >
                  {item.level && (
                    <button
                      className={
                        styles.gameCharacterTrainingDevelopment__dropdownItemLevelAddBtn
                      }
                    >
                      <PlusIcon />
                    </button>
                  )}
                  <span
                    className={
                      styles.gameCharacterTrainingDevelopment__dropdownItemLevelText
                    }
                  >
                    {item.level}
                  </span>
                  <GameCharacterTrainingUpgradeIcon />
                </div>
                <div
                  className={
                    styles.gameCharacterTrainingDevelopment__dropdownItemLine
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

export default GameCharacterTrainingDevelopment;
