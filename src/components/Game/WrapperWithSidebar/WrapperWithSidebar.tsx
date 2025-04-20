import React, { useEffect, useState } from "react";

import styles from "./WrapperWithSidebar.module.scss";
import { useLocation } from "react-router-dom";
import GameSideBar from "../GameSideBar/GameSideBar";
import { GameSideBarProps } from "../../../models/Props/GameSideBarProps";
interface Props extends GameSideBarProps {}

const WrapperWithSidebar: React.FC<Props> = ({ items }) => {
  const location = useLocation();
  const [curItemPath, setCurItemPath] = useState(items[0].link);

  const curItem = items.find((item) => item.link === curItemPath) || items[0];

  useEffect(() => {
    setCurItemPath(location.hash);
  }, [location.hash]);

  return (
    <div className={styles.wrapperWithSidebar}>
      <div className={styles.wrapperWithSidebar__main}>
        {curItem?.component}
      </div>
      <GameSideBar items={items} />
    </div>
  );
};

export default WrapperWithSidebar;
