import React, { useState } from "react";
import styles from "./HomeHeader.module.scss";
import HomeWebIcon from "../../layout/icons/Home/HomeWebIcon";
import HomeTgIcon from "../../layout/icons/Home/HomeTgIcon";
import {
  enFlagImage,
  enFlagImageWebp,
  ruFlagImage,
  ruFlagImageWebp,
} from "../../../assets/imageMaps";
import { ELanguages } from "../../../constants/ELanguages";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import HomeLanguagesSelectArrowIcon from "../../layout/icons/Home/HomeLanguagesSelectArrowIcon";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setLanguage } from "../../../store/slices/uiSlice";
import { Link } from "react-router-dom";
import { onBoardingPagePath } from "../../../router/constants";

const languages = {
  [ELanguages.ru]: {
    img: ruFlagImage,
    webpImg: ruFlagImageWebp,
    name: "Русский",
  },
  [ELanguages.en]: {
    img: enFlagImage,
    webpImg: enFlagImageWebp,
    name: "English",
  },
};

const HomeHeader = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  // const [language, setLanguage] = useState<ELanguages>(ELanguages.ru);
  const [languageModalOpend, setLanguageModalOpend] = useState(false);

  return (
    <header className={`${styles.homeHeader} homeContainer`}>
      <div className={styles.homeHeader__leftBlock}></div>
      <div className={styles.homeHeader__links}>
        {process.env.NODE_ENV === "development" && (
          <>
            <a href="/" className={styles.homeHeader__link}>
              <div className={styles.homeHeader__linkIconWrapper}>
                <HomeWebIcon />
              </div>
              <span>Играть в браузере</span>
            </a>
            <Link to={onBoardingPagePath} className={styles.homeHeader__link}>
              <div className={styles.homeHeader__linkIconWrapper}>
                <HomeTgIcon />
              </div>
              <span>Играть в Telegram</span>
            </Link>{" "}
          </>
        )}
      </div>
      <div className={styles.homeHeader__rightBlock}>
        <div className={styles.homeHeader__langSelect}>
          <button
            onClick={() => setLanguageModalOpend((prevState) => !prevState)}
            className={styles.homeHeader__langSelectBtn}
          >
            <ImageWebp
              src={languages[language].img}
              srcSet={languages[language].webpImg}
              alt="language"
              className={styles.homeHeader__langImg}
            />
            <span>{languages[language].name}</span>
            <HomeLanguagesSelectArrowIcon rotate={languageModalOpend} />
          </button>
          <TransitionProvider
            className={styles.homeHeader__langDropdown}
            style={TransitionStyleTypes.opacity}
            inProp={languageModalOpend}
          >
            {Object.keys(languages).map((langKey) => {
              const lang = langKey as ELanguages;
              return (
                <button
                  onClick={() => {
                    dispatch(setLanguage(lang));
                    setLanguageModalOpend(false);
                  }}
                  key={lang}
                  className={styles.homeHeader__langDropdownItem}
                >
                  <ImageWebp
                    src={languages[lang].img}
                    srcSet={languages[lang].webpImg}
                    alt="language"
                    className={styles.homeHeader__langImg}
                  />
                  <span
                    className={styles.homeHeader__langDropdownItemShortName}
                  >
                    {lang.toUpperCase()}
                  </span>
                  <span className={styles.homeHeader__langDropdownItemName}>
                    {languages[lang].name}
                  </span>
                </button>
              );
            })}
          </TransitionProvider>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
