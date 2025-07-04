import React from "react";
import TitleH3 from "../../layout/TitleH3/TitleH3";
import { useAppSelector } from "../../../hooks/redux";
import { Frame } from "../../layout/icons/HackTerminal/HackTerminalLevelSelect";

import styles from "./HackTerminalLevelSelect.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { HACK_TERMINAL_LEVELS } from "../../../constants/hackTerminal/hackTerminalLevels";

const HackTerminalLevelSelect = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <div className={styles.hackTerminalLevelSelect}>
      <TitleH3>выберите уровень сложноси</TitleH3>
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
                      {level.name}
                    </h6>
                    <p
                      className={
                        styles.hackTerminalLevelSelect__listItemDescription
                      }
                    >
                      {level.description} ({level.codeLength} цифр
                      {level.codeLength < 5 ? "а" : ""})
                    </p>
                    <div className={styles.hackTerminalLevelSelect__footer}>
                      <p
                        className={styles.hackTerminalLevelSelect__attemptsText}
                      >
                        Попыток: {level.attempts}
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
                            Выбран
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
