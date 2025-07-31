import React from "react";
import {
  ClanHeadQuatersIcon,
  StorageIcon,
  SupplyCenterIcon,
} from "../../../layout/icons/Influence/InfluenceMyClanBuids";
import MainBtn from "../../../layout/MainBtn/MainBtn";
import {
  BuildIcon,
  UpdateBuildingIcon,
} from "../../../layout/icons/Influence/Common";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { cpImage, cpImageWebp } from "../../../../assets/imageMaps";

import styles from "./InfluenceMyClanBuids.module.scss";
import { HeaderWings } from "../../../layout/icons/RPGGame/Common";
import { formatNumber } from "../../../../utils/formatNumber";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";

const {
  nameTexts,
  infoTexts,
  levelText,
  buildButtonText,
  upgradeButtonText,
  pricePrefixText,
  requiredLevelText,
} = TRANSLATIONS.influence.myClan.builds;

const builds = [
  {
    name: nameTexts.headquarters,
    level: 0,
    maxLevel: 5,
    icon: <ClanHeadQuatersIcon />,
    info: infoTexts.headquarters,
    requiredLevel: 3,
    price: 120,
  },
  {
    name: nameTexts.storage,
    level: 1,
    maxLevel: 5,
    icon: <StorageIcon />,
    info: infoTexts.storageText,
    requiredLevel: 2,
    price: 145,
  },
  {
    name: nameTexts.supplyCenter,
    level: 1,
    maxLevel: 5,
    icon: <SupplyCenterIcon />,
    info: infoTexts.supplyCenterText,
    requiredLevel: 3,
    price: 100,
  },
];

const InfluenceMyClanBuids = () => {
  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div className={styles.influenceMyClanBuids}>
      <div className={styles.influenceMyClanBuids__list}>
        {builds.map(
          (
            { name, level, maxLevel, icon, info, requiredLevel, price },
            index
          ) => (
            <TransitionProvider
              inProp={gameInited}
              style={TransitionStyleTypes.bottom}
              delay={index * 100}
              key={index}
              className={styles.influenceMyClanBuids__item}
            >
              <div className={styles.influenceMyClanBuids__iconWrapper}>
                {icon}
              </div>
              <div className={styles.influenceMyClanBuids__itemMain}>
                <div className={styles.influenceMyClanBuids__col}>
                  <div className={styles.influenceMyClanBuids__texts}>
                    <div className={styles.influenceMyClanBuids__header}>
                      <h3 className={styles.influenceMyClanBuids__nameText}>
                        {name[language]}
                      </h3>
                      <span className={styles.influenceMyClanBuids__levelText}>
                        {levelText[language]} {level}/{maxLevel}
                      </span>
                    </div>
                    {info[language].map((text, index) => (
                      <p
                        className={styles.influenceMyClanBuids__infoText}
                        key={index}
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                  <div className={styles.influenceMyClanBuids__action}>
                    <MainBtn className={styles.influenceMyClanBuids__actionBtn}>
                      {level ? <UpdateBuildingIcon /> : <BuildIcon />}
                      <span>
                        {
                          (level ? buildButtonText : upgradeButtonText)[
                            language
                          ]
                        }
                      </span>
                    </MainBtn>
                    <div className={styles.influenceMyClanBuids__actionPrice}>
                      <span>
                        {pricePrefixText[language]} {formatNumber(price)}
                      </span>
                      <ImageWebp
                        src={cpImage}
                        srcSet={cpImageWebp}
                        alt="cash points"
                        className={styles.influenceMyClanBuids__priceCpImg}
                      />
                    </div>
                  </div>
                </div>
                <p className={styles.influenceMyClanBuids__requiredLevelText}>
                  {requiredLevelText[language](requiredLevel)}
                </p>
              </div>
            </TransitionProvider>
          )
        )}
      </div>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.influenceMyClanBuids__wings}
      >
        <HeaderWings reversed />
      </TransitionProvider>
    </div>
  );
};

export default InfluenceMyClanBuids;
