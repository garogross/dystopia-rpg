import React, { useState } from "react";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import HeaderBtn from "../../../layout/HeaderBtn/HeaderBtn";
import MainInput from "../../../layout/MainInput/MainInput";

import {
  clan1Image,
  clan2Image,
  clan3Image,
  clan4Image,
  clan5Image,
  clan6Image,
  clan7Image,
  clan8Image,
  clan9Image,
  clan10Image,
  clan11Image,
} from "../../../../assets/images";
import GameCreateClanAddLogoIcon from "../../../layout/icons/game/GameCreateClanPage/GameCreateClanAddLogoIcon";
import HeaderWings from "../../../layout/icons/game/Common/HeaderWings";
import ArrowIcon from "../../../layout/icons/game/Common/ArrowIcon";
import Checkbox from "../../../layout/Checkbox/Checkbox";
import StatImg from "../../../layout/StatImg/StatImg";
import { EStats } from "../../../../constants/EStats";
import GameCreateClanSubmitcon from "../../../layout/icons/game/GameCreateClanPage/GameCreateClanSubmitcon";

import styles from "./GameCreateClanMain.module.scss";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useNavigate } from "react-router-dom";
import {
  gameCreateClanPagePath,
  gamePagePath,
} from "../../../../router/constants";

const logos = [
  clan1Image,
  clan2Image,
  clan3Image,
  clan4Image,
  clan5Image,
  clan6Image,
  clan7Image,
  clan8Image,
  clan9Image,
  clan10Image,
  clan11Image,
  clan1Image,
  clan2Image,
  clan3Image,
  clan4Image,
  clan5Image,
  clan6Image,
  clan7Image,
  clan8Image,
  clan9Image,
  clan10Image,
  clan11Image,
];

const GameCreateClanMain = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [logoListOpened, setLogoListOpened] = useState(false);
  return (
    <WrapperWithFrame size="lg" className={styles.gameCreateClanMain}>
      <div className={styles.gameCreateClanMain__container}>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.top}
          className={styles.gameCreateClanMain__header}
        >
          <h3 className="titleH3Italic">Создание Калана</h3>
          <HeaderBtn
            type="close"
            onClick={() =>
              navigate(`${gamePagePath}/${gameCreateClanPagePath}`)
            }
          />
        </TransitionProvider>
        <MainInput placeholder="Название клана..." />
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomIn}
          className={styles.gameCreateClanMain__logoSelect}
        >
          <h5 className={styles.gameCreateClanMain__title}>Выберите эмблему</h5>
          <div
            className={`${styles.gameCreateClanMain__logoList} ${
              logoListOpened ? styles.gameCreateClanMain__logoList_opened : ""
            }`}
          >
            <button className={styles.gameCreateClanMain__logoListAddBtn}>
              <GameCreateClanAddLogoIcon />
            </button>
            {logos.map((logo, index) => (
              <button
                key={index}
                className={styles.gameCreateClanMain__logoListItem}
              >
                <img
                  src={logo}
                  alt="clan logo"
                  className={styles.gameCreateClanMain__logoListImg}
                />
              </button>
            ))}
          </div>
          <button
            className={styles.gameCreateClanMain__showMoreBtn}
            onClick={() => setLogoListOpened((prev) => !prev)}
          >
            <div className={styles.gameCreateClanMain__showMoreBtnWings}>
              <HeaderWings reversed />
            </div>
            <span>Показать больше</span>
            <ArrowIcon rotate={logoListOpened} />
          </button>
        </TransitionProvider>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomIn}
          delay={200}
          className={styles.gameCreateClanMain__description}
        >
          <h5 className={styles.gameCreateClanMain__title}>Описание</h5>
          <MainInput
          className={styles.gameCreateClanMain__descriptionInput}
            asTextarea
            placeholder="Поле для ввода краткого, описания клана: его цели, идеологии, посыла миру. Это не просто текст — это заявление..."
          />
        </TransitionProvider>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomIn}
          delay={300}
          className={styles.gameCreateClanMain__type}
        >
          <h5 className={styles.gameCreateClanMain__title}>Тип клана</h5>
          <div className={styles.gameCreateClanMain__typeList}>
            <Checkbox onChange={() => {}} value={""} name={""}>
              Закрытый (вход по заявлению)
            </Checkbox>
            <Checkbox onChange={() => {}} value={""} name={""}>
              Общедоступный
            </Checkbox>
          </div>
        </TransitionProvider>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomIn}
          delay={400}
          className={styles.gameCreateClanMain__price}
        >
          <h5 className={styles.gameCreateClanMain__title}>
            Создание клана стоит:{" "}
          </h5>
          <div className={styles.gameCreateClanMain__priceList}>
            <div className={styles.gameCreateClanMain__priceItem}>
              <StatImg stat={EStats.kredit} />
              <span className={styles.gameCreateClanMain__priceItemValue}>
                120k
              </span>
            </div>
            <div className={styles.gameCreateClanMain__priceItem}>
              <StatImg stat={EStats.darkMatter} />
              <span className={styles.gameCreateClanMain__priceItemValue}>
                10k
              </span>
            </div>
          </div>
          <button className={styles.gameCreateClanMain__submitBtn}>
            <div className={styles.gameCreateClanMain__submitBtnInner}>
              <GameCreateClanSubmitcon />
              <span>Сформировать клан</span>
            </div>
          </button>
        </TransitionProvider>
      </div>
    </WrapperWithFrame>
  );
};

export default GameCreateClanMain;
