import React from "react";
import styles from "./RPGGameClanWrapper.module.scss";
import RPGGameClanHeader from "./RPGGameClanHeader/RPGGameClanHeader";
import {
  RPGGameClanAboutIcon,
  RPGGameClanBattlesIcon,
  RPGGameClanBaseIcon,
  RPGGameClanDepotIcon,
  RPGGameClanStoreIcon,
  RPGGameClanHuntingIcon,
} from "../../../layout/icons/RPGGame/RPGGameClanPage/sidebar";
import { RPGGameSideBarProps } from "../../../../models/Props/RPGGameSideBarProps";
import RPGGameClanAbout from "../RPGGameClanAbout/RPGGameClanAbout";
import RPGGameClanBattles from "../RPGGameClanBattles/RPGGameClanBattles";
import RPGGameClanBase from "../RPGGameClanBase/RPGGameClanBase";
import RPGGameClanDepot from "../RPGGameClanDepot/RPGGameClanDepot";
import RPGGameClanStore from "../RPGGameClanStore/RPGGameClanStore";
import RPGGameClanHunting from "../RPGGameClanHunting/RPGGameClanHunting";
import WrapperWithSidebar from "../../WrapperWithSidebar/WrapperWithSidebar";
import { RPGGameClanBottomWings } from "../../../layout/icons/RPGGame/RPGGameClanPage";
import TransitionProvider from "../../../../providers/TransitionProvider";
import { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";
import { IClan } from "../../../../models/IClan";

interface Props {
  mainComponent?: React.ReactNode;
  sideBarDisableed?: boolean;
  curClan?: IClan;
  headerDescriptionText?: React.ReactNode;
}

const RPGGameClanWrapper: React.FC<Props> = ({
  mainComponent,
  sideBarDisableed,
  curClan,
  headerDescriptionText,
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const userClan = useAppSelector((state) => state.clan.clan);

  const clan = curClan || userClan;

  const sidebarItems: RPGGameSideBarProps["items"] = [
    {
      link: "about",
      icon: <RPGGameClanAboutIcon />,
      name: "О клане",
      component: <RPGGameClanAbout clan={clan || undefined} />,
    },
    {
      link: "depot",
      icon: <RPGGameClanDepotIcon />,
      name: "Хранилище",
      component: <RPGGameClanDepot />,
    },
    {
      link: "store",
      icon: <RPGGameClanStoreIcon />,
      name: "Магазин",
      component: <RPGGameClanStore />,
    },
    {
      link: "battles",
      icon: <RPGGameClanBattlesIcon />,
      name: "Сражения",
      component: <RPGGameClanBattles />,
    },
    {
      link: "hunting",
      icon: <RPGGameClanHuntingIcon />,
      name: "Охота",
      component: <RPGGameClanHunting />,
    },
    {
      link: "base",
      icon: <RPGGameClanBaseIcon />,
      name: "База",
      component: <RPGGameClanBase />,
    },
  ];

  let updatedSidebarItems = sidebarItems;

  if (mainComponent) {
    updatedSidebarItems[0].component = mainComponent;
    updatedSidebarItems[0].link = "";
  }

  if (!clan || sideBarDisableed) {
    updatedSidebarItems = sidebarItems.map((clan) => ({
      ...clan,
      disabled: true,
    }));
  }

  return (
    <section className={`${styles.rpgGameClanWrapper} `}>
      <RPGGameClanHeader
        clan={clan || undefined}
        descriptionText={
          headerDescriptionText ||
          "На данный момент вы не входите в состав Клана․ Объединяйтесь с другими выжившими или создайте собственный путь."
        }
      />
      <WrapperWithSidebar items={updatedSidebarItems} />
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
      >
        <div className={styles.rpgGameClanWrapper__bottomWings}>
          <RPGGameClanBottomWings />
        </div>
      </TransitionProvider>
    </section>
  );
};

export default RPGGameClanWrapper;
