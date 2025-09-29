import React from "react";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import {
  LanguageIcon,
  UISettingsIcon,
  RefferalsIcon,
  AchievmentsIcon,
  ChangeGameIcon,
  OthersIcon,
} from "../../layout/icons/CyberFarmEvo/ProfileMenuBar";
import CyberFarmEvoMenuBar from "../CyberFarmEvoMenuBar/CyberFarmEvoMenuBar";
import { useNavigate } from "react-router-dom";
import {
  cyberFarmAchievmentsPagePath,
  cyberFarmReferalsPagePath,
  onBoardingPagePath,
} from "../../../router/constants";
const {
  changeLanguageText,
  uiSettingsText,
  referralSystemText,
  achievementsText,
  changeGameText,
  othersText,
} = TRANSLATIONS.cyberfarmEvo.profileMenuBar;

interface Props {
  show: boolean;
  onClose: () => void;
}

const CyberFarmEvoProfileMenuBar: React.FC<Props> = ({ show, onClose }) => {
  const navigate = useNavigate();
  const items = [
    { name: changeLanguageText, icon: <LanguageIcon /> },
    { name: uiSettingsText, icon: <UISettingsIcon /> },
    {
      name: referralSystemText,
      icon: <RefferalsIcon />,
      onClick: () => navigate(cyberFarmReferalsPagePath),
    },
    {
      name: achievementsText,
      icon: <AchievmentsIcon />,
      onClick: () => navigate(cyberFarmAchievmentsPagePath),
    },
    {
      name: changeGameText,
      icon: <ChangeGameIcon />,
      onClick: () => navigate(onBoardingPagePath),
    },
    { name: othersText, icon: <OthersIcon /> },
  ];

  return <CyberFarmEvoMenuBar items={items} show={show} onClose={onClose} />;
};

export default CyberFarmEvoProfileMenuBar;
