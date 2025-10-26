import React, { useEffect, useRef, useState } from "react";
import MainBtn from "../../layout/MainBtn/MainBtn";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  adImage,
  adImageWebp,
  evoBlockedSlotImage,
  evoBlockedSlotWebpImage,
  evoFactoryImage,
  evoFactoryWebpImage,
  evoFactoryWorkingImage,
  evoFactoryWorkingWebpImage,
  evoFarmImage,
  evoFarmWebpImage,
} from "../../../assets/imageMaps";

import styles from "./CyberFarmEvoFarms.module.scss";
import { IFarmField } from "../../../models/CyberFarm/IFarmField";
import { v4 } from "uuid";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { useAppSelector } from "../../../hooks/redux";
import { getFarmFieldsFromSlots } from "../../../utils/getFarmFieldsFromSlots";
import { evoPlantImages } from "../../../constants/cyberfarm/evoPlantImages";
import CyberFarmEvoFarmsProgress from "./CyberFarmEvoFarmsProgress/CyberFarmEvoFarmsProgress";
import { useFarmFieldsProgressCheck } from "../../../hooks/useFarmFieldsProgressCheck";
import CyberFarmFieldsBuildModal from "../../CyberFarm/CyberFarmFieldsPage/CyberFarmFieldsBuildModal/CyberFarmFieldsBuildModal";
import CyberFarmFieldsBuildOptionsModal from "../../CyberFarm/CyberFarmFieldsPage/CyberFarmFieldsBuildOptionsModal/CyberFarmFieldsBuildOptionsModal";
import CyberFarmFieldsBuyModal from "../../CyberFarm/CyberFarmFieldsPage/CyberFarmFieldsBuyModal/CyberFarmFieldsBuyModal";
import CyberFarmEvoOptionsModal from "./CyberFarmEvoOptionsModal/CyberFarmEvoOptionsModal";
import CyberFarmEvoProcessModal from "./CyberFarmEvoProcessModal/CyberFarmEvoProcessModal";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay";
import Tooltip from "../../layout/Tooltip/Tooltip";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import CyberFarmBuildingPlantOptionsModal from "../../CyberFarm/CyberFarmBuildingPlantOptionsModal/CyberFarmBuildingPlantOptionsModal";
import CyberFarmUpgradeBuildModal from "../../CyberFarm/CyberFarmUpgradeBuildModal/CyberFarmUpgradeBuildModal";
import { useVideoAd } from "../../../hooks/useVideoAd";
import { EadProviders } from "../../../constants/EadProviders";
import { EAdActionTypes } from "../../../constants/EadActionTypes";

const FIELD_HEIGHT_ASPECT_RATIO = 3.4;

function countRows(items: number): number {
  const cycles = Math.floor(items / 5);
  let rows = cycles * 2;
  const remaining = items % 5;

  if (remaining === 0) {
    return rows;
  } else if (remaining <= 2) {
    return rows + 1;
  } else {
    return rows + 2;
  }
}
const isOdd = (i: number) => !(i % 2);

const { collectAllText, productionCollectedText } =
  TRANSLATIONS.cyberfarmEvo.farms;

const CyberFarmEvoFarms = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slots = useAppSelector((state) => state.cyberfarm.slots.slots);
  const language = useAppSelector((state) => state.ui.language);
  const [fields, setFields] = useState<IFarmField[][]>([]);
  const [fieldWidth, setFieldWidth] = useState(0);
  const fieldHeight = fieldWidth / FIELD_HEIGHT_ASPECT_RATIO;
  const [buyModalOpened, setBuyModalOpened] = useState(false);
  const [buyingSlotId, setBuyingSlotId] = useState<string | null>(null);
  const [buildSlotId, setBuildSlotId] = useState<string | null>(null);
  const [buildingPlantSlotId, setBuildingPlantSlotId] = useState<
    string | null
  >();
  const [upgradingSlotId, setUpgradingSlotId] = useState<string | null>(null);
  const [buildModalOpened, setBuildModalOpened] = useState(false);
  const [buildOptionsModalOpened, setBuildOptionsModalOpened] = useState(false);
  const [progressModalOpened, setProgressModalOpened] = useState(false);
  const [buildingPlantOptionsModalOpened, setBuildingPlantOptionsModalOpened] =
    useState(false);
  const [upgradeModalOpened, setUpgradeModalOpened] = useState(false);
  const [activeProgresModalItemId, setActiveProgresModalItemId] = useState<
    IFarmField["id"] | null
  >(null);
  const [optionsModalOpened, setOptionsModalOpened] = useState(false);
  const [producingSlotId, setProducingSlotId] = useState<string | null>(null);

  const slotFields = getFarmFieldsFromSlots(slots).sort((a, b) => {
    // Sort first by type using custom order, then by level (ascending)
    const order = {
      [EFarmSlotTypes.FIELDS]: 2,
      [EFarmSlotTypes.FARM]: 1,
      [EFarmSlotTypes.FACTORY]: 0,
    };

    if (order[a.type] !== order[b.type]) {
      return order[a.type] - order[b.type];
    }

    // Fallback: sort by level property if present
    // Handles undefined level as lower than defined
    if (a.level !== undefined && b.level !== undefined) {
      return b.level - a.level;
    }
    if (a.level !== undefined) return 1;
    if (b.level !== undefined) return -1;
    return 0;
  });

  slotFields.push({
    type: EFarmSlotTypes.FIELDS,
    id: v4(),
    blocked: true,
  });

  const producingSlot =
    producingSlotId && slotFields.find((item) => item.id === producingSlotId);
  const upgradingSlot =
    upgradingSlotId && slotFields.find((item) => item.id === upgradingSlotId);
  const buildingPlantSlot =
    buildingPlantSlotId &&
    slotFields.find((item) => item.id === buildingPlantSlotId);

  const activeProgresModalItem = slotFields.find(
    (field) => field.id === activeProgresModalItemId
  );

  useFarmFieldsProgressCheck(slotFields);

  const { onShowAd, maxPerDay, viewsInDay, showTooltip, tooltipText, loading } =
    useVideoAd({
      speedUpCompleteText: productionCollectedText,
      provider: EadProviders.Gigapub,
      ad_type: EAdActionTypes.Video,
      game_action: "farm_collect_ready",
    });

  useEffect(() => {
    if (wrapperRef.current) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();

      const wrapperHeight = wrapperRect.height;
      const wrapperWidth = wrapperRect.width;
      const fieldWidth = wrapperWidth / 3;
      setFieldWidth(fieldWidth);
      const fieldHeight = fieldWidth / FIELD_HEIGHT_ASPECT_RATIO || 0;

      let colsLength = Math.ceil(wrapperHeight / fieldHeight);
      const UNUSABLE_COLS_COUNT = 4; // first 2 cols and last
      const usableCols = colsLength - UNUSABLE_COLS_COUNT;
      const totalSlotsCols = countRows(slotFields.length);

      const totalItemsInScreen =
        Math.ceil(usableCols / 2) * 2 + Math.floor(usableCols / 2) * 3;

      if (totalItemsInScreen < slotFields.length) {
      }

      let globalSlotIndex = 0;
      const totalColsLength = Math.max(
        colsLength,
        totalSlotsCols + UNUSABLE_COLS_COUNT
      );
      const initialFields = Array.from(
        { length: totalColsLength },
        (_, colIndex) => {
          const rowLength = isOdd(colIndex) ? 4 : 3;
          return Array.from({ length: rowLength }, (_, index) => {
            const curSlot = slotFields[globalSlotIndex];

            if (
              !curSlot ||
              colIndex < 2 ||
              colIndex === totalColsLength ||
              (isOdd(colIndex) && (!index || index === rowLength - 1))
            )
              return {
                id: v4(),
                type: EFarmSlotTypes.FIELDS,
                disabled: true,
              } as IFarmField;
            else {
              globalSlotIndex++;
              return curSlot;
            }
          });
        }
      );
      const lastFieldsColIndex = initialFields.findLastIndex((col) =>
        col.find((item) => !item.disabled)
      );

      if (lastFieldsColIndex !== -1) {
        const lastColFilledItemsCount = initialFields[
          lastFieldsColIndex
        ].filter((item) => !item.disabled).length;
        const availableFilledCountInRow = isOdd(lastFieldsColIndex) ? 2 : 3;
        const fillableItemIndex = initialFields[
          lastFieldsColIndex
        ].findLastIndex((item) => !item.disabled);
        if (lastColFilledItemsCount < availableFilledCountInRow) {
          for (
            let i = 0;
            i < availableFilledCountInRow - lastColFilledItemsCount;
            i++
          ) {
            initialFields[lastFieldsColIndex][fillableItemIndex + i + 1] = {
              type: EFarmSlotTypes.FIELDS,
              id: v4(),
              blocked: true,
            };
          }
        }
      }

      setFields(initialFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots]);

  const onClickSlot = (field: IFarmField) => {
    if (field.blocked) {
      setBuyingSlotId(field.id);
      setBuyModalOpened(true);
    } else if (field.process) {
      setActiveProgresModalItemId(field.id);
      setProgressModalOpened(true);
    } else {
      if (field.type === EFarmSlotTypes.FIELDS) {
        setBuildSlotId(field.id);
        setBuildModalOpened(true);
      } else {
        setBuildingPlantSlotId(field.id);
        setBuildingPlantOptionsModalOpened(true);
      }
    }
  };

  return (
    <div className={styles.cyberFarmEvoFarms}>
      <div className={`container ${styles.cyberFarmEvoFarms__header}`}>
        <div className={styles.cyberFarmEvoFarms__headerSideBlock}>
          <span>
            {viewsInDay}/{maxPerDay}
          </span>
        </div>
        <MainBtn
          onClick={onShowAd}
          className={styles.cyberFarmEvoFarms__collectAllBtn}
        >
          <ImageWebp srcSet={adImage} src={adImageWebp} alt={"watch ad"} />
          <span>{collectAllText[language]}</span>
        </MainBtn>
        <div className={styles.cyberFarmEvoFarms__headerSideBlock}></div>
      </div>
      <div className={styles.cyberFarmEvoFarms__fieldsWrapper} ref={wrapperRef}>
        <div className={styles.cyberFarmEvoFarms__fieldsContainer}>
          {fields.map((col, colIndex) =>
            col.map((field, fieldIndex) => {
              let curImage: {
                src: string;
                srcSet: string;
              } | null = null;

              if (field.type === "factory") {
                curImage = {
                  src: field.process ? evoFactoryWorkingImage : evoFactoryImage,
                  srcSet: field.process
                    ? evoFactoryWorkingWebpImage
                    : evoFactoryWebpImage,
                };
              } else if (field.plant) {
                curImage =
                  evoPlantImages[field.plant][
                    field.type === "farm" ? "inFarm" : "onField"
                  ];
              } else if (field.type === "farm" && !field.plant) {
                curImage = {
                  src: evoFarmImage,
                  srcSet: evoFarmWebpImage,
                };
              }

              const isEmpty =
                field.type === EFarmSlotTypes.FIELDS &&
                !field.plant &&
                !field.factoryProduct &&
                !field.blocked &&
                !field.disabled;

              return (
                <button
                  data-id={field.id}
                  onClick={() => onClickSlot(field)}
                  disabled={field.disabled}
                  key={`${colIndex}-${fieldIndex}`}
                  style={{
                    top: colIndex * fieldHeight,
                    zIndex: colIndex,
                    left:
                      fieldIndex * fieldWidth +
                      (isOdd(colIndex) ? 0 : fieldWidth / 2),
                  }}
                  className={`${styles.cyberFarmEvoFarms__field} ${
                    isEmpty ? styles.cyberFarmEvoFarms__field_empty : ""
                  }`}
                >
                  {field.process && (
                    <CyberFarmEvoFarmsProgress process={field.process} />
                  )}
                  {curImage && (
                    <ImageWebp
                      srcSet={curImage.srcSet}
                      src={curImage.src}
                      alt={field.plant || ""}
                      className={styles.cyberFarmEvoFarms__fieldPlantImg}
                    />
                  )}
                  {field.blocked && (
                    <ImageWebp
                      srcSet={evoBlockedSlotImage}
                      src={evoBlockedSlotWebpImage}
                      alt={field.plant || ""}
                      className={styles.cyberFarmEvoFarms__blockedImg}
                    />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
      {buyingSlotId && (
        <CyberFarmFieldsBuyModal
          evoMode
          buyingSlotId={buyingSlotId}
          show={buyModalOpened}
          onClose={() => setBuyModalOpened(false)}
        />
      )}
      <CyberFarmFieldsBuildModal
        evoMode
        show={buildModalOpened}
        onClose={() => setBuildModalOpened(false)}
        onBuild={() => setBuildOptionsModalOpened(true)}
        onPlant={() => {
          setProducingSlotId(buildSlotId);
          setOptionsModalOpened(true);
        }}
      />
      {buildSlotId && (
        <CyberFarmFieldsBuildOptionsModal
          evoMode
          show={buildOptionsModalOpened}
          slotId={buildSlotId}
          onClose={() => setBuildOptionsModalOpened(false)}
        />
      )}
      {buildingPlantSlot && (
        <CyberFarmBuildingPlantOptionsModal
          evoMode
          show={buildingPlantOptionsModalOpened}
          onClose={() => setBuildingPlantOptionsModalOpened(false)}
          onUpgrade={function (): void {
            setUpgradingSlotId(buildingPlantSlotId);
            setUpgradeModalOpened(true);
          }}
          onPlant={function (): void {
            setProducingSlotId(buildingPlantSlotId);
            setOptionsModalOpened(true);
          }}
          level={buildingPlantSlot.level}
          type={buildingPlantSlot.type}
        />
      )}
      {producingSlot && (
        <CyberFarmEvoOptionsModal
          show={optionsModalOpened}
          onClose={() => setOptionsModalOpened(false)}
          type={producingSlot.type}
          slotId={producingSlotId}
          level={producingSlot.level}
        />
      )}
      {upgradingSlot && (
        <CyberFarmUpgradeBuildModal
          show={upgradeModalOpened}
          onClose={() => setUpgradeModalOpened(false)}
          type={upgradingSlot.type}
          slotId={upgradingSlotId}
          level={upgradingSlot.level}
          evoMode
        />
      )}
      {activeProgresModalItem && !("count" in activeProgresModalItem) && (
        <CyberFarmEvoProcessModal
          show={progressModalOpened}
          onClose={() => setProgressModalOpened(false)}
          item={activeProgresModalItem as IFarmField}
        />
      )}
      <LoadingOverlay loading={loading} />
      <Tooltip show={showTooltip} text={tooltipText} />
    </div>
  );
};

export default CyberFarmEvoFarms;
