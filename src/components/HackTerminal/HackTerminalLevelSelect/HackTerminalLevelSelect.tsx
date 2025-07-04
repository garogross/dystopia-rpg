import React from "react";
import TitleH3 from "../../layout/TitleH3/TitleH3";
import { useAppSelector } from "../../../hooks/redux";
import { Frame } from "../../layout/icons/HackTerminal/HackTerminalLevelSelect";

import styles from "./HackTerminalLevelSelect.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { HACK_TERMINAL_LEVELS } from "../../../constants/hackTerminal/hackTerminalLevels";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { ELanguages } from "../../../constants/ELanguages";

const { titleText, selectedText, attemptsText, digitsText } =
  TRANSLATIONS.hackTerminal.levelSelect;

const HackTerminalLevelSelect = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);

  return (
    <div className={styles.hackTerminalLevelSelect}>
      <TitleH3>{titleText[language]}</TitleH3>
      <div className={styles.hackTerminalLevelSelect__wrapper}>
        <div className={styles.hackTerminalLevelSelect__main}>
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.opacity}
            className={styles.hackTerminalLevelSelect__frame}
          >
            <Frame />
          </TransitionProvider>
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.bottom}
            className={styles.hackTerminalLevelSelect__list}
          >
            {HACK_TERMINAL_LEVELS.map((level, index) => {
              return (
                <div
                  key={index}
                  className={styles.hackTerminalLevelSelect__listItem}
                >
                  {level.icon}
                  <div className={styles.hackTerminalLevelSelect__listItemMain}>
                    <h6
                      className={styles.hackTerminalLevelSelect__listItemtitle}
                    >
                      {level.name[language]}
                    </h6>
                    <p
                      className={
                        styles.hackTerminalLevelSelect__listItemDescription
                      }
                    >
                      {level.description[language]} ({level.codeLength}{" "}
                      {digitsText[language]}
                      {level.codeLength < 5 && language === ELanguages.ru
                        ? "а"
                        : ""}
                      )
                    </p>
                    <div className={styles.hackTerminalLevelSelect__footer}>
                      <p
                        className={styles.hackTerminalLevelSelect__attemptsText}
                      >
                        {attemptsText[language]}: {level.attempts}
                      </p>
                      {level.selected && (
                        <div
                          className={styles.hackTerminalLevelSelect__selected}
                        >
                          <div
                            className={
                              styles.hackTerminalLevelSelect__selectedInner
                            }
                          >
                            {selectedText[language]}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </TransitionProvider>
        </div>
      </div>
    </div>
  );
};

export default HackTerminalLevelSelect;
