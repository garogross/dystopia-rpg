import React from "react";
import styles from "./GameClanWrapper.module.scss";
import GameClanHeader from "./GameClanHeader/GameClanHeader";
import GameClanAboutIcon from "../../../layout/icons/game/GameClanPage/sidebar/GameClanAboutIcon";
import GameClanBattlesIcon from "../../../layout/icons/game/GameClanPage/sidebar/GameClanBattlesIcon";
import GameClanBaseIcon from "../../../layout/icons/game/GameClanPage/sidebar/GameClanBaseIcon";
import GameClanDepotIcon from "../../../layout/icons/game/GameClanPage/sidebar/GameClanDepotIcon";
import GameClanStoreIcon from "../../../layout/icons/game/GameClanPage/sidebar/GameClanStoreIcon";
import GameClanHuntingIcon from "../../../layout/icons/game/GameClanPage/sidebar/GameClanHuntingIcon";
import { GameSideBarProps } from "../../../../models/Props/GameSideBarProps";
import GameClanAbout from "../GameClanAbout/GameClanAbout";
import GameClanBattles from "../GameClanBattles/GameClanBattles";
import GameClanBase from "../GameClanBase/GameClanBase";
import GameClanDepot from "../GameClanDepot/GameClanDepot";
import GameClanStore from "../GameClanStore/GameClanStore";
import GameClanHunting from "../GameClanHunting/GameClanHunting";
import WrapperWithSidebar from "../../WrapperWithSidebar/WrapperWithSidebar";
import GameClanBottomWings from "../../../layout/icons/game/GameClanPage/GameClanBottomWings";
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

const GameClanWrapper: React.FC<Props> = ({
  mainComponent,
  sideBarDisableed,
  curClan,
  headerDescriptionText,
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const userClan = useAppSelector((state) => state.clan.clan);

  const clan = curClan || userClan;


  const sidebarItems: GameSideBarProps["items"] = [
    {
      link: "about",
      icon: <GameClanAboutIcon />,
      name: "О клане",
      component: <GameClanAbout clan={clan || undefined}/>,
    },
    {
      link: "depot",
      icon: <GameClanDepotIcon />,
      name: "Хранилище",
      component: <GameClanDepot />,
    },
    {
      link: "store",
      icon: <GameClanStoreIcon />,
      name: "Магазин",
      component: <GameClanStore />,
    },
    {
      link: "battles",
      icon: <GameClanBattlesIcon />,
      name: "Сражения",
      component: <GameClanBattles />,
    },
    {
      link: "hunting",
      icon: <GameClanHuntingIcon />,
      name: "Охота",
      component: <GameClanHunting />,
    },
    {
      link: "base",
      icon: <GameClanBaseIcon />,
      name: "База",
      component: <GameClanBase />,
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
    <section className={`${styles.gameClanWrapper} `}>
      <GameClanHeader
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
        <div className={styles.gameClanWrapper__bottomWings}>
          <GameClanBottomWings />
        </div>
      </TransitionProvider>
    </section>
  );
};

export default GameClanWrapper;
