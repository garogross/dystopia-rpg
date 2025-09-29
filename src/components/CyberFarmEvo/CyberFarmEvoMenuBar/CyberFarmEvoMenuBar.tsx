import React, { ReactNode } from "react";

import styles from "./CyberFarmEvoMenuBar.module.scss";
import { TranslationItemType } from "../../../types/TranslationItemType";
import Backdrop from "../../layout/Backdrop/Backdrop";
import NewPortalProvider from "../../../providers/NewPortalProvider";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import {
  BottomWings,
  CrossIcon,
  TopWings,
} from "../../layout/icons/CyberFarmEvo/MenuBar";
import { useAppSelector } from "../../../hooks/redux";

interface MenuItem {
  name: TranslationItemType;
  icon: ReactNode;
  onClick?: () => void;
}

interface Props {
  show: boolean;
  onClose: () => void;
  items: MenuItem[];
}

const CyberFarmEvoMenuBar: React.FC<Props> = ({ show, onClose, items }) => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <>
      <Backdrop inProp={show} onClose={onClose} />
      <NewPortalProvider>
        <TransitionProvider
          inProp={show}
          style={TransitionStyleTypes.opacity}
          className={styles.cyberFarmEvoMenuBar}
        >
          <div className={styles.cyberFarmEvoMenuBar__header}>
            <TopWings />
            <span className={styles.cyberFarmEvoMenuBar__headerText}>
              ПРОФИЛЬ
            </span>
          </div>
          <div className={styles.cyberFarmEvoMenuBar__main}>
            <div className={styles.cyberFarmEvoMenuBar__mainInner}>
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick?.();
                    onClose();
                  }}
                  className={styles.cyberFarmEvoMenuBar__itemBtn}
                >
                  <span className={styles.cyberFarmEvoMenuBar__itemInner}>
                    {item.icon}
                    {item.name[language]}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.cyberFarmEvoMenuBar__footer}>
            <BottomWings />
            <button
              onClick={onClose}
              className={styles.cyberFarmEvoMenuBar__closeBtn}
            >
              <CrossIcon />
            </button>
          </div>
        </TransitionProvider>
      </NewPortalProvider>
    </>
  );
};

export default CyberFarmEvoMenuBar;
