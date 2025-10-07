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
import { SUPPORT_CHAT_URL } from "../../constants/common/supportChatUrl";
import { setCyberfarmMode } from "../../store/slices/cyberFarm/cyberfarmSlice";
import { useNavigate } from "react-router-dom";
import { cyberFarmEvoPagePath } from "../../router/constants";

interface Props {
  show: boolean;
  onClose: () => void;
  isFarm?: boolean;
}

const {
  titleText,
  languageText,
  goToChatText,
  uiModeText,
  evoText,
  classicText,
} = TRANSLATIONS.settings;

const SettingsModal: React.FC<Props> = ({ show, onClose, isFarm }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.ui.language);
  const tg = useTelegram();

  const onLanguageChange = (lang: ELanguages) => {
    dispatch(setLanguage(lang));
    setLSItem(ELSProps.language, lang);
  };

  const onChangeGameMode = () => {
    dispatch(setCyberfarmMode("evo"));
    navigate(cyberFarmEvoPagePath);
  };

  return (
    <ModalWithAdd show={show} onClose={onClose} titleLg={titleText[language]}>
      <div className={styles.settingsModal}>
        {/* language switch */}
        <div className={styles.settingsModal__switcherBlock}>
          <span className={styles.settingsModal__switcherText}>
            {languageText[language]}
          </span>
          <div className={styles.settingsModal__switcherOptions}>
            <button
              className={`${styles.settingsModal__switcherBtn} ${
                language === ELanguages.en
                  ? styles.settingsModal__switcherBtn_active
                  : ""
              }`}
              onClick={() => onLanguageChange(ELanguages.en)}
            >
              <span className={styles.settingsModal__switcherBtnInner}>EN</span>
            </button>
            <button
              className={`${styles.settingsModal__switcherBtn} ${
                language === ELanguages.ru
                  ? styles.settingsModal__switcherBtn_active
                  : ""
              }`}
              onClick={() => onLanguageChange(ELanguages.ru)}
            >
              <span className={styles.settingsModal__switcherBtnInner}>RU</span>
            </button>
          </div>
        </div>
        {/* farm mode switcher */}
        {isFarm && (
          <div className={styles.settingsModal__switcherBlock}>
            <span className={styles.settingsModal__switcherText}>
              {uiModeText[language]}
            </span>
            <div className={styles.settingsModal__switcherOptions}>
              <button
                className={`${styles.settingsModal__switcherBtn} ${styles.settingsModal__switcherBtn_active}`}
              >
                <span className={styles.settingsModal__switcherBtnInner}>
                  {classicText[language]}
                </span>
              </button>
              <button
                className={styles.settingsModal__switcherBtn}
                onClick={onChangeGameMode}
              >
                <span className={styles.settingsModal__switcherBtnInner}>
                  {evoText[language]}
                </span>
              </button>
            </div>
          </div>
        )}

        <div className={styles.settingsModal__linkItem}>
          <div className={styles.settingsModal__linkDotline}>
            <DotsLine />
          </div>
          <button
            onClick={() => {
              // @ts-ignore
              if (tg) {
                // @ts-ignore
                tg.openTelegramLink(SUPPORT_CHAT_URL);
              } else {
                window.open(SUPPORT_CHAT_URL, "_blank");
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
