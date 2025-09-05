import React from "react";

import styles from "./BubbleFrontLevelDifficultyModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";

import { EBubbleFrontLevels } from "../../../constants/bubbleFront/EBubbleFrontLevels";
import {
  CalibrationLevelIcon,
  CombatModelIcon,
  OverloadLevelIcon,
} from "../../layout/icons/BubbleFront/BubbleFrontLevelDifficultyModal";
import { BUBBLE_FRONT_LEVELS_SETTINGS } from "../../../constants/bubbleFront/BubbleFrontLevelsSettings";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setDifficultyLevel } from "../../../store/slices/bubbleFront/bubbleFrontSlice";

interface Props {
  show: boolean;
  onClose: () => void;
}

const levels = [
  {
    key: EBubbleFrontLevels.Calibration,
    icon: <CalibrationLevelIcon />,
    name: "Калибровка",
  },
  {
    key: EBubbleFrontLevels.CombatMode,
    icon: <CombatModelIcon />,
    name: "Боевой режим",
  },
  {
    key: EBubbleFrontLevels.Overload,
    icon: <OverloadLevelIcon />,
    name: "Перегрузка",
  },
];

const BubbleFrontLevelDifficultyModal: React.FC<Props> = ({
  show,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const curDifficultylevel = useAppSelector(
    (state) => state.bubbleFront.global.curDifficultylevel
  );
  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title="выберите уровень сложноси"
      hideAd
      titleClass={styles.bubbleFrontLevelDifficultyModal__title}
    >
      <div className={styles.bubbleFrontLevelDifficultyModal}>
        <p className={styles.bubbleFrontLevelDifficultyModal__text}>
          Сложность — это стиль. Выбери свой.
        </p>
        <div className={styles.bubbleFrontLevelDifficultyModal__optionsList}>
          {levels.map((option) => (
            <button
              key={option.key}
              onClick={() => dispatch(setDifficultyLevel(option.key))}
              className={styles.bubbleFrontLevelDifficultyModal__option}
            >
              {option.icon}
              <div
                className={styles.bubbleFrontLevelDifficultyModal__optionMain}
              >
                <div
                  className={
                    styles.bubbleFrontLevelDifficultyModal__optionHeader
                  }
                >
                  <h5
                    className={
                      styles.bubbleFrontLevelDifficultyModal__optionNameText
                    }
                  >
                    {option.name}
                  </h5>
                  {option.key === curDifficultylevel && (
                    <span
                      className={
                        styles.bubbleFrontLevelDifficultyModal__selectedMark
                      }
                    >
                      <span
                        className={
                          styles.bubbleFrontLevelDifficultyModal__selectedMarkInner
                        }
                      >
                        Выбран
                      </span>
                    </span>
                  )}
                </div>
                <p
                  className={
                    styles.bubbleFrontLevelDifficultyModal__optionDescription
                  }
                >
                  {BUBBLE_FRONT_LEVELS_SETTINGS[option.key]} неудачных выстрелов
                  — новый ряд.
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </ModalWithAdd>
  );
};

export default BubbleFrontLevelDifficultyModal;
