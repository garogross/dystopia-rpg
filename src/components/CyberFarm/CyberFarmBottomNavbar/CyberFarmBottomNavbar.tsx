import React from "react";
import {
  cyberFarmFactoriesPagePath,
  cyberFarmFarmsPagePath,
  cyberFarmSupportPagePath,
  cyberFarmWarehousePagePath,
} from "../../../router/constants";
import {
  FactoriesIcon,
  FarmsIcon,
  FieldsIcon,
  SupportIcon,
  WarehouseIcon,
} from "../../layout/icons/CyberFarm/CyberFarmBottomNavbar";
import { NavLink } from "react-router-dom";
import { DotsLine } from "../../layout/icons/RPGGame/Common";

import styles from "./CyberFarmBottomNavbar.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

const links = [
  {
    link: "",
    icon: <FieldsIcon />,
  },
  {
    link: cyberFarmFarmsPagePath,
    icon: <FarmsIcon />,
  },
  {
    link: cyberFarmFactoriesPagePath,
    icon: <FactoriesIcon />,
  },
  {
    link: cyberFarmWarehousePagePath,
    icon: <WarehouseIcon />,
  },
  {
    link: cyberFarmSupportPagePath,
    icon: <SupportIcon />,
  },
];

const CyberFarmBottomNavbar = () => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const linkActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.cyberFarmBottomNavbar__link_active} ${styles.cyberFarmBottomNavbar__link}`
      : `${styles.cyberFarmBottomNavbar__link}`;

  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.bottom}
      className={`cyberFarmContainer ${styles.cyberFarmBottomNavbar}`}
    >
      <div className={styles.cyberFarmBottomNavbar__dotline}>
        <DotsLine />
      </div>
      <div className={styles.cyberFarmBottomNavbar__main}>
        {links.map((link) => (
          <NavLink
            to={link.link}
            key={link.link}
            className={linkActiveClass}
            end={true}
          >
            <span className={styles.cyberFarmBottomNavbar__linkInner}>
              {link.icon}
            </span>
          </NavLink>
        ))}
      </div>
      <div className={styles.cyberFarmBottomNavbar__banner}></div>
    </TransitionProvider>
  );
};

export default CyberFarmBottomNavbar;
