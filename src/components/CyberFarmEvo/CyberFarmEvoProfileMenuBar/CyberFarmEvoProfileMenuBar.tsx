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
  cyberFarmEvoPagePath,
  cyberFarmRatingsPagePath,
  cyberFarmReferalsPagePath,
  onBoardingPagePath,
} from "../../../router/constants";
const {
  changeLanguageText,
  uiSettingsText,
  referralSystemText,
  achievementsText,
  changeGameText,
  ratingsText,
  titleText,
} = TRANSLATIONS.cyberfarmEvo.profileMenuBar;

interface Props {
  show: boolean;
  onClose: () => void;
  openUiSettings: () => void;
  openLanguageMenu: () => void;
}

const CyberFarmEvoProfileMenuBar: React.FC<Props> = ({
  show,
  onClose,
  openUiSettings,
  openLanguageMenu,
}) => {
  const navigate = useNavigate();
  const items = [
    {
      name: changeLanguageText,
      icon: <LanguageIcon />,
      onClick: openLanguageMenu,
    },
    { name: uiSettingsText, icon: <UISettingsIcon />, onClick: openUiSettings },
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
    {
      name: ratingsText,
      icon: <OthersIcon />,
      onClick: () =>
        navigate(`${cyberFarmEvoPagePath}/${cyberFarmRatingsPagePath}`),
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
