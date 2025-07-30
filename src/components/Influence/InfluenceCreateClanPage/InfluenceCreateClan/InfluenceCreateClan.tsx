import React, { ReactNode, useState } from "react";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import MainInput from "../../../layout/MainInput/MainInput";
import {
  ArrowIcon,
  CancelIcon,
  DotslineLong,
} from "../../../layout/icons/Common";
import { INFLUENCE_CLAN_EMBLEMS } from "../../../../constants/influence/influenceClanEmblems";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  PremiumEmblemicon,
  PublicIcon,
  PrivateIcon,
} from "../../../layout/icons/Influence/InfluenceCreateClan";
import Select from "../../../layout/Select/Select";
import { ELanguages } from "../../../../constants/ELanguages";
import styles from "./InfluenceCreateClan.module.scss";
import RadioList from "../../../layout/RadioList/RadioList";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";
import { CreateClanIcon } from "../../../layout/icons/Influence/InfluenceClans";
import { HeaderWings } from "../../../layout/icons/RPGGame/Common";

const Label = ({ children }: { children: ReactNode }) => (
  <p className={styles.influenceCreateClan__label}>
    <span>{children}</span>
    <DotslineLong preserveAspectRatio />
  </p>
);

const InfluenceCreateClan = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [emblemsListOpened, setEmblemsListOpened] = useState(false);
  return (
    <section className={`container ${styles.influenceCreateClan}`}>
      <TitleH3 wingsReverse={false} hideDotline>
        клан
      </TitleH3>
      <form className={styles.influenceCreateClan__form}>
        <div className={styles.influenceCreateClan__main}>
          <h3 className={styles.influenceCreateClan__titleText}>
            Создание Клана
          </h3>
          <MainInput
            placeholder="Название клана"
            className={styles.influenceCreateClan__nameInput}
          />
          <Label>Выберите эмблему</Label>
          <div
            className={`${styles.influenceCreateClan__emblems} ${
              emblemsListOpened
                ? styles.influenceCreateClan__emblems_opened
                : ""
            }`}
          >
            {Object.entries(INFLUENCE_CLAN_EMBLEMS).map(([key, value]) => (
              <button
                type="button"
                key={key}
                className={styles.influenceCreateClan__emblemBtn}
              >
                <ImageWebp
                  src={value.src}
                  srcSet={value.srcSet}
                  alt={key}
                  className={styles.influenceCreateClan__emblemImg}
                />
                {value?.premium && <PremiumEmblemicon />}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.influenceCreateClan__togleEmblemsListBtn}
            onClick={() => setEmblemsListOpened((prev) => !prev)}
          >
            <div
              className={styles.influenceCreateClan__toggleEmblemsBtnDotsLine}
            >
              <DotslineLong preserveAspectRatio />
            </div>
            <span>Показать еще</span>
            <ArrowIcon rotate={emblemsListOpened} />
            <div
              className={styles.influenceCreateClan__toggleEmblemsBtnDotsLine}
            >
              <DotslineLong preserveAspectRatio />
            </div>
          </button>
          <MainInput
            asTextarea
            placeholder="Описание клана"
            className={styles.influenceCreateClan__textArea}
          />
          <Label>Выберите основной язык клана</Label>
          <div className={styles.influenceCreateClan__languageSelect}>
            <Select
              name={{ en: "Язык", ru: "Язык" }}
              keyName={"language"}
              options={[
                {
                  value: ELanguages.en,
                  label: "Русский",
                },
                {
                  value: ELanguages.ru,
                  label: "Английский",
                },
              ]}
              value={"Русский"}
              onChange={() => {}}
            />
            <p className={styles.influenceCreateClan__languageSelectText}>
              Игроки смогут фильтровать кланы по языку при поиске
            </p>
          </div>
          <Label>Тип клана</Label>
          <div className={styles.influenceCreateClan__typeSlect}>
            <div className={styles.influenceCreateClan__typeSlectCol}>
              <RadioList
                arr={[
                  {
                    value: "public",
                    label: (
                      <>
                        <span>Публичный</span>
                        <PublicIcon />
                      </>
                    ),
                  },
                ]}
                onChange={() => {}}
                name={"public"}
                checked={""}
              />
              <p
                className={styles.influenceCreateClan__typeSlectDescriptiontext}
              >
                Любой игрок может присоединиться без заявки
              </p>
            </div>
            <div className={styles.influenceCreateClan__typeSlectCol}>
              <RadioList
                arr={[
                  {
                    value: "public",
                    label: (
                      <>
                        <span>Закрытый</span>
                        <PrivateIcon />
                      </>
                    ),
                  },
                ]}
                onChange={() => {}}
                name={"public"}
                checked={""}
              />
              <p
                className={styles.influenceCreateClan__typeSlectDescriptiontext}
              >
                Игроки должны подавать заявки для вступления
              </p>
            </div>
          </div>
          <p className={styles.influenceCreateClan__priceText}>
            ! Для создания клана необходимо заплатить взнос в размере: 1000
          </p>
        </div>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomOut}
          className={styles.influenceCreateClan__footer}
        >
          <button className={styles.influenceCreateClan__footerBtn}>
            <div className={styles.influenceCreateClan__footerBtnInner}>
              <CancelIcon />
              <span>Отмена</span>
            </div>
          </button>
          <button className={styles.influenceCreateClan__footerBtn}>
            <div className={styles.influenceCreateClan__footerBtnInner}>
              <CreateClanIcon />
              <span>Создать клан</span>
            </div>
          </button>
          <div className={styles.influenceCreateClan__wings}>
            <HeaderWings reversed />
          </div>
        </TransitionProvider>
      </form>
    </section>
  );
};

export default InfluenceCreateClan;
