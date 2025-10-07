import React from "react";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";

import CyberFarmEvoMenuBar from "../CyberFarmEvoMenuBar/CyberFarmEvoMenuBar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCyberfarmMode } from "../../../store/slices/cyberFarm/cyberfarmSlice";
import { CyberfarmState } from "../../../store/slices/cyberFarm";
import { cyberFarmPagePath } from "../../../router/constants";

const { classicModeText, evoModeText, titleText } =
  TRANSLATIONS.cyberfarmEvo.uiSettingsmenuBar;

interface Props {
  show: boolean;
  onClose: () => void;
}

const CyberFarmEvoProfileMenuBar: React.FC<Props> = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (mode: CyberfarmState["global"]["appMode"]) => {
    dispatch(setCyberfarmMode(mode));
    navigate(cyberFarmPagePath);
  };
  const items = [
    {
      name: classicModeText,
      onClick: () => {
        onChange("classic");
      },
    },
    {
      name: evoModeText,
      onClick: () => {
        onChange("evo");
      },
    },
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

export default CyberFarmEvoProfileMenuBar;
