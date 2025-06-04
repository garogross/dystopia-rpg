import React from "react";
import HeaderBtn from "../../../layout/HeaderBtn/HeaderBtn";
import StatImg from "../../../layout/StatImg/StatImg";
import { EStats } from "../../../../constants/EStats";
import {RPGGameClanCreateIcon,
  RPGGameClanFindIcon,
} from "../../../layout/icons/RPGGame/RPGGameClanPage/RPGGameClanMain";
import { CLANS } from "../../../../dummyData/clans";
import styles from "./RPGGameClanMain.module.scss";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useNavigate } from "react-router-dom";
import {
  rpgGameClanSearchPagePath,
  rpgGameCreateClanPagePath,
  rpgGamePagePath,
} from "../../../../router/constants";
import RPGGameClansList from "../RPGGameClansList/RPGGameClansList";

const RPGGameClanMain = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <section className={styles.gameClanMain}>
      <WrapperWithFrame size="md">
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomIn}
          className={styles.gameClanMain__container}
        >
          <div className={styles.gameClanMain__header}>
            <h3 className="titleH3Italic">Создание Калана</h3>
            <HeaderBtn type="info" />
          </div>
          <p className={styles.gameClanMain__description}>
            Хочешь правил — строй свои. Клан начинается с одного — с тебя.
          </p>
          <div className={styles.gameClanMain__createBlock}>
            <h6 className={styles.gameClanMain__createBlockTitle}>
              Создание клана стоит:{" "}
            </h6>
            <div className={styles.gameClanMain__priceList}>
              <div className={styles.gameClanMain__priceItem}>
                <StatImg stat={EStats.kredit} />
                <span>120k</span>
              </div>
              <div className={styles.gameClanMain__priceItem}>
                <StatImg stat={EStats.darkMatter} />
                <span>10k</span>
              </div>
            </div>
            <button className={styles.gameClanMain__btn}>
              <div
                onClick={() =>
                  navigate(`${rpgGamePagePath}/${rpgGameCreateClanPagePath}`)
                }
                className={styles.gameClanMain__btnInner}
              >
                <RPGGameClanCreateIcon />
                <span>Создать клан</span>
              </div>
            </button>
          </div>
        </TransitionProvider>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomIn}
          delay={200}
          className={`${styles.gameClanMain__container} ${styles.gameClanMain__findClanContainer}`}
        >
          <div className={styles.gameClanMain__header}>
            <h3 className="titleH3Italic">Вступление в клан</h3>
            <HeaderBtn type="info" />
          </div>
          <p className={styles.gameClanMain__description}>
            Не просто вступи — вознеси флаг клана выше. <br />
            Пусть твой код станет частью легенды.
          </p>
          <button
            onClick={() =>
              navigate(`${rpgGamePagePath}/${rpgGameClanSearchPagePath}`)
            }
            className={styles.gameClanMain__btn}
          >
            <div className={styles.gameClanMain__btnInner}>
              <RPGGameClanFindIcon />
              <span>Найти клан</span>
            </div>
          </button>
        </TransitionProvider>
      </WrapperWithFrame>
      <WrapperWithFrame>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomIn}
          className={styles.gameClanMain__container}
          delay={300}
        >
          <div className={styles.gameClanMain__header}>
            <h3 className="titleH3Italic">Топ 5 кланов</h3>
            <HeaderBtn type="info" />
          </div>
          <RPGGameClansList
            clans={CLANS.slice(0, 5)}
            avoidAccordion
            sortDisabled
          />
        </TransitionProvider>
      </WrapperWithFrame>
    </section>
  );
};

export default RPGGameClanMain;
