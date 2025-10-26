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
import { CopyIcon } from "../../layout/icons/Common";
import { useAppSelector } from "../../../hooks/redux";
import Tooltip from "../../layout/Tooltip/Tooltip";
import { useTooltip } from "../../../hooks/useTooltip";
import styles from "./CyberFarmEvoProfileMenuBar.module.scss";

const {
  changeLanguageText,
  uiSettingsText,
  referralSystemText,
  achievementsText,
  changeGameText,
  ratingsText,
  titleText,
  copyText,
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
  const tgId = useAppSelector((state) => state.profile.tgId);
  const language = useAppSelector((state) => state.ui.language);
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

  const { show: showTooltip, openTooltip } = useTooltip();

  const onCopy = () => {
    if (tgId) {
      navigator.clipboard.writeText(tgId.toString());
      openTooltip();
    }
  };

  return (
    <>
      <CyberFarmEvoMenuBar
        items={items}
        show={show}
        onClose={onClose}
        title={titleText}
        headerBlock={
          <button
            onClick={onCopy}
            className={styles.cyberFarmEvoProfileMenuBar__header}
          >
            <CopyIcon />
            <span>
              ID: <span className="primaryText">{tgId}</span>
            </span>
          </button>
        }
      />
      <Tooltip show={showTooltip} text={copyText[language]} />
    </>
  );
};

export default CyberFarmEvoProfileMenuBar;
