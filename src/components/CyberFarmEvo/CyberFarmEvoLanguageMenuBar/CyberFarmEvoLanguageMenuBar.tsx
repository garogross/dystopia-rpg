import React from "react";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

import CyberFarmEvoMenuBar from "../CyberFarmEvoMenuBar/CyberFarmEvoMenuBar";

import { useDispatch } from "react-redux";
import { ELanguages } from "../../../constants/ELanguages";
import { setLanguage } from "../../../store/slices/uiSlice";
import { setLSItem } from "../../../helpers/localStorage";
import { ELSProps } from "../../../constants/ELSProps";
const { englishText, russianText, titleText } =
  TRANSLATIONS.cyberfarmEvo.languageMenubar;

interface Props {
  show: boolean;
  onClose: () => void;
}

const CyberFarmEvoLanguageMenuBar: React.FC<Props> = ({ show, onClose }) => {
  const dispatch = useDispatch();

  const onChange = (lang: ELanguages) => {
    dispatch(setLanguage(lang));
    setLSItem(ELSProps.language, lang);
  };
  const items = [
    { name: englishText, onClick: () => onChange(ELanguages.en) },
    { name: russianText, onClick: () => onChange(ELanguages.ru) },
  ];

  return (
    <CyberFarmEvoMenuBar
      items={items}
      show={show}
      onClose={onClose}
      title={titleText}
    />
  );
};

export default CyberFarmEvoLanguageMenuBar;
