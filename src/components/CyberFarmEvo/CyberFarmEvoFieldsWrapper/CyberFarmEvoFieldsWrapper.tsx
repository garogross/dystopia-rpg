import React, { useEffect, useRef, useState } from "react";

import styles from "./CyberFarmEvoFieldsWrapper.module.scss";
import { useVideoAd } from "../../../hooks/useVideoAd";
import { EadProviders } from "../../../constants/EadProviders";
import { EAdActionTypes } from "../../../constants/EadActionTypes";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import MainBtn from "../../layout/MainBtn/MainBtn";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  adImage,
  adImageWebp,
  evoBlockedSlotImage,
  evoBlockedSlotWebpImage,
} from "../../../assets/imageMaps";
import { useAppSelector } from "../../../hooks/redux";
import { v4 } from "uuid";

import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay";
import Tooltip from "../../layout/Tooltip/Tooltip";
import { ClaimAdRewardActionType } from "../../../types/tasks/ClaimAdRewardActionType";
import CyberFarmEvoFieldsWrapperProgress from "./CyberFarmEvoFieldsWrapperProgress/CyberFarmEvoFieldsWrapperProgress";
import { IFarmSlot } from "../../../models/CyberFarm/IFarmSlot";

export type InitialFieldType = {
  id: string;
  disabled?: boolean;
  isEmpty?: boolean;
  curImage?: { src: string; srcSet: string };
  blocked?: boolean;
  level?: number;
  adProductionBonusReceived?: boolean;
  finalProduction?: number;
  process?:
    | {
        startDate: number;
        endDate: number;
      }
    | undefined;
  modules?: IFarmSlot["modules"];
};

interface Props<T extends InitialFieldType> {
  slotFields: T[];
  onClickField: (item: T) => void;
  initialFieldData?: Partial<T>;
  modifyInitialFields?: (initialFields: T[][]) => T[][];
  gameAction: ClaimAdRewardActionType;
  fieldBg: string;
}

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

const CyberFarmEvoFieldsWrapper = <T extends InitialFieldType>({
  slotFields,
  initialFieldData,
  modifyInitialFields,
  onClickField,
  gameAction,
  fieldBg,
}: Props<T>) => {
  const language = useAppSelector((state) => state.ui.language);
  const { onShowAd, maxPerDay, viewsInDay, showTooltip, tooltipText, loading } =
    useVideoAd({
      speedUpCompleteText: productionCollectedText,
      provider: EadProviders.Gigapub,
      ad_type: EAdActionTypes.Video,
      game_action: gameAction,
    });
  const [fieldWidth, setFieldWidth] = useState(0);
  const [fields, setFields] = useState<T[][]>([]);

  const fieldHeight = fieldWidth / FIELD_HEIGHT_ASPECT_RATIO;

  const wrapperRef = useRef<HTMLDivElement>(null);

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
      let initialFields = Array.from(
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
                disabled: true,
                ...(initialFieldData ? initialFieldData : {}),
              } as T;
            else {
              globalSlotIndex++;
              return curSlot;
            }
          });
        }
      );

      if (modifyInitialFields)
        initialFields = modifyInitialFields(initialFields);

      setFields(initialFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotFields]);

  return (
    <div className={styles.cyberFarmEvoFieldsWrapper}>
      <div className={`container ${styles.cyberFarmEvoFieldsWrapper__header}`}>
        <div className={styles.cyberFarmEvoFieldsWrapper__headerSideBlock}>
          <span>
            {viewsInDay}/{maxPerDay}
          </span>
        </div>
        <MainBtn
          onClick={onShowAd}
          className={styles.cyberFarmEvoFieldsWrapper__collectAllBtn}
        >
          <ImageWebp srcSet={adImage} src={adImageWebp} alt={"watch ad"} />
          <span>{collectAllText[language]}</span>
        </MainBtn>
        <div
          className={styles.cyberFarmEvoFieldsWrapper__headerSideBlock}
        ></div>
      </div>
      <div
        className={styles.cyberFarmEvoFieldsWrapper__fieldsWrapper}
        ref={wrapperRef}
      >
        <div className={styles.cyberFarmEvoFieldsWrapper__fieldsContainer}>
          {fields.map((col, colIndex) =>
            col.map((field, fieldIndex) => {
              return (
                <button
                  data-id={field.id}
                  onClick={() => onClickField(field)}
                  disabled={field.disabled}
                  key={`${colIndex}-${fieldIndex}`}
                  style={{
                    top: colIndex * fieldHeight,
                    zIndex: colIndex,
                    left:
                      fieldIndex * fieldWidth +
                      (isOdd(colIndex) ? 0 : fieldWidth / 2),
                    backgroundImage: `url(${fieldBg})`,
                  }}
                  className={`${styles.cyberFarmEvoFieldsWrapper__field} ${
                    field.isEmpty
                      ? styles.cyberFarmEvoFieldsWrapper__field_empty
                      : ""
                  }`}
                >
                  {field.process && (
                    <CyberFarmEvoFieldsWrapperProgress
                      process={field.process}
                    />
                  )}
                  {field.curImage && (
                    <ImageWebp
                      srcSet={field.curImage.srcSet}
                      src={field.curImage.src}
                      alt={"field"}
                      className={
                        styles.cyberFarmEvoFieldsWrapper__fieldPlantImg
                      }
                    />
                  )}
                  {field.blocked && (
                    <ImageWebp
                      srcSet={evoBlockedSlotImage}
                      src={evoBlockedSlotWebpImage}
                      alt={"blocked"}
                      className={styles.cyberFarmEvoFieldsWrapper__blockedImg}
                    />
                  )}
                  {field.level && field.level > 1 && (
                    <span
                      className={styles.cyberFarmEvoFieldsWrapper__levelText}
                    >
                      {field.level}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      <LoadingOverlay loading={loading} />
      <Tooltip show={showTooltip} text={tooltipText} />
    </div>
  );
};

export default CyberFarmEvoFieldsWrapper;
