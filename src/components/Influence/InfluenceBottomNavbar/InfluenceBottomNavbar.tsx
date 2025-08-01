import React from "react";

import {
  influenceClanPagePath,
  influenceLoyalityPagePath,
  influenceNotificationsPagePath,
  influencePlayerPagePath,
} from "../../../router/constants";

import FramedBottomNavbar from "../../FramedBottomNavbar/FramedBottomNavbar";
import {
  ClanIcon,
  LoyalityIcon,
  MapIcon,
  NotificatonsIcon,
  PlayerIcon,
} from "../../layout/icons/Influence/BottomNavbar";

const items = [
  {
    icon: <PlayerIcon />,
    link: influencePlayerPagePath,
  },

  {
    icon: <ClanIcon />,
    link: influenceClanPagePath,
    indev: true,
  },

  {
    icon: <MapIcon />,
    link: "",
  },

  {
    icon: <NotificatonsIcon />,
    link: influenceNotificationsPagePath,
    indev: true,
  },

  {
    icon: <LoyalityIcon />,
    link: influenceLoyalityPagePath,
  },
];

const InfluenceNavbar = () => {
  return <FramedBottomNavbar items={items} />;
};

export default InfluenceNavbar;
