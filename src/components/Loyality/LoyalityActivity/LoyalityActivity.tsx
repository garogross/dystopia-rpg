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
import { DotsLine } from "../../layout/icons/RPGGame/Common";
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

const weekData = [
  {
    days: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 2],
  },
  {
    days: [2, 2.1, 2.2, 2.3, 2.4, 2.5, 3],
  },
  {
    days: [3, 3.1, 3.2, 3.3, 3.4, 3.5, 4],
  },
  {
    days: [4, 4.1, 4.2, 4.3, 4.4, 4.5, 5],
  },
];

const {
  availableInText,
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

  console.log({ dailyRewardAvailable });

  return (
    <div className={styles.loyalityActivity}>
      <div className={styles.loyalityActivity__list}>
        {weekData.map((col, colIndex) => (
          <TransitionProvider
            key={colIndex}
            className={styles.loyalityActivity__listCol}
            style={TransitionStyleTypes.top}
            inProp={gameInited}
            delay={colIndex * 100}
          >
            {col.days.map((value, dayIndex) => (
              <button
                key={dayIndex}
                className={`${styles.loyalityActivity__listItem} ${
                  value === 1 ? styles.loyalityActivity__listItem_active : ""
                } ${
                  value === 1.1
                    ? styles.loyalityActivity__listItem_recieved
                    : ""
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
                  {value}CP
                </span>
                {value === 1.1 && (
                  <span className={styles.loyalityActivity__receivedText}>
                    {receivedText[language]}
                  </span>
                )}
              </button>
            ))}
          </TransitionProvider>
        ))}
      </div>
      <LoyalityCollectReward
        disabled={!dailyRewardAvailable || loading}
        onClick={onReward}
      />
      <div className={styles.loyalityActivity__availableIn}>
        <span className={styles.loyalityActivity__availableInText}>
          {availableInText[language]}
        </span>
        {!isFarm && <DotsLine />}
      </div>
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
