import React, { useEffect, useRef, useState } from "react";
import MainBtn from "../../layout/MainBtn/MainBtn";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  adImage,
  adImageWebp,
  evoFactoryImage,
  evoFactoryWebpImage,
  evoFactoryWorkingImage,
  evoFactoryWorkingWebpImage,
  evoFarmImage,
  evoFarmWebpImage,
} from "../../../assets/imageMaps";
import {
  BlockedSlotIcon,
  MapIcon,
} from "../../layout/icons/CyberFarmEvo/Farms";

import styles from "./CyberFarmEvoFarms.module.scss";
import { IFarmField } from "../../../models/CyberFarm/IFarmField";
import { v4 } from "uuid";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { useAppSelector } from "../../../hooks/redux";
import { getFarmFieldsFromSlots } from "../../../utils/getFarmFieldsFromSlots";
import { evoPlantImages } from "../../../constants/cyberfarm/evoPlantImages";
import CyberFarmEvoFarmsProgress from "./CyberFarmEvoFarmsProgress/CyberFarmEvoFarmsProgress";
import { useFarmFieldsProgressCheck } from "../../../hooks/useFarmFieldsProgressCheck";

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

const CyberFarmEvoFarms = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slots = useAppSelector((state) => state.cyberfarm.slots.slots);
  const [fields, setFields] = useState<IFarmField[][]>([]);
  const [fieldWidth, setFieldWidth] = useState(0);
  const fieldHeight = fieldWidth / FIELD_HEIGHT_ASPECT_RATIO;

  const slotFields = getFarmFieldsFromSlots(slots);
  slotFields.push({
    type: EFarmSlotTypes.FIELDS,
    id: v4(),
    blocked: true,
  });
  useFarmFieldsProgressCheck(slotFields);

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
      const initialFields = Array.from(
        { length: Math.max(colsLength, totalSlotsCols + UNUSABLE_COLS_COUNT) },
        (_, colIndex) => {
          const rowLength = isOdd(colIndex) ? 4 : 3;
          return Array.from({ length: rowLength }, (_, index) => {
            const curSlot = slotFields[globalSlotIndex];

            if (
              !curSlot ||
              colIndex < 2 ||
              colIndex === colsLength ||
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

      setFields(initialFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots]);

  return (
    <div className={styles.cyberFarmEvoFarms}>
      <div className={`container ${styles.cyberFarmEvoFarms__header}`}>
        <MainBtn className={styles.cyberFarmEvoFarms__collectAllBtn}>
          <ImageWebp srcSet={adImage} src={adImageWebp} alt={"watch ad"} />
          <span>Собрать всё</span>
        </MainBtn>
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

              return (
                <button
                  disabled={field.disabled}
                  key={`${colIndex}-${fieldIndex}`}
                  style={{
                    top: colIndex * fieldHeight,
                    zIndex: colIndex,
                    left:
                      fieldIndex * fieldWidth +
                      (isOdd(colIndex) ? 0 : fieldWidth / 2),
                  }}
                  className={styles.cyberFarmEvoFarms__field}
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
                    <BlockedSlotIcon
                      className={styles.cyberFarmEvoFarms__blockedIcon}
                    />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
      <div className={`container ${styles.cyberFarmEvoFarms__footer}`}>
        <MainBtn className={styles.cyberFarmEvoFarms__goBackBtn}>
          <MapIcon />
          <span>ВЕРНУТСЯ НА КАРТУ</span>
        </MainBtn>
      </div>
    </div>
  );
};

export default CyberFarmEvoFarms;
