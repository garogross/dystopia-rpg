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

const CyberFarmEvoMap = () => {
  return (
    <section className={styles.cyberFarmEvoMap}>
      <Link
        to={`${cyberFarmEvoPagePath}/${cyberFarmSupportPagePath}`}
        className={`${styles.cyberFarmEvoMap__btn} ${styles.cyberFarmEvoMap__btn_tasks}`}
      >
        <ImageWebp
          srcSet={farmMapTasksBuildWebpImage}
          src={farmMapTasksBuildImage}
          alt={"tasks"}
        />
        <span>Задания</span>
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
        <span>Склад</span>
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
        <span>Ферма</span>
      </Link>
    </section>
  );
};

export default CyberFarmEvoMap;
