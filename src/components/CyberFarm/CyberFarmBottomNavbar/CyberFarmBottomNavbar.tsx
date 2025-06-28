import React, { useEffect } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import { DotsLine } from "../../layout/icons/RPGGame/Common";

import styles from "./CyberFarmBottomNavbar.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { adBannerRenderers } from "../../../utils/adBannerRenderers";
import { ECyberfarmTutorialActions } from "../../../constants/cyberfarm/tutorial";
import CloneFixedElementProvider from "../../../providers/CloneFixedElementProvider";

const ONCLICKA_SPOT_ID = "6077990";

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
    id: ECyberfarmTutorialActions.openStorage,
  },

  {
    link: cyberFarmSupportPagePath,
    icon: <SupportIcon />,
  },
];

const CyberFarmBottomNavbar = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const linkActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.cyberFarmBottomNavbar__link_active} ${styles.cyberFarmBottomNavbar__link}`
      : `${styles.cyberFarmBottomNavbar__link}`;

  const onClicka = adBannerRenderers.onclicka;

  useEffect(() => {
    if (gameInited) onClicka.init(ONCLICKA_SPOT_ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameInited]);

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
            id={link?.id}
          >
            <span className={styles.cyberFarmBottomNavbar__linkInner}>
              {link.icon}
            </span>
          </NavLink>
        ))}
      </div>
      <div className={styles.cyberFarmBottomNavbar__banner}>
        {onClicka.render(ONCLICKA_SPOT_ID)}
      </div>
      <CloneFixedElementProvider
        id={ECyberfarmTutorialActions.openStorage}
        onClick={() => navigate(cyberFarmWarehousePagePath)}
      />
    </TransitionProvider>
  );
};

export default CyberFarmBottomNavbar;
