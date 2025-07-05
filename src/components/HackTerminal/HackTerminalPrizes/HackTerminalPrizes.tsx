import React from "react";
import HackTerminalWrapperWithScreenBg from "../HackTerminalWrapperWithScreenBg/HackTerminalWrapperWithScreenBg";
import HackTerminalDoc from "../HackTerminalDoc/HackTerminalDoc";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";

const {
  title,
  description,
  levels: { newbie, cracker, hacker },
} = TRANSLATIONS.hackTerminal.prizes;

const HackTerminalPrizes = () => {
  const language = useAppSelector((state) => state.ui.language);

  return (
    <HackTerminalWrapperWithScreenBg>
      <HackTerminalDoc title={title[language]}>
        {description[language]}
        <ul>
          <li>
            <b>{newbie.name[language]}</b>
            <ul>
              {newbie.items.map((item, idx) => (
                <li key={idx}>{item[language]}</li>
              ))}
            </ul>
          </li>
          <li>
            <b>{cracker.name[language]}</b>
            <ul>
              {cracker.items.map((item, idx) => (
                <li key={idx}>{item[language]}</li>
              ))}
            </ul>
          </li>
          <li>
            <b>{hacker.name[language]}</b>
            <ul>
              {hacker.items.map((item, idx) => (
                <li key={idx}>{item[language]}</li>
              ))}
            </ul>
          </li>
        </ul>
      </HackTerminalDoc>
    </HackTerminalWrapperWithScreenBg>
  );
};

export default HackTerminalPrizes;
