import React from "react";
import {
  RPGBottomNavbarChalanagesIcon,
  RPGBottomNavbarDuelsIcon,
  RPGBottomNavbarClanIcon,
  RPGBottomNavbarCharacterIcon,
  RPGBottomNavbarLoyalityIcon,
} from "../../layout/icons/RPGGame/RPGBottomNavbar";

import {
  rpgGameChallengesPagePath,
  rpgGameClanPagePath,
  rpgGameDuelPagePath,
  rpgGameLoyalityPagePath,
} from "../../../router/constants";

import FramedBottomNavbar from "../../FramedBottomNavbar/FramedBottomNavbar";

const items = [
  {
    icon: <RPGBottomNavbarChalanagesIcon />,
    link: rpgGameChallengesPagePath,
  },
  {
    icon: <RPGBottomNavbarCharacterIcon />,
    link: "",
  },
  {
    icon: <RPGBottomNavbarDuelsIcon />,
    link: rpgGameDuelPagePath,
  },
  {
    icon: <RPGBottomNavbarClanIcon />,
    link: rpgGameClanPagePath,
  },
  {
    icon: <RPGBottomNavbarLoyalityIcon />,
    link: rpgGameLoyalityPagePath,
  },
];

const RPGBottomNavbar = () => {
  return <FramedBottomNavbar items={items} />;
};

export default RPGBottomNavbar;
