import React from "react";
import styles from "./ReferalsInfo.module.scss";
import WrapperWithFrame from "../../layout/WrapperWithFrame/WrapperWithFrame";
import { TransitionStyleTypes } from "../../../providers/TransitionProvider";
import TransitionProvider from "../../../providers/TransitionProvider";
import { useAppSelector } from "../../../hooks/redux";
import { ReferalsInfoBottomBg } from "../../layout/icons/Referals";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

const { infoTexts } = TRANSLATIONS.referals.info;

const ReferalsInfo = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);

  const infoData = infoTexts[language];
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.bottom}
      className={styles.referalsInfo}
    >
      <div className={styles.referalsInfo}>
        <WrapperWithFrame withoutBorder>
          <div className={styles.referalsInfo__main}>
            {infoData.map((item, index) => (
              <div className={styles.referalsInfo__item} key={index}>
                <div className={styles.referalsInfo__itemInner}>
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </WrapperWithFrame>
        <div className={styles.referalsInfo__bottom}>
          <ReferalsInfoBottomBg />
        </div>
      </div>
    </TransitionProvider>
  );
};

export default ReferalsInfo;
