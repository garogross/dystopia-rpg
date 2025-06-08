import React from "react";

import styles from "./OnBoardingSaveSelectBlock.module.scss";
import {
  OnBoardingSaveSelectBlockCheckboxIcon,
  OnBoardingSaveSelectBlockWing,
} from "../../layout/icons/OnBoarding";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";

interface Props {
  rememberSelect: boolean;
  setRememberSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

const { rememberChoiceLabel, descriptionText } =
  TRANSLATIONS.onBoarding.saveSelectBlock;

const OnBoardingSaveSelectBlock: React.FC<Props> = ({
  rememberSelect,
  setRememberSelect,
}) => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <div className={styles.onBoardingSaveSelectBlock}>
      <div className={styles.onBoardingSaveSelectBlock__wing}>
        <OnBoardingSaveSelectBlockWing />
      </div>
      <div className={styles.onBoardingSaveSelectBlock__main}>
        <div className={styles.onBoardingSaveSelectBlock__inner}>
          <button
            className={styles.onBoardingSaveSelectBlock__checkbox}
            onClick={() => setRememberSelect((prev) => !prev)}
          >
            <OnBoardingSaveSelectBlockCheckboxIcon checked={rememberSelect} />
            <h6 className={styles.onBoardingSaveSelectBlock__checkboxLabel}>
              {rememberChoiceLabel[language]}
            </h6>
          </button>
          <p className={styles.onBoardingSaveSelectBlock__description}>
            {descriptionText[language].map((text,index) => (<span key={index}>{text}</span>))}
          </p>
        </div>
      </div>
      <div className={styles.onBoardingSaveSelectBlock__wing}>
        <OnBoardingSaveSelectBlockWing rotated />
      </div>
    </div>
  );
};

export default OnBoardingSaveSelectBlock;
