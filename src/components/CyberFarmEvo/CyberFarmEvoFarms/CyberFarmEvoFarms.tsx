import React, { useEffect, useRef, useState } from "react";
import MainBtn from "../../layout/MainBtn/MainBtn";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { adImage, adImageWebp } from "../../../assets/imageMaps";
import { MapIcon } from "../../layout/icons/CyberFarmEvo/Farms";

import styles from "./CyberFarmEvoFarms.module.scss";

const FIELD_HEIGHT_ASPECT_RATIO = 3.4;

interface IFarmField {}

const isOdd = (i: number) => !(i % 2);

const CyberFarmEvoFarms = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fields, setFields] = useState<IFarmField[][]>([]);
  const [fieldWidth, setFieldWidth] = useState(0);
  const fieldHeight = fieldWidth / FIELD_HEIGHT_ASPECT_RATIO;
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

      const initialFields = Array.from({ length: colsLength }, (_, i) => {
        return Array.from({ length: isOdd(i) ? 4 : 3 }, () => ({}));
      });

      setFields(initialFields);
    }
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
            col.map((field, fieldIndex) => (
              <div
                key={`${colIndex}-${fieldIndex}`}
                style={{
                  top: colIndex * fieldHeight,
                  left:
                    fieldIndex * fieldWidth +
                    (isOdd(colIndex) ? 0 : fieldWidth / 2),
                }}
                className={styles.cyberFarmEvoFarms__field}
              ></div>
            ))
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
