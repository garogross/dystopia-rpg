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

const CyberFarmEvoMap = () => {
  return (
    <section className={styles.cyberFarmEvoMap}>
      <button
        className={`${styles.cyberFarmEvoMap__btn} ${styles.cyberFarmEvoMap__btn_tasks}`}
      >
        <ImageWebp
          srcSet={farmMapTasksBuildWebpImage}
          src={farmMapTasksBuildImage}
          alt={"tasks"}
        />
        <span>Задания</span>
      </button>
      <button
        className={`${styles.cyberFarmEvoMap__btn} ${styles.cyberFarmEvoMap__btn_warehouse}`}
      >
        <ImageWebp
          srcSet={farmMapCityWareHouseWebpImage}
          src={farmMapCityWareHouseImage}
          alt={"warehouse"}
        />
        <span>Склад</span>
      </button>
      <button
        className={`${styles.cyberFarmEvoMap__btn} ${styles.cyberFarmEvoMap__btn_farm}`}
      >
        <ImageWebp
          srcSet={farmMapFarmBuildWebpImage}
          src={farmMapFarmBuildImage}
          alt={"farm"}
        />
        <span>Ферма</span>
      </button>
    </section>
  );
};

export default CyberFarmEvoMap;
