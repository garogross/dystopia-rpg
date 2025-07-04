import React from "react";
import HackTerminalDoc from "../HackTerminalDoc/HackTerminalDoc";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";
import { HACK_TERMINAL_STATUS_COLORS } from "../../../constants/hackTerminal/hackTerminalStatusColors";
import HackTerminalWrapperWithScreenBg from "../HackTerminalWrapperWithScreenBg/HackTerminalWrapperWithScreenBg";

const {
  yourTaskText,
  enter6DigitsText,
  afterCheckingText,
  greenDigitText,
  yellowDigitText,
  redDigitText,
  useHintsText,
  ifYouGuessText,
  attemptsEndedText,
  titleText,
} = TRANSLATIONS.hackTerminal.rules;

const HackTerminalRulles = () => {
  const siteLanguage = useAppSelector((state) => state.ui.language);
  return (
    <HackTerminalWrapperWithScreenBg>
      <HackTerminalDoc title={titleText[siteLanguage]}>
        <ol>
          <li>{yourTaskText[siteLanguage]}</li>
          <li>{enter6DigitsText[siteLanguage]}</li>
          <li>{afterCheckingText[siteLanguage]}</li>
          <ul>
            <li>
              <span style={{ color: HACK_TERMINAL_STATUS_COLORS.blue }}>
                {greenDigitText[siteLanguage][0]}
              </span>
              {greenDigitText[siteLanguage][1]}
            </li>
            <li>
              <span style={{ color: HACK_TERMINAL_STATUS_COLORS.yellow }}>
                {yellowDigitText[siteLanguage][0]}
              </span>
              {yellowDigitText[siteLanguage][1]}
            </li>
            <li>
              <span style={{ color: HACK_TERMINAL_STATUS_COLORS.red }}>
                {redDigitText[siteLanguage][0]}
              </span>
              {redDigitText[siteLanguage][1]}
            </li>
          </ul>
          <li>{useHintsText[siteLanguage]}</li>
          <li>{ifYouGuessText[siteLanguage]}</li>
          <li>{attemptsEndedText[siteLanguage]}</li>
        </ol>
      </HackTerminalDoc>
    </HackTerminalWrapperWithScreenBg>
  );
};

export default HackTerminalRulles;
