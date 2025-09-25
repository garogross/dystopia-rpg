import React, { useEffect, useRef, useState } from "react";
import MainBtn from "../../layout/MainBtn/MainBtn";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  adImage,
  adImageWebp,
  evoPlasmaMushroomOnFieldImage,
  evoPlasmaMushroomOnFieldWebpImage,
} from "../../../assets/imageMaps";
import { MapIcon } from "../../layout/icons/CyberFarmEvo/Farms";

import styles from "./CyberFarmEvoFarms.module.scss";
import { IFarmField } from "../../../models/CyberFarm/IFarmField";
import { v4 } from "uuid";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { useAppSelector } from "../../../hooks/redux";
import { getFarmFieldsFromSlots } from "../../../utils/getFarmFieldsFromSlots";
import { products } from "../../../constants/cyberfarm/products";

const FIELD_HEIGHT_ASPECT_RATIO = 3.4;

const isOdd = (i: number) => !(i % 2);

const CyberFarmEvoFarms = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slots = useAppSelector((state) => state.cyberfarm.slots.slots);
  const [fields, setFields] = useState<IFarmField[][]>([]);
  const [fieldWidth, setFieldWidth] = useState(0);
  const fieldHeight = fieldWidth / FIELD_HEIGHT_ASPECT_RATIO;

  const slotFields = getFarmFieldsFromSlots(slots);

  useEffect(() => {
    if (wrapperRef.current) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      console.log("wrapperRef.current", wrapperRef.current, wrapperRect);

      const wrapperHeight = wrapperRect.height;
      const wrapperWidth = wrapperRect.width;
      const fieldWidth = wrapperWidth / 3;
      setFieldWidth(fieldWidth);
      const fieldHeight = fieldWidth / FIELD_HEIGHT_ASPECT_RATIO || 0;
      console.log({ wrapperHeight, fieldHeight });

      const colsLength = Math.ceil(wrapperHeight / fieldHeight);
      let globalSlotIndex = 0;
      const initialFields = Array.from(
        { length: colsLength },
        (_, colIndex) => {
          const rowLength = isOdd(colIndex) ? 4 : 3;
          return Array.from({ length: rowLength }, (_, index) => {
            const curSlot = slotFields[globalSlotIndex];
            if (
              !curSlot ||
              !colIndex ||
              colIndex === colsLength - 1 ||
              (isOdd(colIndex) && (!index || index === rowLength - 1))
            )
              return {
                id: v4(),
                type: EFarmSlotTypes.FIELDS,
              };
            else {
              return curSlot;
            }
          });
        }
      );

      setFields(initialFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log({ fields });

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
              const imageObj = field.plant && products[field.plant]?.evo;
              return (
                <div
                  key={`${colIndex}-${fieldIndex}`}
                  style={{
                    top: colIndex * fieldHeight,
                    left:
                      fieldIndex * fieldWidth +
                      (isOdd(colIndex) ? 0 : fieldWidth / 2),
                  }}
                  className={styles.cyberFarmEvoFarms__field}
                >
                  {imageObj && (
                    <ImageWebp
                      srcSet={imageObj.srcSet}
                      src={imageObj.src}
                      alt={field.plant || ""}
                      className={styles.cyberFarmEvoFarms__fieldPlantImg}
                    />
                  )}
                </div>
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
