import React, { useState } from "react";
import styles from "./RPGGameCharacterSkins.module.scss";
import {
  personModel1Image,
  skin11Image,
  skin10Image,
  skin1Image,
  skin2Image,
  skin3Image,
  skin4Image,
  skin5Image,
  skin6Image,
  skin7Image,
  skin8Image,
  skin9Image,
  skin12Image,
} from "../../../../assets/imageMaps";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import SortList, { SortItem } from "../../../layout/SortList/SortList";
import {SelectMarkIcon} from "../../../layout/icons/RPGGame/Common";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";

const sortItems: SortItem[] = [
  {
    id: "sex",
    name: "Пол",
  },
  {
    id: "currency",
    name: "Валюта",
  },
  {
    id: "availability",
    name: "Доступность",
  },
];

const data = [
  {
    id: "skin1",
    img: skin1Image,
  },
  {
    id: "skin2",
    img: skin2Image,
  },
  {
    id: "skin3",
    img: skin3Image,
  },
  {
    id: "skin4",
    img: skin4Image,
  },
  {
    id: "skin5",
    img: skin5Image,
  },
  {
    id: "skin6",
    img: skin6Image,
  },
  {
    id: "skin7",
    img: skin7Image,
  },
  {
    id: "skin8",
    img: skin8Image,
  },
  {
    id: "skin9",
    img: skin9Image,
  },
  {
    id: "skin10",
    img: skin10Image,
  },
  {
    id: "skin11",
    img: skin11Image,
  },
  {
    id: "skin12",
    img: skin12Image,
  },
];

const RPGGameCharacterSkins: React.FC<{ opened: boolean }> = ({ opened }) => {
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <div className={styles.rpgGameCharacterSkins}>
      <TransitionProvider
        style={TransitionStyleTypes.zoomIn}
        inProp={gameInited}
        className={styles.rpgGameCharacterSkins__person}
      >
        <img
          src={personModel1Image}
          alt="model"
          className={styles.rpgGameCharacterSkins__personImg}
        />
      </TransitionProvider>
      <WrapperWithFrame
        className={`${styles.rpgGameCharacterSkins__list} ${
          opened ? styles.rpgGameCharacterSkins__list_opened : ""
        }`}
      >
        <div className={styles.rpgGameCharacterSkins__listWrapper}>
          <SortList items={sortItems} onChange={() => {}} activeSort={""} />
          <TransitionProvider
            style={TransitionStyleTypes.bottom}
            inProp={gameInited}
            className={styles.rpgGameCharacterSkins__listMain}
          >
            {data.map((item) => (
              <button
                key={item.id}
                className={styles.rpgGameCharacterSkins__listItem}
                onClick={() => setSelectedSkin(item.id)}
              >
                <img
                  src={item.img}
                  alt={item.id}
                  className={styles.rpgGameCharacterSkins__listItemImg}
                />
                <TransitionProvider
                  style={TransitionStyleTypes.opacity}
                  inProp={selectedSkin === item.id}
                  className={styles.rpgGameCharacterSkins__selectedMark}
                >
                  <SelectMarkIcon />
                </TransitionProvider>
              </button>
            ))}
          </TransitionProvider>
        </div>
      </WrapperWithFrame>
    </div>
  );
};

export default RPGGameCharacterSkins;
