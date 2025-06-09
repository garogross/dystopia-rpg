import React, { useState } from "react";
import styles from "./LoyalityInfo.module.scss";
import WrapperWithFrame from "../../layout/WrapperWithFrame/WrapperWithFrame";
import { LoyalityArrowIcon } from "../../layout/icons/Loyality";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { EStats } from "../../../constants/EStats";
import { HeaderWings } from "../../layout/icons/RPGGame/Common";
import StatImg from "../../layout/StatImg/StatImg";
import { useAppSelector } from "../../../hooks/redux";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

interface Props {
  title: string;
  text: React.ReactNode;
  statText: string;
  total?: number;
}

const { totalText } = TRANSLATIONS.loyality.info;

const LoyalityInfo: React.FC<Props> = ({ title, text, statText, total }) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const language = useAppSelector((state) => state.ui.language);

  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      className={styles.loyalityInfo}
      style={TransitionStyleTypes.zoomIn}
      inProp={gameInited}
    >
      <WrapperWithFrame>
        <div className={styles.loyalityInfo__main}>
          <div className={styles.loyalityInfo__mainHeader}>
            <h4 className={styles.loyalityInfo__title}>{title}</h4>
            <button
              className={styles.loyalityInfo__headerBtn}
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              <LoyalityArrowIcon rotated={isDescriptionOpen} />
            </button>
          </div>
          <TransitionProvider
            inProp={isDescriptionOpen}
            style={TransitionStyleTypes.height}
            height={60}
            className={styles.loyalityInfo__textWrapper}
          >
            <p className={styles.loyalityInfo__text}>{text}</p>
          </TransitionProvider>
        </div>
      </WrapperWithFrame>

      <div className={styles.loyalityInfo__bottomBlock}>
        <div className={styles.loyalityInfo__bottomBlockWings}>
          <HeaderWings />
        </div>
        <div className={styles.loyalityInfo__bottomBlockValue}>
          {total && (
            <>
              <span className={styles.loyalityInfo__bottomBlockText}>
                {totalText[language]} : {total}
              </span>

              <StatImg stat={EStats.lp} />
            </>
          )}
        </div>
        {statText && (
          <span className={styles.loyalityInfo__bottomBlockText}>
            {statText}
          </span>
        )}
      </div>
    </TransitionProvider>
  );
};

export default LoyalityInfo;
