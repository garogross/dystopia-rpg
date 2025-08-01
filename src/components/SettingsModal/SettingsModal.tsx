import React from "react";

import styles from "./SettingsModal.module.scss";
import ModalWithAdd from "../layout/ModalWithAdd/ModalWithAdd";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { DotsLine } from "../layout/icons/RPGGame/Common";
import { setLanguage } from "../../store/slices/uiSlice";
import { ELanguages } from "../../constants/ELanguages";
import { useTelegram } from "../../hooks/useTelegram";
import { setLSItem } from "../../helpers/localStorage";
import { ELSProps } from "../../constants/ELSProps";

interface Props {
  show: boolean;
  onClose: () => void;
}

const CHAT_URL = "https://t.me/dystopia_game_chat";

const { titleText, languageText, goToChatText } = TRANSLATIONS.settings;

const SettingsModal: React.FC<Props> = ({ show, onClose }) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const tg = useTelegram();

  const onLanguageChange = (lang: ELanguages) => {
    dispatch(setLanguage(lang));
    setLSItem(ELSProps.language, lang);
  };

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
              onClick={() => onLanguageChange(ELanguages.en)}
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
              onClick={() => onLanguageChange(ELanguages.ru)}
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
          <button
            onClick={() => {
              // @ts-ignore
              if (tg) {
                // @ts-ignore
                tg.openTelegramLink(CHAT_URL);
              } else {
                window.open(CHAT_URL, "_blank");
              }
            }}
            className={styles.settingsModal__link}
          >
            {goToChatText[language]}
          </button>
          <div className={styles.settingsModal__linkDotline}>
            <DotsLine />
          </div>
        </div>
      </div>
    </ModalWithAdd>
  );
};

export default SettingsModal;
