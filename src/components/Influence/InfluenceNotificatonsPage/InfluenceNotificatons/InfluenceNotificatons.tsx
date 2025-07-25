import React, { useState } from "react";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import { DotsLineFullscreen } from "../../../layout/icons/Common/DotsLineFullscreen";
import {
  FightIcon,
  BuildingsIcon,
  ClanIcon,
  OthersIcon,
} from "../../../layout/icons/Influence/InfluenceNotifications/Tabs";
import { ENotificationTypes } from "../../../../constants/influence/ENotificationTypes";
import { INotification } from "../../../../models/Influence/INotification";
import { ENotificationSubtypes } from "../../../../constants/influence/ENotificationSubtypes";
import {
  BuildUpogradedIcon,
  FinanceIcon,
  HexAttackedIcon,
  NewAcheivmentIcon,
} from "../../../layout/icons/Influence/InfluenceNotifications/subtypes";
import {
  ShowInMapIcon,
  DeleteIcon,
} from "../../../layout/icons/Influence/InfluenceNotifications";
import { HeaderWings } from "../../../layout/icons/RPGGame/Common";

import styles from "./InfluenceNotificatons.module.scss";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";

const { titleText, tabsTexts, newMessagesCountText, showOnMapText, agoText } =
  TRANSLATIONS.influence.notifications;

const tabs = [
  {
    name: tabsTexts.fightText,
    key: ENotificationTypes.FIGHT,
    icon: <FightIcon />,
  },
  {
    name: tabsTexts.buildingsText,
    key: ENotificationTypes.BUILDS,
    icon: <BuildingsIcon />,
  },
  {
    name: tabsTexts.clanText,
    key: ENotificationTypes.CLAN,
    icon: <ClanIcon />,
  },
  {
    name: tabsTexts.miscText,
    key: ENotificationTypes.OTHERS,
    icon: <OthersIcon />,
  },
];

const subtypeIcons = {
  [ENotificationSubtypes.BUILD_UPGRADED]: <BuildUpogradedIcon />,
  [ENotificationSubtypes.FINANSE]: <FinanceIcon />,
  [ENotificationSubtypes.HEX_ATTACKED]: <HexAttackedIcon />,
  [ENotificationSubtypes.NEW_ACHIEVMENT]: <NewAcheivmentIcon />,
};

const notifications: INotification[] = [
  {
    id: "1",
    type: ENotificationTypes.FIGHT,
    subtype: ENotificationSubtypes.HEX_ATTACKED,
    title: "Ваш гекс атакован кланом Цербер! ",
    description: "Враг нанёс 3 урона по зданию Склад",
    date: Date.now() - 3 * 60 * 1000,
  },
  {
    id: "2",
    type: ENotificationTypes.FIGHT,
    subtype: ENotificationSubtypes.BUILD_UPGRADED,
    title: "Завершено улучшение бункера",
    description: "Защитное сооружение улучшено от Ур. 3→4",
    date: Date.now() - 5 * 60 * 1000,
  },
  {
    id: "3",
    type: ENotificationTypes.FIGHT,
    subtype: ENotificationSubtypes.FINANSE,
    title: "Финанси клана",
    description: `Ваш клан "Чёрный Обелиск" получил +20`,
    date: Date.now() - 5 * 60 * 60 * 1000,
  },
  {
    id: "1",
    type: ENotificationTypes.FIGHT,
    subtype: ENotificationSubtypes.NEW_ACHIEVMENT,
    title: "Новое достижение",
    description: "Получено достижение “Терминатор Сектора”",
    date: Date.now() - 8 * 60 * 60 * 1000,
  },
];

const InfluenceNotificatons = () => {
  const [curTab, setCurTab] = useState(tabs[0].key);
  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <section className={`${styles.influenceNotificatons} container`}>
      <TitleH3 wingsReverse={false} hideDotline>
        {titleText[language]}
      </TitleH3>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomIn}
        className={styles.influenceNotificatons__notificationsCount}
      >
        <span>{newMessagesCountText[language](5)}</span>
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.influenceNotificatons__dotsLine}
      >
        <DotsLineFullscreen preserveAspectRatio />
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.influenceNotificatons__tabbar}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCurTab(tab.key)}
            className={`${styles.influenceNotificatons__tab} ${
              curTab === tab.key ? styles.influenceNotificatons__tab_active : ""
            }`}
          >
            {tab.icon}
            <span>{tab.name[language]}</span>
          </button>
        ))}
      </TransitionProvider>
      <div className={styles.influenceNotificatons__list}>
        {notifications.map((not, index) => (
          <TransitionProvider
            inProp={gameInited}
            style={TransitionStyleTypes.bottom}
            delay={index * 100}
            className={styles.influenceNotificatons__item}
            key={not.id}
          >
            <div className={styles.influenceNotificatons__iconWrapper}>
              {subtypeIcons[not.subtype]}
            </div>
            <div className={styles.influenceNotificatons__main}>
              <h4 className={styles.influenceNotificatons__title}>
                {not.title}
              </h4>
              <p className={styles.influenceNotificatons__descriptionText}>
                {not.description}{" "}
                <span className="primaryText">{agoText[language](3)}</span>
              </p>
              <div className={styles.influenceNotificatons__itemFooter}>
                <button className={styles.influenceNotificatons__showBtn}>
                  <div className={styles.influenceNotificatons__showBtnInner}>
                    <ShowInMapIcon />
                    <span>{showOnMapText[language]}</span>
                  </div>
                </button>
                <button className={styles.influenceNotificatons__deleteBtn}>
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </TransitionProvider>
        ))}
      </div>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.influenceNotificatons__wings}
      >
        <HeaderWings reversed />
      </TransitionProvider>
    </section>
  );
};

export default InfluenceNotificatons;
