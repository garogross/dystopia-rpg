import React from "react";

import styles from "./OnBoardingSaveSelectBlock.module.scss";
import {
  OnBoardingSaveSelectBlockCheckboxIcon,
  OnBoardingSaveSelectBlockWing,
} from "../../layout/icons/OnBoarding";

interface Props {
  rememberSelect: boolean
  setRememberSelect: React.Dispatch<React.SetStateAction<boolean>>
}

const OnBoardingSaveSelectBlock:React.FC<Props> = ({rememberSelect,setRememberSelect}) => {
  return (
    <div className={styles.onBoardingSaveSelectBlock}>
      <div className={styles.onBoardingSaveSelectBlock__wing}>
        <OnBoardingSaveSelectBlockWing />
      </div>
      <div className={styles.onBoardingSaveSelectBlock__main}>
        <div className={styles.onBoardingSaveSelectBlock__inner}>
          <button
            className={styles.onBoardingSaveSelectBlock__checkbox}
            onClick={() => setRememberSelect(prev => !prev)}
          >
            <OnBoardingSaveSelectBlockCheckboxIcon checked={rememberSelect} />
            <h6 className={styles.onBoardingSaveSelectBlock__checkboxLabel}>
              Запомнить выбор
            </h6>
          </button>
          <p className={styles.onBoardingSaveSelectBlock__description}>
            В следующий раз ты сразу попадёшь туда, что выбрал. Не волнуйся — в
            любой момент можно изменить в настройках
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
