import React, { FC, useState } from "react";
import styles from "./ReferalsTotalEarnings.module.scss";
import { HeaderWings } from "../../layout/icons/RPGGame/Common/HeaderWings";
import WrapperWithFrame from "../../layout/WrapperWithFrame/WrapperWithFrame";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { EStats } from "../../../constants/EStats";
import StatImg from "../../layout/StatImg/StatImg";
import { ReferalsCollectIcon } from "../../layout/icons/Referals";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { formatNumber } from "../../../utils/formatNumber";
import { useTooltip } from "../../../hooks/useTooltip";
import { convertReferals } from "../../../store/slices/refferencesSlice";
import Tooltip from "../../layout/Tooltip/Tooltip";

const {
  availableToCollectText,
  collectButtonText,
  collectingButtonText,
  rewardCollectedSuccessfullyText,
  failedToCollectRewardText,
} = TRANSLATIONS.referals.totalEarnings;

const ReferalsTotalEarnings: FC = () => {
  const dispatch = useAppDispatch();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const refCashPoint = useAppSelector(
    (state) => state.refferences.refCashPoint
  );
  const [loading, setLoading] = useState(false);
  const { show, openTooltip } = useTooltip();
  const [tooltipText, setTooltipText] = useState(
    rewardCollectedSuccessfullyText
  );

  const onCollect = async () => {
    try {
      setLoading(true);

      await dispatch(convertReferals()).unwrap();
      setTooltipText(rewardCollectedSuccessfullyText);
    } catch (error) {
      setTooltipText(failedToCollectRewardText);
    } finally {
      setLoading(false);
      openTooltip();
    }
  };

  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.top}
      className={styles.referalsTotalEarnings}
    >
      <WrapperWithFrame className={styles.referalsTotalEarnings__main}>
        <div className={styles.referalsTotalEarnings__inner}>
          <div className={styles.referalsTotalEarnings__texts}>
            <h5 className={styles.referalsTotalEarnings__title}>
              {availableToCollectText[language]}
            </h5>
            <div className={styles.referalsTotalEarnings__values}>
              <div className={styles.referalsTotalEarnings__value}>
                <StatImg stat={EStats.cp} size={19} />
                <span className={styles.referalsTotalEarnings__valueText}>
                  {formatNumber(refCashPoint)}
                </span>
              </div>
            </div>
          </div>
          <button
            disabled={!refCashPoint || loading}
            onClick={onCollect}
            className={styles.referalsTotalEarnings__collectBtn}
          >
            <div className={styles.referalsTotalEarnings__collectBtnInner}>
              <ReferalsCollectIcon />
              <span>
                {(loading ? collectingButtonText : collectButtonText)[language]}
              </span>
            </div>
          </button>
        </div>
      </WrapperWithFrame>
      <div className={styles.referalsTotalEarnings__wings}>
        <HeaderWings reversed />
      </div>
      <Tooltip show={show} text={tooltipText[language]} />
    </TransitionProvider>
  );
};

export default ReferalsTotalEarnings;
