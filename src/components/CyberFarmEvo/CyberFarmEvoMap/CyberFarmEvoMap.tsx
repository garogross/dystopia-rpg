import React from "react";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  farmMapCityWareHouseImage,
  farmMapCityWareHouseWebpImage,
  farmMapFarmBuildImage,
  farmMapFarmBuildWebpImage,
  farmMapTasksBuildImage,
  farmMapTasksBuildWebpImage,
} from "../../../assets/imageMaps";
import styles from "./CyberFarmEvoMap.module.scss";
import { Link } from "react-router-dom";
import {
  cyberFarmEvoPagePath,
  cyberFarmFarmsPagePath,
  cyberFarmSupportPagePath,
  cyberFarmWarehousePagePath,
} from "../../../router/constants";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";

const { tasksText, warehouseText, farmText } = TRANSLATIONS.cyberfarmEvo.map;

const CyberFarmEvoMap = () => {
  const language = useAppSelector((state) => state.ui.language);

  return (
    <section className={styles.cyberFarmEvoMap}>
      <div className={styles.cyberFarmEvoMap__sky}></div>
      <div className={styles.cyberFarmEvoMap__main}>
        <div className={styles.cyberFarmEvoMap__mainInner}>
          {/* <ImageWebp
            srcSet={farmMapMainBgWebpImage}
            src={farmMapMainBgImage}
            alt={"map"}
            className={styles.cyberFarmEvoMap__mainImg}
          /> */}
          <Link
            to={`${cyberFarmEvoPagePath}/${cyberFarmSupportPagePath}`}
            className={`${styles.cyberFarmEvoMap__btn} ${styles.cyberFarmEvoMap__btn_tasks}`}
          >
            <ImageWebp
              srcSet={farmMapTasksBuildWebpImage}
              src={farmMapTasksBuildImage}
              alt={"tasks"}
            />
            <span>{tasksText[language]}</span>
          </Link>
          <Link
            to={`${cyberFarmEvoPagePath}/${cyberFarmWarehousePagePath}`}
            className={`${styles.cyberFarmEvoMap__btn} ${styles.cyberFarmEvoMap__btn_warehouse}`}
          >
            <ImageWebp
              srcSet={farmMapCityWareHouseWebpImage}
              src={farmMapCityWareHouseImage}
              alt={"warehouse"}
            />
            <span>{warehouseText[language]}</span>
          </Link>
          <Link
            to={`${cyberFarmEvoPagePath}/${cyberFarmFarmsPagePath}`}
            className={`${styles.cyberFarmEvoMap__btn} ${styles.cyberFarmEvoMap__btn_farm}`}
          >
            <ImageWebp
              srcSet={farmMapFarmBuildWebpImage}
              src={farmMapFarmBuildImage}
              alt={"farm"}
            />
            <span>{farmText[language]}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CyberFarmEvoMap;
