import React, { useEffect, useState } from "react";

import styles from "./CyberFarmUpgradeBuildModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  addModuleToSlot,
  buySlot,
} from "../../../store/slices/cyberFarm/slotsSlice";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { useTooltip } from "../../../hooks/useTooltip";
import Tooltip from "../../layout/Tooltip/Tooltip";

import MainBtn from "../../layout/MainBtn/MainBtn";
import {
  addModuleImage,
  addModuleImageWebp,
  cpImage,
  cpImageWebp,
  evoFactoryImage,
  evoFactoryWebpImage,
  evoFarmImage,
  evoFarmWebpImage,
  fabricBuildImage,
  fabricBuildWebpImage,
} from "../../../assets/imageMaps";
import { ELanguages } from "../../../constants/ELanguages";
import { UpgradeIcon } from "../../layout/icons/CyberFarm/CyberFarmUpgradeBuildModal";
import { getProductionEstimate } from "../../../store/slices/cyberFarm/resourcesSlice";
import { products } from "../../../constants/cyberfarm/products";
import { EModuleProducts } from "../../../constants/cyberfarm/EModuleProducts";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { CancelIcon, ConfirmIcon } from "../../layout/icons/Common";
import { EFarmSlotModules } from "../../../constants/cyberfarm/EFarmSlotModules";
import { IFarmSlot } from "../../../models/CyberFarm/IFarmSlot";

interface Props {
  show: boolean;
  onClose: () => void;
  type: EFarmSlotTypes;
  slotId: string;
  evoMode?: boolean;
  level: number | undefined;
  modules: IFarmSlot["modules"];
}

const {
  titleText,
  farmText,
  modulesText,
  factoryText,
  fabricText,
  levelText,
  currentStatsText,
  productionOutputText,
  perHourText,
  nextLevelText,
  canUpgradeForText,
  upgradeButtonText,
  successText,
  notEnoughCPText,
  automizationNeededText,
  workshopSlotModuleCapacityExceededText,
  notEnoughModulesText,
  installModuleText,
  forIncreaseSpeedText,
  forAutomationActivationText,
  forIncreaseProductionText,
  confirmButtonText,
  cancelButtonText,
} = TRANSLATIONS.cyberFarm.upgradeModal;

interface LevelStatsProps {
  language: ELanguages;
  output: number;
}

const moduleTexts = {
  [EModuleProducts.Acceleration]: forIncreaseSpeedText,
  [EModuleProducts.Autonomy]: forAutomationActivationText,
  [EModuleProducts.Production]: forIncreaseProductionText,
};

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

const getModulType = (module: EModuleProducts) => {
  return module?.replace("module_", "") as EFarmSlotModules;
};

const CyberFarmUpgradeBuildModal: React.FC<Props> = ({
  show,
  onClose,
  type,
  slotId,
  evoMode,
  level = 1,
  modules,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const cp = useAppSelector((state) => state.profile.stats.cp);
  const resources = useAppSelector(
    (state) => state.cyberfarm.resources.resources
  );
  const moduleLimits = useAppSelector(
    (state) => state.cyberfarm.slots.moduleLimits
  );
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [selectedModule, setSelectedModule] = useState<EModuleProducts | null>(
    null
  );
  const { show: showTooltip, openTooltip } = useTooltip();

  const upgradeLevels = useAppSelector(
    (state) => state.cyberfarm.slots.upgradeLevels
  );
  const nextLevelData = upgradeLevels?.[(+level + 1)?.toString()];

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
  const onAddModule = async () => {
    try {
      if (!selectedModule) return;
      setLoading(true);
      setErrored(false);

      if (!resources[selectedModule]) {
        setErrorText(notEnoughModulesText[language]);
        throw new Error();
      }

      // check automatisation installed on install speed module
      if (
        selectedModule === EModuleProducts.Acceleration &&
        type !== EFarmSlotTypes.WORKSHOP &&
        !modules?.automation
      ) {
        setErrorText(automizationNeededText[language]);
        throw new Error();
      }

      await dispatch(
        addModuleToSlot({
          slot_id: slotId,
          slot_type: type,
          module_type: getModulType(selectedModule),
          action: "install",
        })
      ).unwrap();
      await openTooltip();
      onClose();
    } catch (error: any) {
      if (error.status === 400) {
        setErrorText(workshopSlotModuleCapacityExceededText[language]);
        await openTooltip();
        return;
      }

      setErrored(true);
    } finally {
      setLoading(false);
    }
  };

  const slotTypeDetails = {
    [EFarmSlotTypes.FACTORY]: {
      src: evoFactoryImage,
      srcSet: evoFactoryWebpImage,
      name: factoryText,
    },
    [EFarmSlotTypes.FARM]: {
      src: evoFarmImage,
      srcSet: evoFarmWebpImage,
      name: farmText,
    },
    [EFarmSlotTypes.FIELDS]: {
      // for avoid typescript error
      src: evoFarmImage,
      srcSet: evoFarmWebpImage,
      name: farmText,
    },
    workshop: {
      src: fabricBuildImage,
      srcSet: fabricBuildWebpImage,
      name: fabricText,
    },
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
            src={slotTypeDetails[type].src}
            srcSet={slotTypeDetails[type].srcSet}
            alt={farmText[language]}
            className={styles.cyberFarmUpgradeBuildModal__resourceImg}
          />
          <h4 className={styles.cyberFarmUpgradeBuildModal__infoTitle}>
            {slotTypeDetails[type].name[language]}
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
          innerClass={styles.cyberFarmUpgradeBuildModal__acceptBtnInner}
          className={styles.cyberFarmUpgradeBuildModal__acceptBtn}
        >
          <UpgradeIcon />
          <span>{upgradeButtonText[language]}</span>
        </MainBtn>
      </div>
      <div className={styles.cyberFarmUpgradeBuildModal__modules}>
        <h4 className={styles.cyberFarmUpgradeBuildModal__infoTitle}>
          {modulesText[language]}
        </h4>
        <div className={styles.cyberFarmUpgradeBuildModal__modulesList}>
          {Object.entries(products)
            .filter(([_, value]) => value.type === "modules")
            .map(([k, value]) => {
              const key = k as EModuleProducts;
              const res = +(modules?.[getModulType(key)] || 0);
              const maxLimit = moduleLimits[key][type];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedModule(key)}
                  className={styles.cyberFarmUpgradeBuildModal__moduleItem}
                >
                  <div
                    className={`${
                      styles.cyberFarmUpgradeBuildModal__moduuleItemMain
                    } ${
                      key === selectedModule
                        ? styles.cyberFarmUpgradeBuildModal__moduuleItemMain_active
                        : ""
                    }`}
                  >
                    <div
                      className={
                        styles.cyberFarmUpgradeBuildModal__moduuleItemMainInner
                      }
                    >
                      <ImageWebp
                        src={value.src}
                        srcSet={value.srcSet}
                        alt={value.name[language]}
                        className={
                          styles.cyberFarmUpgradeBuildModal__moduuleItemMainModuleImg
                        }
                        pictureClass={
                          styles.cyberFarmUpgradeBuildModal__moduuleItemMainModulePicture
                        }
                        style={{
                          opacity: `${Math.max(0.1, res / maxLimit)}`,
                        }}
                      />
                      {res < maxLimit && (
                        <ImageWebp
                          src={addModuleImage}
                          srcSet={addModuleImageWebp}
                          alt="plus"
                          className={
                            styles.cyberFarmUpgradeBuildModal__moduuleItemMainPlusImg
                          }
                          pictureClass={
                            styles.cyberFarmUpgradeBuildModal__moduuleItemMainPlusPicture
                          }
                        />
                      )}
                    </div>
                  </div>
                  <span
                    className={
                      styles.cyberFarmUpgradeBuildModal__moduleItemCountText
                    }
                  >
                    {res}/{moduleLimits[key][type]}
                  </span>
                </button>
              );
            })}
        </div>
        <TransitionProvider
          style={TransitionStyleTypes.height}
          inProp={!!selectedModule}
          height={80}
          className={styles.cyberFarmUpgradeBuildModal__modulesConfirmBlock}
        >
          <p className={styles.cyberFarmUpgradeBuildModal__infoTitle}>
            {installModuleText[language]}{" "}
            <span style={{ color: "#FF0000" }}>
              {selectedModule ? moduleTexts[selectedModule][language] : ""}
            </span>
            ?
          </p>
          <div
            className={styles.cyberFarmUpgradeBuildModal__modulesConfirmBtns}
          >
            <MainBtn
              innerClass={styles.cyberFarmUpgradeBuildModal__acceptBtnInner}
              className={styles.cyberFarmUpgradeBuildModal__acceptBtn}
              position="left"
              onClick={onAddModule}
            >
              <ConfirmIcon />
              {confirmButtonText[language]}
            </MainBtn>
            <MainBtn
              innerClass={styles.cyberFarmUpgradeBuildModal__acceptBtnInner}
              className={styles.cyberFarmUpgradeBuildModal__acceptBtn}
              onClick={() => setSelectedModule(null)}
              position="right"
            >
              <CancelIcon />
              {cancelButtonText[language]}
            </MainBtn>
          </div>
        </TransitionProvider>
      </div>
      <Tooltip show={showTooltip} text={successText[language]} />
    </ModalWithAdd>
  );
};

export default CyberFarmUpgradeBuildModal;
