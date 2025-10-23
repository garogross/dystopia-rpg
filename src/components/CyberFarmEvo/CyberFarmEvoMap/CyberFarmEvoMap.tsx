import React, { useEffect, useRef } from "react";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  farmMapCityWareHouseImage,
  farmMapCityWareHouseWebpImage,
  farmMapFabricBuildImage,
  farmMapFabricBuildWebpImage,
  farmMapFarmBuildImage,
  farmMapFarmBuildWebpImage,
  farmMapTasksBuildImage,
  farmMapTasksBuildWebpImage,
} from "../../../assets/imageMaps";
import styles from "./CyberFarmEvoMap.module.scss";
import { Link } from "react-router-dom";
import {
  cyberFarmEvoPagePath,
  cyberFarmFabricPagePath,
  cyberFarmFarmsPagePath,
  cyberFarmSupportPagePath,
  cyberFarmWarehousePagePath,
} from "../../../router/constants";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  CYBERFARM_EVO_TUTORIAL_PROGRESS,
  ECyberfarmEvoTutorialActions,
} from "../../../constants/cyberfarmEvo/tutorial";
import CloneFixedElementProvider from "../../../providers/CloneFixedElementProvider/CloneFixedElementProvider";
import { updateTutorialProgress } from "../../../store/slices/cyberFarm/tutorialSlice";

const { tasksText, fabricText, warehouseText, farmText } =
  TRANSLATIONS.cyberfarmEvo.map;

const CyberFarmEvoMap = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const tutorialInProgress = useAppSelector(
    (state) => state.cyberfarm.tutorial.tutorialInProgress
  );
  const tutorialProgressIndex = useAppSelector(
    (state) => state.cyberfarm.tutorial.tutorialProgressIndex
  );
  const tutorialSlidetimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (tutorialSlidetimeoutRef.current) {
      clearTimeout(tutorialSlidetimeoutRef.current);
    }
    if (tutorialInProgress) {
      const curProgress =
        CYBERFARM_EVO_TUTORIAL_PROGRESS[tutorialProgressIndex];
      if (curProgress?.action) {
        tutorialSlidetimeoutRef.current = setTimeout(() => {
          dispatch(updateTutorialProgress());
        }, 2000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorialInProgress, tutorialProgressIndex]);

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
            id={ECyberfarmEvoTutorialActions.showTasks}
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
            id={ECyberfarmEvoTutorialActions.showTasks}
            to={`${cyberFarmEvoPagePath}/${cyberFarmFabricPagePath}`}
            className={`${styles.cyberFarmEvoMap__btn} ${styles.cyberFarmEvoMap__btn_fabric}`}
          >
            <ImageWebp
              srcSet={farmMapFabricBuildImage}
              src={farmMapFabricBuildWebpImage}
              alt={"fabric"}
            />
            <span>{fabricText[language]}</span>
          </Link>
          <Link
            id={ECyberfarmEvoTutorialActions.showWarehouse}
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
            id={ECyberfarmEvoTutorialActions.showFarm}
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
      <CloneFixedElementProvider
        id={ECyberfarmEvoTutorialActions.showTasks}
        asDiv
        style={{ bottom: 0, right: 0 }}
        onClick={() => {}}
      />
      <CloneFixedElementProvider
        id={ECyberfarmEvoTutorialActions.showWarehouse}
        asDiv
        style={{ bottom: 0, right: 0 }}
        onClick={() => {}}
      />
      <CloneFixedElementProvider
        id={ECyberfarmEvoTutorialActions.showFarm}
        asDiv
        style={{ bottom: 0, right: 0 }}
        onClick={() => {}}
      />
    </section>
  );
};

export default CyberFarmEvoMap;
