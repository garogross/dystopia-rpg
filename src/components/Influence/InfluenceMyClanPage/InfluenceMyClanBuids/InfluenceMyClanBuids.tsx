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

const builds = [
  {
    name: "ШТАБ КЛАНА",
    level: 0,
    maxLevel: 5,
    icon: <ClanHeadQuatersIcon />,
    info: ["+ Макс. игроков в клане", "+ Макс. уровень других зданий"],
    requiredLevel: 3,
    price: 120,
  },
  {
    name: "ХРАНИЛИЩЕ",
    level: 1,
    maxLevel: 5,
    icon: <StorageIcon />,
    info: ["+ Макс. запас ОД за игру для восстановления"],
    requiredLevel: 2,
    price: 145,
  },
  {
    name: "ЦЕТР СНАБЖЕНИЯ",
    level: 1,
    maxLevel: 5,
    icon: <SupplyCenterIcon />,
    info: ["Добавляет ОД в хранилище"],
    requiredLevel: 3,
    price: 100,
  },
];

const InfluenceMyClanBuids = () => {
  return (
    <div className={styles.influenceMyClanBuids}>
      <div className={styles.influenceMyClanBuids__list}>
        {builds.map(
          (
            { name, level, maxLevel, icon, info, requiredLevel, price },
            index
          ) => (
            <div key={index} className={styles.influenceMyClanBuids__item}>
              <div className={styles.influenceMyClanBuids__iconWrapper}>
                {icon}
              </div>
              <div className={styles.influenceMyClanBuids__itemMain}>
                <div className={styles.influenceMyClanBuids__col}>
                  <div className={styles.influenceMyClanBuids__texts}>
                    <div className={styles.influenceMyClanBuids__header}>
                      <h3 className={styles.influenceMyClanBuids__nameText}>
                        {name}
                      </h3>
                      <span className={styles.influenceMyClanBuids__levelText}>
                        Ур. {level}/{maxLevel}
                      </span>
                    </div>
                    {info.map((text, index) => (
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
                      <span>{level ? "Строить" : "Улучшить"}</span>
                    </MainBtn>
                    <div className={styles.influenceMyClanBuids__actionPrice}>
                      <span>за {formatNumber(price)}</span>
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
                  Для постройки требуется {requiredLevel}-
                  {requiredLevel === 2 ? "ой" : "ий"} ур. клана
                </p>
              </div>
            </div>
          )
        )}
      </div>
      <div className={styles.influenceMyClanBuids__wings}>
        <HeaderWings reversed />
      </div>
    </div>
  );
};

export default InfluenceMyClanBuids;
