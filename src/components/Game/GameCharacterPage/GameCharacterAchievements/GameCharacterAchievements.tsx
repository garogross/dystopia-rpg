import React, { useEffect, useRef, useState } from "react";
import styles from "./GameCharacterAchievements.module.scss";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import SortList, { SortItem } from "../../../layout/SortList/SortList";
import {
  achievment1Image,
  achievment2Image,
  achievment3Image,
  achievment4Image,
  achievment5Image,
  achievment6Image,
  achievment7Image,
  achievment8Image,
  achievment9Image,
  achievment10Image,
  achievment11Image,
  achievment12Image,
  achievment13Image,
  achievment14Image,
  achievment15Image,
  achievment16Image,
  achievment17Image,
  achievment18Image,
} from "../../../../assets/images";
import GameCharacterAchievmentStatusIcon from "../../../layout/icons/game/GameCharacterPage/GameCharacterAchievment/GameCharacterAchievmentStatusIcon";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider from "../../../../providers/TransitionProvider";
import { TransitionStyleTypes } from "../../../../providers/TransitionProvider";

const data = [
  {
    image: achievment1Image,
    received: true,
    name: "Боевая закалка",
  },
  {
    image: achievment2Image,
    received: true,
    name: "Неудачник по жизни",
  },
  {
    image: achievment3Image,
    received: true,
    name: "Без права на отступление",
  },
  {
    image: achievment4Image,
    received: true,
    name: "Горячий привет",
  },
  {
    image: achievment5Image,
    received: true,
    name: "Стальные кулаки",
  },
  {
    image: achievment6Image,
    received: true,
    name: "Урок боли",
  },
  {
    image: achievment7Image,
    name: "На лезвии",
  },
  {
    image: achievment8Image,
    name: "Снайпер по призванию",
  },
  {
    image: achievment9Image,
    name: "Тень в бою",
  },
  {
    image: achievment10Image,
    name: "Идеальный момент",
  },
  {
    image: achievment11Image,
    name: "Исследователь глубин",
  },
  {
    image: achievment12Image,
    name: "Пыльный воин",
  },
  {
    image: achievment13Image,
    name: "Ад под ногами",
  },
  {
    image: achievment14Image,
    name: "Чёрная метка",
  },
  {
    image: achievment15Image,
    name: "Живая легенда",
  },
  {
    image: achievment16Image,
    name: "Ходячий труп",
  },
  {
    image: achievment17Image,
    name: "Киберберсерк",
  },
  {
    image: achievment18Image,
    name: "Жнец ошибок",
  },
];

const sortItems: SortItem[] = [
  {
    id: "all",
    name: "Все",
  },
  {
    id: "received",
    name: "Полученные",
  },
  {
    id: "notReceived",
    name: "Не полученные",
  },
];

const GameCharacterAchievements: React.FC = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [textsToAnimate, setTextsToAnimate] = useState<{
    [key: string]: boolean;
  }>({});
  const textRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});

  useEffect(() => {
    const checkTextWidths = () => {
      const newTextsToAnimate: { [key: string]: boolean } = {};

      Object.entries(textRefs.current).forEach(([key, element]) => {
        if (element) {
          const wrapper = element.parentElement;
          if (wrapper) {
            const isTextWider = element.scrollWidth > wrapper.clientWidth;
            newTextsToAnimate[key] = isTextWider;
          }
        }
      });

      setTextsToAnimate(newTextsToAnimate);
    };

    checkTextWidths();
    window.addEventListener("resize", checkTextWidths);

    return () => {
      window.removeEventListener("resize", checkTextWidths);
    };
  }, []);

  return (
    <WrapperWithFrame size="lg" className={styles.gameCharacterAchievements}>
      <div className={styles.gameCharacterAchievements__main}>
        <SortList items={sortItems} onChange={() => {}} activeSort={""} />

        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.bottom}
          height={100}
          className={styles.gameCharacterAchievements__list}
        >
          {data.map((item, index) => (
            <button
              key={index}
              className={styles.gameCharacterAchievements__listItem}
            >
              <div className={styles.gameCharacterAchievements__inner}>
                <img
                  src={item.image}
                  alt="achievement"
                  className={styles.gameCharacterAchievements__img}
                />
                <div className={styles.gameCharacterAchievements__textWrapper}>
                  {textsToAnimate[item.name] && (
                    <span
                      className={`${styles.gameCharacterAchievements__text} ${styles.gameCharacterAchievements__text_hidden}`}
                    >
                      {item.name}
                    </span>
                  )}
                  <span
                    ref={(el) => (textRefs.current[item.name] = el)}
                    className={`${styles.gameCharacterAchievements__text} ${
                      textsToAnimate[item.name]
                        ? styles.gameCharacterAchievements__text_animated
                        : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <div
                  className={`${
                    styles.gameCharacterAchievements__listItemStatus
                  } ${
                    item.received
                      ? styles.gameCharacterAchievements__listItemStatus_active
                      : ""
                  }`}
                >
                  <GameCharacterAchievmentStatusIcon />
                </div>
              </div>
            </button>
          ))}
        </TransitionProvider>
      </div>
    </WrapperWithFrame>
  );
};

export default GameCharacterAchievements;
