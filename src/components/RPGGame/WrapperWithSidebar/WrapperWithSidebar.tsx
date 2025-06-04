import React, { useEffect, useState } from "react";

import styles from "./WrapperWithSidebar.module.scss";
import { useLocation } from "react-router-dom";
import RPGGameSideBar from "../RPGGameSideBar/RPGGameSideBar";
import { RPGGameSideBarProps } from "../../../models/Props/RPGGameSideBarProps";
interface Props extends RPGGameSideBarProps {}

const WrapperWithSidebar: React.FC<Props> = ({ items }) => {
  const location = useLocation();
  const [curItemPath, setCurItemPath] = useState(items[0].link);

  const curItem = items.find((item) => item.link === curItemPath) || items[0];

  useEffect(() => {
    setCurItemPath(location.hash.slice(1));
  }, [location.hash]);

  return (
    <div className={styles.wrapperWithSidebar}>
      <div className={styles.wrapperWithSidebar__main}>
        {curItem?.component}
      </div>
      <RPGGameSideBar items={items} />
    </div>
  );
};

export default WrapperWithSidebar;
