import React, { useEffect, useRef } from "react";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  farmMapCityWareHouseImage,
  farmMapCityWareHouseWebpImage,
  farmMapFarmBuildImage,
  farmMapFarmBuildWebpImage,
  farmMapTasksBuildImage,
  farmMapTasksBuildWebpImage,
  farmMapFabricBuildImage,
  farmMapFabricBuildWebpImage,
  farmMapCityWebpImage,
  farmMapCityImage,
  farmMapPowerPlantBuildImage,
  farmMapPowerPlantBuildWebpImage,
  farmMapRecyclerBuildImage,
  farmMapRecyclerBuildWebpImage,
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
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  CYBERFARM_EVO_TUTORIAL_PROGRESS,
  ECyberfarmEvoTutorialActions,
} from "../../../constants/cyberfarmEvo/tutorial";
import CloneFixedElementProvider from "../../../providers/CloneFixedElementProvider/CloneFixedElementProvider";
import { updateTutorialProgress } from "../../../store/slices/cyberFarm/tutorialSlice";
import { useTooltip } from "../../../hooks/useTooltip";
import Tooltip from "../../layout/Tooltip/Tooltip";

const {
  tasksText,
  warehouseText,
  farmText,
  fabricText,
  powerPlantText,
  recyclerText,
  cityText,
} = TRANSLATIONS.cyberfarmEvo.map;
const { inDevelopmentText } = TRANSLATIONS.common;
type MapButton = {
  id?: ECyberfarmEvoTutorialActions;
  to?: string;
  btnClass: string;
  imgWebp: string;
  imgSrc: string;
  imgAlt: string;
  label: Record<string, string>;
};

const cyberFarmMapButtons: MapButton[] = [
  {
    id: ECyberfarmEvoTutorialActions.showTasks,
    to: cyberFarmSupportPagePath,
    btnClass: `tasks`,
    imgWebp: farmMapTasksBuildWebpImage,
    imgSrc: farmMapTasksBuildImage,
    imgAlt: "tasks",
    label: tasksText,
  },
  {
    id: ECyberfarmEvoTutorialActions.showWarehouse,
    to: cyberFarmWarehousePagePath,
    btnClass: `warehouse`,
    imgWebp: farmMapCityWareHouseWebpImage,
    imgSrc: farmMapCityWareHouseImage,
    imgAlt: "warehouse",
    label: warehouseText,
  },
  {
    id: ECyberfarmEvoTutorialActions.showFarm,
    to: cyberFarmFarmsPagePath,
    btnClass: `farm`,
    imgWebp: farmMapFarmBuildWebpImage,
    imgSrc: farmMapFarmBuildImage,
    imgAlt: "farm",
    label: farmText,
  },
  {
    btnClass: `fabric`,
    imgWebp: farmMapFabricBuildWebpImage,
    imgSrc: farmMapFabricBuildImage,
    imgAlt: "fabric",
    label: fabricText,
  },
  {
    btnClass: `powerPlant`,
    imgWebp: farmMapPowerPlantBuildWebpImage,
    imgSrc: farmMapPowerPlantBuildImage,
    imgAlt: "powerPlant",
    label: powerPlantText,
  },
  {
    btnClass: `recycler`,
    imgWebp: farmMapRecyclerBuildWebpImage,
    imgSrc: farmMapRecyclerBuildImage,
    imgAlt: "recycler",
    label: recyclerText,
  },
  {
    btnClass: `city`,
    imgWebp: farmMapCityWebpImage,
    imgSrc: farmMapCityImage,
    imgAlt: "city",
    label: cityText,
  },
];

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
  const { show, openTooltip } = useTooltip();
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
          {cyberFarmMapButtons.map((btn) =>
            btn.to ? (
              <Link
                id={btn.id}
                key={btn.imgAlt}
                to={`${cyberFarmEvoPagePath}/${btn.to}`}
                className={`${styles.cyberFarmEvoMap__btn} ${
                  styles[`cyberFarmEvoMap__btn_${btn.btnClass}`]
                }`}
              >
                <ImageWebp
                  srcSet={btn.imgWebp}
                  src={btn.imgSrc}
                  alt={btn.imgAlt}
                />
                <span>{btn.label[language]}</span>
              </Link>
            ) : (
              <div
                id={btn.id}
                key={btn.imgAlt}
                className={`${styles.cyberFarmEvoMap__btn} ${
                  styles[`cyberFarmEvoMap__btn_${btn.btnClass}`]
                }`}
                onClick={() => openTooltip()}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") openTooltip();
                }}
                style={{ cursor: "pointer" }}
              >
                <ImageWebp
                  srcSet={btn.imgWebp}
                  src={btn.imgSrc}
                  alt={btn.imgAlt}
                />
                <span>{btn.label[language]}</span>
              </div>
            )
          )}
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
      <Tooltip show={show} text={inDevelopmentText[language]} />
    </section>
  );
};

export default CyberFarmEvoMap;
