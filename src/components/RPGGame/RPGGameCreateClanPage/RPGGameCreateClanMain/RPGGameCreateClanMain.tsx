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
} from "../../../../assets/imageMaps";
import {RPGGameCreateClanAddLogoIcon,RPGGameCreateClanSubmitcon} from "../../../layout/icons/RPGGame/RPGGameCreateClanPage";
import {HeaderWings,ArrowIcon} from "../../../layout/icons/RPGGame/Common";
import Checkbox from "../../../layout/Checkbox/Checkbox";
import StatImg from "../../../layout/StatImg/StatImg";
import { EStats } from "../../../../constants/EStats";

import styles from "./RPGGameCreateClanMain.module.scss";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useNavigate } from "react-router-dom";
import {
  rpgGameCreateClanPagePath,
  rpgGamePagePath,
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

const RPGGameCreateClanMain = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [logoListOpened, setLogoListOpened] = useState(false);
  return (
    <WrapperWithFrame size="lg" className={styles.rpgGameCreateClanMain}>
      <div className={styles.rpgGameCreateClanMain__container}>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.top}
          className={styles.rpgGameCreateClanMain__header}
        >
          <h3 className="titleH3Italic">Создание Калана</h3>
          <HeaderBtn
            type="close"
            onClick={() =>
              navigate(`${rpgGamePagePath}/${rpgGameCreateClanPagePath}`)
            }
          />
        </TransitionProvider>
        <MainInput placeholder="Название клана..." />
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomIn}
          className={styles.rpgGameCreateClanMain__logoSelect}
        >
          <h5 className={styles.rpgGameCreateClanMain__title}>Выберите эмблему</h5>
          <div
            className={`${styles.rpgGameCreateClanMain__logoList} ${
              logoListOpened ? styles.rpgGameCreateClanMain__logoList_opened : ""
            }`}
          >
            <button className={styles.rpgGameCreateClanMain__logoListAddBtn}>
              <RPGGameCreateClanAddLogoIcon />
            </button>
            {logos.map((logo, index) => (
              <button
                key={index}
                className={styles.rpgGameCreateClanMain__logoListItem}
              >
                <img
                  src={logo}
                  alt="clan logo"
                  className={styles.rpgGameCreateClanMain__logoListImg}
                />
              </button>
            ))}
          </div>
          <button
            className={styles.rpgGameCreateClanMain__showMoreBtn}
            onClick={() => setLogoListOpened((prev) => !prev)}
          >
            <div className={styles.rpgGameCreateClanMain__showMoreBtnWings}>
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
          className={styles.rpgGameCreateClanMain__description}
        >
          <h5 className={styles.rpgGameCreateClanMain__title}>Описание</h5>
          <MainInput
            className={styles.rpgGameCreateClanMain__descriptionInput}
            asTextarea
            placeholder="Поле для ввода краткого, описания клана: его цели, идеологии, посыла миру. Это не просто текст — это заявление..."
          />
        </TransitionProvider>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomIn}
          delay={300}
          className={styles.rpgGameCreateClanMain__type}
        >
          <h5 className={styles.rpgGameCreateClanMain__title}>Тип клана</h5>
          <div className={styles.rpgGameCreateClanMain__typeList}>
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
          className={styles.rpgGameCreateClanMain__price}
        >
          <h5 className={styles.rpgGameCreateClanMain__title}>
            Создание клана стоит:{" "}
          </h5>
          <div className={styles.rpgGameCreateClanMain__priceList}>
            <div className={styles.rpgGameCreateClanMain__priceItem}>
              <StatImg stat={EStats.kredit} />
              <span className={styles.rpgGameCreateClanMain__priceItemValue}>
                120k
              </span>
            </div>
            <div className={styles.rpgGameCreateClanMain__priceItem}>
              <StatImg stat={EStats.darkMatter} />
              <span className={styles.rpgGameCreateClanMain__priceItemValue}>
                10k
              </span>
            </div>
          </div>
          <button className={styles.rpgGameCreateClanMain__submitBtn}>
            <div className={styles.rpgGameCreateClanMain__submitBtnInner}>
              <RPGGameCreateClanSubmitcon />
              <span>Сформировать клан</span>
            </div>
          </button>
        </TransitionProvider>
      </div>
    </WrapperWithFrame>
  );
};

export default RPGGameCreateClanMain;
