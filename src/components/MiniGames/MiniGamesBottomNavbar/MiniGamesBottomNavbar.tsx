import React from "react";

import {
  MiniGamesBottomNavbarAchievmentsIcon,
  MiniGamesBottomNavbarCatalogIcon,
  MiniGamesBottomNavbarLoyalityIcon,
  MiniGamesBottomNavbarPinnedIcon,
  MiniGamesBottomNavbarRefferalsIcon,
} from "../../layout/icons/MiniGames/MiniGamesBottomNavbar";
import {
  miniGamesAchievmentsPagePath,
  miniGamesLoyalityPagePath,
  miniGamesPagePath,
  miniGamesPinnedPagePath,
  miniGamesReferalsPagePath,
} from "../../../router/constants";
import FramedBottomNavbar from "../../FramedBottomNavbar/FramedBottomNavbar";

const items = [
  {
    icon: <MiniGamesBottomNavbarRefferalsIcon />,
    link: miniGamesReferalsPagePath,
  },
  { icon: <MiniGamesBottomNavbarPinnedIcon />, link: miniGamesPinnedPagePath },
  { icon: <MiniGamesBottomNavbarCatalogIcon />, link: miniGamesPagePath },
  {
    icon: <MiniGamesBottomNavbarAchievmentsIcon />,
    link: miniGamesAchievmentsPagePath,
  },
  {
    icon: <MiniGamesBottomNavbarLoyalityIcon />,
    link: miniGamesLoyalityPagePath,
  },
];

const MiniGamesBottomNavbar = () => {
  return <FramedBottomNavbar items={items} />;
};

export default MiniGamesBottomNavbar;
