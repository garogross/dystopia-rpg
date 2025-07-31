import React, { useEffect, useState } from "react";

import styles from "./InfluenceMapHexInfoModal.module.scss";
import { IHex } from "../../../../models/Influence/IHex";
import Backdrop from "../../../layout/Backdrop/Backdrop";
import NewPortalProvider from "../../../../providers/NewPortalProvider";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  influenceEnergyImage,
  influenceEnergyImageWebp,
  influenceHexImage,
  influenceHexImageWebp,
} from "../../../../assets/imageMaps";
import { DotsLine } from "../../../layout/icons/RPGGame/Common";
import {
  AttackIcon,
  PersonIcon,
} from "../../../layout/icons/Influence/InfluenceMaphexInfoModal";
import { BuildIcon } from "../../../layout/icons/Influence/Common";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { ConfirmIcon } from "../../../layout/icons/Common";
import HeaderBtn from "../../../layout/HeaderBtn/HeaderBtn";
import { useTooltip } from "../../../../hooks/useTooltip";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { attackHex } from "../../../../store/slices/influence/mapSlice";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import { FillupIcon } from "../../../layout/icons/Influence/Common";
import { openRestoreModal } from "../../../../store/slices/influence/influenceSlice";

interface Props {
  hex: IHex;
  show: boolean;
  color?: string;
  onClose: () => void;
}

const {
  coordinatesText,
  ownerTitleText,
  ownerPlayerText,
  neutralTerritoryText,
  buildingTitleText,
  defensiveBunkerText,
  actionsTitleText,
  buildButtonText,
  attackButtonText,
  confirmButtonText,
  fillupButtonText,
  apWillBeSpentText,
} = TRANSLATIONS.influence.map.infoModal;

const DEFAULT_COLOR = "#7f5cff";

const {
  notEnoughActionPointsText,
  actionWillEnableInText,
  hexOccupiedText,
  hexAttackedText,
} = TRANSLATIONS.influence.map;
const { somethingWentWrong } = TRANSLATIONS.errors;

const InfluenceMapHexInfoModal: React.FC<Props> = ({
  hex,
  show,
  color,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  const mapId = useAppSelector((state) => state.influence.map.mapId);
  const nextAttackTs = useAppSelector(
    (state) => state.influence.map.nextAttackTs
  );
  const actionPoints = useAppSelector(
    (state) => state.influence.influence.actionPoints
  );
  const actionPointMax = useAppSelector(
    (state) => state.influence.settings.actionPointMaxPerTurn
  );
  const attackEnemyHexWithoutBuilding = useAppSelector(
    (state) => state.influence.settings.attackEnemyHexWithoutBuilding
  );
  const attackNeutralHex = useAppSelector(
    (state) => state.influence.settings.attackNeutralHex
  );
  const tgId = useAppSelector((state) => state.profile.tgId);
  const [selectedAction, setSelectedAction] = useState("");
  const [tooltipText, setTooltipText] = useState(hexOccupiedText[language]);
  const { show: showTooltip, openTooltip } = useTooltip();

  if (!color) color = DEFAULT_COLOR;

  let requiredPoints = hex.owner_id
    ? attackEnemyHexWithoutBuilding.actionPointsCost
    : attackNeutralHex.actionPointsCost;
  if (hex?.harmedPoints) requiredPoints -= hex.harmedPoints;
  let nextHarm = actionPointMax;
  if (nextHarm > requiredPoints) nextHarm = requiredPoints;

  useEffect(() => {
    if (!show) {
      setSelectedAction("");
    }
  }, [show]);

  const onAttack = async () => {
    if (!mapId || hex.owner_id === tgId || !hex) return;

    // check timer enable
    if (nextAttackTs && Date.now() < nextAttackTs) {
      setTooltipText(
        actionWillEnableInText[language].replace(
          "SECONDS",
          Math.ceil((nextAttackTs - Date.now()) / 1000).toString()
        )
      );
      openTooltip();
      return;
    }

    // check enough AP
    if (
      (hex.owner_id &&
        actionPoints < attackEnemyHexWithoutBuilding.actionPointsCost) ||
      (!hex.owner_id && actionPoints < attackNeutralHex.actionPointsCost)
    ) {
      setTooltipText(notEnoughActionPointsText[language]);
      openTooltip();
      return;
    }
    try {
      const res = await dispatch(
        attackHex({ x: hex.x, y: hex.y, z: hex.z, mapId: mapId })
      ).unwrap();

      setTooltipText(
        (res.captured ? hexOccupiedText : hexAttackedText)[language]
      );

      openTooltip();
    } catch (error) {
      setTooltipText(somethingWentWrong[language]);
      openTooltip();
    }
  };

  if (!hex) return null;

  const buttons = [
    {
      text: buildButtonText,
      icon: <BuildIcon />,
      condition: hex.owner_id === tgId && !hex.bonus_area_id,
    },
    // {
    //   text: "Ремонт",
    //   icon: <RepairIcon />,
    //   condition: hex.owner_id === tgId && hex.bonus_area_id,
    // },
    // {
    //   text: "Улутчшить",
    //   icon: <UpdateBuildingIcon />,
    //   condition: hex.owner_id === tgId && hex.bonus_area_id,
    // },
    // {
    //   text: "Снести",
    //   icon: <DemolishIcon />,
    //   condition: hex.owner_id === tgId && hex.bonus_area_id,
    // },
    {
      text: attackButtonText,
      icon: <AttackIcon />,
      condition: hex.owner_id !== tgId,
      onclick: onAttack,
    },
    // {
    //   text: "Разведка",
    //   icon: <SqoutIcon />,
    //   condition: hex.owner_id !== tgId,
    // },
  ];

  const activeBtn = buttons.find(
    (btn) => btn.text[language] === selectedAction
  );

  return (
    <>
      <Backdrop inProp={show} onClose={onClose} />
      <NewPortalProvider>
        <TransitionProvider
          inProp={show}
          style={TransitionStyleTypes.opacity}
          className={styles.influenceMapHexInfoModal}
        >
          <WrapperWithFrame frameColor={color} style={{ background: color }}>
            <div className={styles.influenceMapHexInfoModal__inner}>
              <div className={styles.influenceMapHexInfoModal__header}>
                <div className={styles.influenceMapHexInfoModal__headerMain}>
                  <div
                    className={
                      styles.influenceMapHexInfoModal__headerHexImgWrapper
                    }
                    style={{ backgroundColor: color }}
                  >
                    <ImageWebp
                      src={influenceHexImage}
                      srcSet={influenceHexImageWebp}
                      alt="hex"
                      className={styles.influenceMapHexInfoModal__hexImg}
                    />
                  </div>
                  <h6 className={styles.influenceMapHexInfoModal__titleText}>
                    {coordinatesText[language]}: X{hex.x}-Y{hex.y}-Z{hex.z}
                  </h6>
                </div>
                <HeaderBtn type={"close"} fill={color} onClick={onClose} />
              </div>
              <div className={styles.influenceMapHexInfoModal__info}>
                {hex.owner_id ? (
                  <div className={styles.influenceMapHexInfoModal__infoBlock}>
                    <p className={styles.influenceMapHexInfoModal__titleText}>
                      {ownerTitleText[language]}
                    </p>
                    <div
                      className={
                        styles.influenceMapHexInfoModal__gradientInfoBlock
                      }
                      style={{
                        background: `linear-gradient(90deg, ${color} 0%, #2a1e5400 100%)`,
                      }}
                    >
                      <PersonIcon />
                      <p className={styles.influenceMapHexInfoModal__infoText}>
                        {ownerPlayerText[language]}:{" "}
                        <span
                          className={
                            styles.influenceMapHexInfoModal__infoTextValue
                          }
                        >
                          {hex.owner_id}
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className={styles.influenceMapHexInfoModal__neutralText}>
                    {neutralTerritoryText[language]}
                  </p>
                )}
                {hex.building_type && (
                  <div className={styles.influenceMapHexInfoModal__infoBlock}>
                    <p className={styles.influenceMapHexInfoModal__titleText}>
                      {buildingTitleText[language]}
                    </p>
                    <div
                      className={
                        styles.influenceMapHexInfoModal__gradientInfoBlock
                      }
                      style={{
                        background: `linear-gradient(90deg, ${color} 0%, #2a1e5400 100%)`,
                      }}
                    >
                      <p className={styles.influenceMapHexInfoModal__infoText}>
                        {" "}
                        {defensiveBunkerText[language]}{" "}
                        <span
                          className={
                            styles.influenceMapHexInfoModal__infoTextValue
                          }
                        >
                          [Ур. 1],[РД 1],[20]
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                <div className={styles.influenceMapHexInfoModal__infoBlock}>
                  <p className={styles.influenceMapHexInfoModal__titleText}>
                    {actionsTitleText[language]}
                  </p>
                  <div
                    className={
                      styles.influenceMapHexInfoModal__actionBtnsWrapper
                    }
                  >
                    {buttons
                      .filter((item) => item.condition)
                      .map((btn) => (
                        <button
                          onClick={() => setSelectedAction(btn.text[language])}
                          className={`${
                            styles.influenceMapHexInfoModal__actionBtn
                          } ${
                            selectedAction === btn.text[language]
                              ? styles.influenceMapHexInfoModal__actionBtn_active
                              : ""
                          }`}
                          key={btn.text[language]}
                        >
                          <div
                            className={
                              styles.influenceMapHexInfoModal__actionBtnInner
                            }
                          >
                            {btn.icon}
                            <span>{btn.text[language]}</span>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
              <TransitionProvider
                inProp={!!selectedAction}
                style={TransitionStyleTypes.height}
                height={300}
                className={styles.influenceMapHexInfoModal__actionDetails}
              >
                <div
                  className={
                    styles.influenceMapHexInfoModal__actionDetailsDotsline
                  }
                >
                  <DotsLine preserveAspectRatio />
                </div>
                <div className={styles.influenceMapHexInfoModal__spendingAP}>
                  <p className={styles.influenceMapHexInfoModal__titleText}>
                    {apWillBeSpentText[language]}: {nextHarm}/{requiredPoints}
                  </p>
                  <ImageWebp
                    src={influenceEnergyImage}
                    srcSet={influenceEnergyImageWebp}
                    alt="action point"
                    className={styles.influenceMapHexInfoModal__actionPointsImg}
                  />
                </div>
                <button
                  onClick={() => {
                    if (actionPoints) {
                      activeBtn?.onclick?.();
                    } else {
                      dispatch(openRestoreModal("restore"));
                    }
                    onClose();
                  }}
                  className={`${styles.influenceMapHexInfoModal__actionBtn} ${styles.influenceMapHexInfoModal__confirmBtn}`}
                >
                  <div
                    className={styles.influenceMapHexInfoModal__actionBtnInner}
                  >
                    {actionPoints ? (
                      <>
                        <ConfirmIcon />
                        <span>{confirmButtonText[language]}</span>
                      </>
                    ) : (
                      <>
                        <FillupIcon />
                        <span>{fillupButtonText[language]}</span>
                      </>
                    )}
                  </div>
                </button>
              </TransitionProvider>
            </div>
          </WrapperWithFrame>
        </TransitionProvider>
      </NewPortalProvider>
      <Tooltip show={showTooltip} text={tooltipText} />
    </>
  );
};

export default InfluenceMapHexInfoModal;
