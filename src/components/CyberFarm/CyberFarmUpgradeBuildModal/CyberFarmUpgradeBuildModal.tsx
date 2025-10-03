import React, { useEffect, useState } from "react";

import styles from "./CyberFarmUpgradeBuildModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { buySlot } from "../../../store/slices/cyberFarm/slotsSlice";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { useTooltip } from "../../../hooks/useTooltip";
import Tooltip from "../../layout/Tooltip/Tooltip";

import { ECyberfarmTutorialActions } from "../../../constants/cyberfarm/tutorial";
import MainBtn from "../../layout/MainBtn/MainBtn";
import {
  cpImage,
  cpImageWebp,
  evoFactoryImage,
  evoFactoryWebpImage,
  evoFarmImage,
  evoFarmWebpImage,
} from "../../../assets/imageMaps";
import { ELanguages } from "../../../constants/ELanguages";
import { UpgradeIcon } from "../../layout/icons/CyberFarm/CyberFarmUpgradeBuildModal";
import { getProductionEstimate } from "../../../store/slices/cyberFarm/resourcesSlice";

interface Props {
  show: boolean;
  onClose: () => void;
  type: EFarmSlotTypes;
  slotId: string;
  evoMode?: boolean;
  level: number | undefined;
}

const {
  titleText,
  farmText,
  factoryText,
  levelText,
  currentStatsText,
  productionOutputText,
  perHourText,
  nextLevelText,
  canUpgradeForText,
  upgradeButtonText,
  successText,
  notEnoughCPText,
} = TRANSLATIONS.cyberFarm.upgradeModal;

interface LevelStatsProps {
  language: ELanguages;
  output: number;
}

const LevelStats: React.FC<LevelStatsProps> = ({ language, output }) => {
  return (
    <div className={styles.cyberFarmUpgradeBuildModal__infoTable}>
      <div className={styles.cyberFarmUpgradeBuildModal__infoTableCol}>
        <div className={styles.cyberFarmUpgradeBuildModal__infoTableRow}>
          <span className={styles.cyberFarmUpgradeBuildModal__infoText}>
            {productionOutputText[language]}
          </span>
          <div
            className={`${styles.cyberFarmUpgradeBuildModal__titleLine} ${styles.cyberFarmUpgradeBuildModal__titleLine_dashed}`}
          />

          <span className={styles.cyberFarmUpgradeBuildModal__infoText}>
            +{output} {perHourText[language]}
          </span>
        </div>
      </div>
    </div>
  );
};

const CyberFarmUpgradeBuildModal: React.FC<Props> = ({
  show,
  onClose,
  type,
  slotId,
  evoMode,
  level = 1,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const cp = useAppSelector((state) => state.profile.stats.cp);

  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { show: showTooltip, openTooltip } = useTooltip();

  const upgradeLevels = useAppSelector(
    (state) => state.cyberfarm.slots.upgradeLevels
  );
  const nextLevelData = upgradeLevels?.[(+level + 1)?.toString()];
  console.log({ upgradeLevels });

  const upgradeCost =
    nextLevelData?.[
      type === EFarmSlotTypes.FACTORY
        ? "upgrade_cost_factory"
        : "upgrade_cost_farm"
    ];
  useEffect(() => {
    dispatch(getProductionEstimate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!show) {
      setErrorText("");
      setErrored(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const onUpgrade = async () => {
    try {
      if (!nextLevelData || !upgradeCost) return;
      if (upgradeCost > cp) {
        setErrorText(notEnoughCPText[language]);
        throw new Error();
      }
      setLoading(true);
      setErrored(false);

      await dispatch(
        buySlot({
          id: slotId,
          type,
          isUpgrade: true,
          cost: { cash_point: upgradeCost || 0 },
        })
      ).unwrap();
      await openTooltip();
      onClose();
    } catch (error: any) {
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };

  const slotTypeImg =
    type === EFarmSlotTypes.FACTORY
      ? {
          src: evoFactoryImage,
          srcSet: evoFactoryWebpImage,
        }
      : {
          src: evoFarmImage,
          srcSet: evoFarmWebpImage,
        };

  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title={titleText[language]}
      loading={loading}
      errored={errored}
      errorText={errorText}
      evoMode={evoMode}
    >
      <div className={styles.cyberFarmUpgradeBuildModal}>
        <div className={styles.cyberFarmUpgradeBuildModal__infoHeader}>
          <ImageWebp
            {...slotTypeImg}
            alt={farmText[language]}
            className={styles.cyberFarmUpgradeBuildModal__resourceImg}
          />
          <h4 className={styles.cyberFarmUpgradeBuildModal__infoTitle}>
            {
              (type === EFarmSlotTypes.FACTORY ? factoryText : farmText)[
                language
              ]
            }
          </h4>
        </div>
        <div className={styles.cyberFarmUpgradeBuildModal__titleBlock}>
          <div className={styles.cyberFarmUpgradeBuildModal__titleLine} />

          <span className={styles.cyberFarmUpgradeBuildModal__infoText}>
            {levelText[language]} {level}
          </span>
          <div className={styles.cyberFarmUpgradeBuildModal__titleLine} />
        </div>
        <div className={styles.cyberFarmUpgradeBuildModal__titleBlock}>
          <div className={styles.cyberFarmUpgradeBuildModal__titleLine} />

          <span className={styles.cyberFarmUpgradeBuildModal__infoText}>
            {currentStatsText[language]}
          </span>
          <div className={styles.cyberFarmUpgradeBuildModal__titleLine} />
        </div>
        <LevelStats
          language={language}
          output={upgradeLevels?.[level?.toString()]?.bonus || 0}
        />
        {nextLevelData && (
          <>
            <div className={styles.cyberFarmUpgradeBuildModal__titleBlock}>
              <div className={styles.cyberFarmUpgradeBuildModal__titleLine} />

              <span className={styles.cyberFarmUpgradeBuildModal__infoText}>
                {nextLevelText[language]}
              </span>
              <div className={styles.cyberFarmUpgradeBuildModal__titleLine} />
            </div>
            <LevelStats language={language} output={nextLevelData.bonus} />
          </>
        )}
        {nextLevelData && (
          <div className={styles.cyberFarmUpgradeBuildModal__missingResCost}>
            <span
              className={styles.cyberFarmUpgradeBuildModal__missingResCostText}
            >
              {canUpgradeForText[language]} {upgradeCost}
            </span>
            <ImageWebp
              src={cpImage}
              srcSet={cpImageWebp}
              alt="cp"
              className={styles.cyberFarmUpgradeBuildModal__cpImage}
            />
          </div>
        )}
        <MainBtn
          disabled={!nextLevelData}
          onClick={onUpgrade}
          id={ECyberfarmTutorialActions.produceRes}
          innerClass={styles.cyberFarmUpgradeBuildModal__acceptBtnInner}
          className={styles.cyberFarmUpgradeBuildModal__acceptBtn}
        >
          <UpgradeIcon />
          <span>{upgradeButtonText[language]}</span>
        </MainBtn>
      </div>
      <Tooltip show={showTooltip} text={successText[language]} />
    </ModalWithAdd>
  );
};

export default CyberFarmUpgradeBuildModal;
