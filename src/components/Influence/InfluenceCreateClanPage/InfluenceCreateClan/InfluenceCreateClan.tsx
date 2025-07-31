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
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";

const {
  titleText,
  subtitleText,
  namePlaceholder,
  selectEmblemLabel,
  showMoreText,
  collapseText,
  descriptionPlaceholder,
  selectLanguageLabel,
  languageSelectName,
  languageSelectHint,
  selectTypeLabel,
  typePublic,
  typePrivate,
  typePublicDescription,
  typePrivateDescription,
  creationFeeText,
  cancelButtonText,
  createButtonText,
} = TRANSLATIONS.influence.createClan;

const Label = ({ children }: { children: ReactNode }) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.zoomIn}
      className={styles.influenceCreateClan__label}
    >
      <span>{children}</span>
      <DotslineLong preserveAspectRatio />
    </TransitionProvider>
  );
};

const InfluenceCreateClan = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const [emblemsListOpened, setEmblemsListOpened] = useState(false);

  return (
    <section className={`container ${styles.influenceCreateClan}`}>
      <TitleH3 wingsReverse={false} hideDotline>
        {titleText[language]}
      </TitleH3>
      <form className={styles.influenceCreateClan__form}>
        <div className={styles.influenceCreateClan__main}>
          <h3 className={styles.influenceCreateClan__titleText}>
            {subtitleText[language]}
          </h3>
          <MainInput
            placeholder={namePlaceholder[language]}
            className={styles.influenceCreateClan__nameInput}
          />
          <Label>{selectEmblemLabel[language]}</Label>
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.bottom}
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
          </TransitionProvider>
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
            <span>
              {(emblemsListOpened ? collapseText : showMoreText)[language]}
            </span>
            <ArrowIcon rotate={emblemsListOpened} />
            <div
              className={styles.influenceCreateClan__toggleEmblemsBtnDotsLine}
            >
              <DotslineLong preserveAspectRatio />
            </div>
          </button>
          <MainInput
            asTextarea
            placeholder={descriptionPlaceholder[language]}
            className={styles.influenceCreateClan__textArea}
          />
          <Label>{selectLanguageLabel[language]}</Label>
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.bottom}
            className={styles.influenceCreateClan__languageSelect}
          >
            <Select
              name={languageSelectName}
              keyName={"language"}
              options={[
                {
                  value: ELanguages.en,
                  label: "Русский",
                },
                {
                  value: ELanguages.ru,
                  label: "English",
                },
              ]}
              value={"Русский"}
              onChange={() => {}}
            />
            <p className={styles.influenceCreateClan__languageSelectText}>
              {languageSelectHint[language]}
            </p>
          </TransitionProvider>
          <Label>{selectTypeLabel[language]}</Label>
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.bottom}
            className={styles.influenceCreateClan__typeSlect}
          >
            <div className={styles.influenceCreateClan__typeSlectCol}>
              <RadioList
                arr={[
                  {
                    value: "public",
                    label: (
                      <>
                        <span>{typePublic[language]}</span>
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
                {typePublicDescription[language]}
              </p>
            </div>
            <div className={styles.influenceCreateClan__typeSlectCol}>
              <RadioList
                arr={[
                  {
                    value: "public",
                    label: (
                      <>
                        <span>{typePrivate[language]}</span>
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
                {typePrivateDescription[language]}
              </p>
            </div>
          </TransitionProvider>
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.zoomIn}
            className={styles.influenceCreateClan__priceText}
          >
            {creationFeeText[language]}
          </TransitionProvider>
        </div>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomOut}
          className={styles.influenceCreateClan__footer}
        >
          <button className={styles.influenceCreateClan__footerBtn}>
            <div className={styles.influenceCreateClan__footerBtnInner}>
              <CancelIcon />
              <span>{cancelButtonText[language]}</span>
            </div>
          </button>
          <button className={styles.influenceCreateClan__footerBtn}>
            <div className={styles.influenceCreateClan__footerBtnInner}>
              <CreateClanIcon />
              <span>{createButtonText[language]}</span>
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
