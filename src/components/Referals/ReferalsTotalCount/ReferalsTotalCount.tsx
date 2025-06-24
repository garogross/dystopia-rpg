import React, { useState } from "react";
import styles from "./ReferalsTotalCount.module.scss";
import WrapperWithFrame from "../../layout/WrapperWithFrame/WrapperWithFrame";
import { DotsLine } from "../../layout/icons/RPGGame/Common/DotsLine";
import ReferalsHistory from "../ReferalsHistory/ReferalsHistory";
import TransitionProvider from "../../../providers/TransitionProvider";
import { TransitionStyleTypes } from "../../../providers/TransitionProvider";
import { useAppSelector } from "../../../hooks/redux";
import { ReferalsTotalCountBottomBlock } from "../../layout/icons/Referals";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

const { titleText } = TRANSLATIONS.referals.totalCount;

interface Props {
  totalCount: number;
}

const ReferalsTotalCount: React.FC<Props> = ({ totalCount }) => {
  const language = useAppSelector((state) => state.ui.language);

  const [historyOpened, setHistoryOpened] = useState(false);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider inProp={gameInited} style={TransitionStyleTypes.zoomIn}>
      <button
        disabled={!totalCount}
        onClick={() => setHistoryOpened(true)}
        className={styles.referalsTotalCount}
      >
        <WrapperWithFrame>
          <div className={styles.referalsTotalCount__inner}>
            <h6 className={styles.referalsTotalCount__title}>
              {titleText[language]}
            </h6>
            <div className={styles.referalsTotalCount__dotsLine}>
              <DotsLine />
            </div>
            <span className={styles.referalsTotalCount__countText}>
              {totalCount}
            </span>
          </div>
        </WrapperWithFrame>
        <div className={styles.referalsTotalCount__bottomBlock}>
          <ReferalsTotalCountBottomBlock />
        </div>
      </button>
      <ReferalsHistory
        show={historyOpened}
        onClose={() => setHistoryOpened(false)}
      />
    </TransitionProvider>
  );
};

export default ReferalsTotalCount;
