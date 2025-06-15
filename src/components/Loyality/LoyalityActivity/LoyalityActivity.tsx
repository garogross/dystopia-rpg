import React, { useState } from "react";
import styles from "./LoyalityActivity.module.scss";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  cpImage,
  cpImageWebp,
  luteboxForAdImage,
  luteboxForAdImageWebp,
  luteboxForLpImage,
  luteboxForLpImageWebp,
} from "../../../assets/imageMaps";
import LoyalityCollectReward from "../LoyalityCollectReward/LoyalityCollectReward";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { claimDailyReward } from "../../../store/slices/cyberFarm/activitySlice";
import { useTooltip } from "../../../hooks/useTooltip";
import Tooltip from "../../layout/Tooltip/Tooltip";

interface Props {
  isFarm?: boolean;
}

const {
  receivedText,
  lootboxForAdText,
  lootboxForLPText,
  dailyRewardReceivedText,
} = TRANSLATIONS.loyality.activity;
const { somethingWentWrong } = TRANSLATIONS.errors;

const LoyalityActivity: React.FC<Props> = ({ isFarm }) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const dailyRewardAvailable = useAppSelector(
    (state) => state.cyberfarm.activity.dailyRewardAvailable
  );
  const dailyRewardAvailableDay = useAppSelector(
    (state) => state.cyberfarm.activity.dailyRewardAvailableDay
  );
  const rewardsByDay = useAppSelector(
    (state) => state.cyberfarm.activity.rewardsByDay
  );
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [loading, setLoading] = useState(false);
  const [tooltipText, setTooltipText] = useState(dailyRewardReceivedText);
  const { show, openTooltip } = useTooltip();

  const onReward = async () => {
    try {
      await dispatch(claimDailyReward()).unwrap();
      setTooltipText(dailyRewardReceivedText);
      openTooltip();
    } catch (error) {
      openTooltip();
      setTooltipText(somethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loyalityActivity}>
      <TransitionProvider
        style={TransitionStyleTypes.bottom}
        inProp={gameInited}
        className={styles.loyalityActivity__list}
      >
        {Array.from({ length: 28 }).map((_, dayIndex) => {
          const isReceived = dailyRewardAvailable
            ? dayIndex < dailyRewardAvailableDay
            : dayIndex <= dailyRewardAvailableDay;
          const isAvailable =
            dayIndex === dailyRewardAvailableDay && dailyRewardAvailable;
          return (
            <button
              key={dayIndex}
              className={`${styles.loyalityActivity__listItem} ${
                isAvailable ? styles.loyalityActivity__listItem_active : ""
              } ${
                isReceived ? styles.loyalityActivity__listItem_recieved : ""
              }`}
            >
              <ImageWebp
                src={cpImage}
                srcSet={cpImageWebp}
                alt="loyalty"
                className={styles.loyalityActivity__itemImg}
                pictureClass={styles.loyalityActivity__itemPicture}
              />
              <span className={styles.loyalityActivity__itemText}>
                {rewardsByDay[dayIndex] ? `${rewardsByDay[dayIndex]}CP` : ""}
              </span>
              {isReceived && (
                <span className={styles.loyalityActivity__receivedText}>
                  {receivedText[language]}
                </span>
              )}
            </button>
          );
        })}
      </TransitionProvider>
      <LoyalityCollectReward
        disabled={!dailyRewardAvailable || loading}
        onClick={onReward}
      />

      {isFarm && (
        <div className={styles.loyalityActivity__lutBoxes}>
          <button className={styles.loyalityActivity__luteBoxBtn}>
            <div className={styles.loyalityActivity__luteBoxInner}>
              <ImageWebp
                src={luteboxForAdImage}
                srcSet={luteboxForAdImageWebp}
                alt="lutebox"
                className={styles.loyalityActivity__luteBoxImg}
                pictureClass={styles.loyalityActivity__luteBoxPicture}
              />
              <span className={styles.loyalityActivity__luteBoxBtnText}>
                {lootboxForAdText[language]}
              </span>
            </div>
          </button>
          <button className={styles.loyalityActivity__luteBoxBtn}>
            <div className={styles.loyalityActivity__luteBoxInner}>
              <ImageWebp
                src={luteboxForLpImage}
                srcSet={luteboxForLpImageWebp}
                alt="lutebox"
                className={styles.loyalityActivity__luteBoxImg}
                pictureClass={styles.loyalityActivity__luteBoxPicture}
              />
              <span className={styles.loyalityActivity__luteBoxBtnText}>
                {lootboxForLPText[language]}
              </span>
            </div>
          </button>
        </div>
      )}
      <Tooltip show={show} text={tooltipText[language]} />
    </div>
  );
};

export default LoyalityActivity;
