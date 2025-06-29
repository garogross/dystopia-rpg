import React from "react";

import styles from "./SettingsModal.module.scss";
import ModalWithAdd from "../layout/ModalWithAdd/ModalWithAdd";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { DotsLine } from "../layout/icons/RPGGame/Common";
import { setLanguage } from "../../store/slices/uiSlice";
import { ELanguages } from "../../constants/ELanguages";

interface Props {
  show: boolean;
  onClose: () => void;
}

const { titleText, languageText, goToChatText } = TRANSLATIONS.settings;

const SettingsModal: React.FC<Props> = ({ show, onClose }) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  return (
    <ModalWithAdd show={show} onClose={onClose} titleLg={titleText[language]}>
      <div className={styles.settingsModal}>
        <div className={styles.settingsModal__languageSwitcherBlock}>
          <span className={styles.settingsModal__languageSwitcherText}>
            {languageText[language]}
          </span>
          <div className={styles.settingsModal__languageSwitcherOptions}>
            <button
              className={`${styles.settingsModal__languageSwitcherBtn} ${
                language === ELanguages.en
                  ? styles.settingsModal__languageSwitcherBtn_active
                  : ""
              }`}
              onClick={() => dispatch(setLanguage(ELanguages.en))}
            >
              <span className={styles.settingsModal__languageSwitcherBtnInner}>
                EN
              </span>
            </button>
            <button
              className={`${styles.settingsModal__languageSwitcherBtn} ${
                language === ELanguages.ru
                  ? styles.settingsModal__languageSwitcherBtn_active
                  : ""
              }`}
              onClick={() => dispatch(setLanguage(ELanguages.ru))}
            >
              <span className={styles.settingsModal__languageSwitcherBtnInner}>
                RU
              </span>
            </button>
          </div>
        </div>
        <div className={styles.settingsModal__linkItem}>
          <div className={styles.settingsModal__linkDotline}>
            <DotsLine />
          </div>
          <a href="/" className={styles.settingsModal__link}>
            {goToChatText[language]}
          </a>
          <div className={styles.settingsModal__linkDotline}>
            <DotsLine />
          </div>
        </div>
      </div>
    </ModalWithAdd>
  );
};

export default SettingsModal;
