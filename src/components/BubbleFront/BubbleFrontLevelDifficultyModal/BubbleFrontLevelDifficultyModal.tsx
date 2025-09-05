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
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

interface Props {
  show: boolean;
  onClose: () => void;
}

const {
  titleText,
  descriptionText,
  levelsTexts,
  selectedMarkText,
  rowDescriptionText,
} = TRANSLATIONS.bubbleFront.difficultyModal;

const levels = [
  {
    key: EBubbleFrontLevels.Calibration,
    icon: <CalibrationLevelIcon />,
    name: levelsTexts.calibration,
  },
  {
    key: EBubbleFrontLevels.CombatMode,
    icon: <CombatModelIcon />,
    name: levelsTexts.combatMode,
  },
  {
    key: EBubbleFrontLevels.Overload,
    icon: <OverloadLevelIcon />,
    name: levelsTexts.overload,
  },
];

const BubbleFrontLevelDifficultyModal: React.FC<Props> = ({
  show,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  const curDifficultylevel = useAppSelector(
    (state) => state.bubbleFront.global.curDifficultylevel
  );
  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title={titleText[language]}
      hideAd
      titleClass={styles.bubbleFrontLevelDifficultyModal__title}
    >
      <div className={styles.bubbleFrontLevelDifficultyModal}>
        <p className={styles.bubbleFrontLevelDifficultyModal__text}>
          {descriptionText[language]}
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
                    {option.name[language]}
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
                        {selectedMarkText[language]}
                      </span>
                    </span>
                  )}
                </div>
                <p
                  className={
                    styles.bubbleFrontLevelDifficultyModal__optionDescription
                  }
                >
                  {BUBBLE_FRONT_LEVELS_SETTINGS[option.key]}{" "}
                  {rowDescriptionText[language]}
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
