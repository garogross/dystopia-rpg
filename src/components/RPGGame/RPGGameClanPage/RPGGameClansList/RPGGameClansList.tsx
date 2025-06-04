import React, { useState } from "react";

import styles from "./RPGGameClansList.module.scss";
import { IClan } from "../../../../models/IClan";
import SortList, { SortItem } from "../../../layout/SortList/SortList";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";
import { rpgGamePagePath, rpgGameClansPagePath } from "../../../../router/constants";
import TransitionProvider, { TransitionStyleTypes } from "../../../../providers/TransitionProvider";
import { RPGGameClanListAccordionSwitcherIcon, RPGGameClanListDotsline, RPGGameClanListRequestIcon, RPGGameClanListViewIcon } from "../../../layout/icons/RPGGame/RPGGameClanPage/RPGGameClanList";

interface Props {
  sortDisabled?: boolean;
  avoidAccordion?: boolean;
  clans: IClan[];
}

const sortItems: SortItem[] = [
  {
    name: "Название",
    id: "name",
  },
  {
    name: "Состав",
    id: "participants",
  },
  {
    name: "Ур.",
    id: "level",
  },
];

const RPGGameClansList: React.FC<Props> = ({
  sortDisabled,
  clans,
  avoidAccordion,
}) => {
  const navigate = useNavigate();
  const [openedItemId, setOpenedItemId] = useState<string | null>(null);
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const goToSingleClan = (clanId: string) => {
    navigate(`${rpgGamePagePath}/${rpgGameClansPagePath}/${clanId}`);
  };

  return (
    <div className={styles.rpgGameClansList}>
      <SortList
        items={sortItems}
        onChange={() => {}}
        activeSort={""}
        className={styles.rpgGameClansList__sortList}
        disabled={sortDisabled}
      />
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.rpgGameClansList__main}
      >
        {clans.map((clan) => (
          <div key={clan.id} className={styles.rpgGameClansList__item}>
            {!avoidAccordion && (
              <div className={styles.rpgGameClansList__itemDotsLine}>
                <RPGGameClanListDotsline />
              </div>
            )}
            <button
              onClick={() => {
                if (avoidAccordion) goToSingleClan(clan.id);
                setOpenedItemId((prev) => (prev === clan.id ? null : clan.id));
              }}
              className={styles.rpgGameClansList__itemMain}
            >
              <span className={styles.rpgGameClansList__itemNameBlock}>
                <img
                  src={clan.image}
                  alt={clan.name}
                  className={styles.rpgGameClansList__itemLogoImg}
                />
                <span className={styles.rpgGameClansList__itemText}>
                  {clan.name}
                </span>
              </span>
              <span className={styles.rpgGameClansList__itemText}>
                {clan.participants.length}/{clan.participantsLimit}
              </span>
              <span className={styles.rpgGameClansList__levelBlock}>
                <span className={styles.rpgGameClansList__itemText}>
                  {clan.level}
                </span>
                {!avoidAccordion && (
                  <RPGGameClanListAccordionSwitcherIcon
                    open={openedItemId === clan.id}
                  />
                )}
              </span>
            </button>
            <TransitionProvider
              inProp={!avoidAccordion && openedItemId === clan.id}
              style={TransitionStyleTypes.height}
              height={34}
              className={styles.rpgGameClansList__itemDropdownContent}
            >
              <button
                onClick={() => goToSingleClan(clan.id)}
                className={styles.rpgGameClansList__itemDropdownContentBtn}
              >
                <div
                  className={styles.rpgGameClansList__itemDropdownContentBtnInner}
                >
                  <RPGGameClanListViewIcon />
                  <span>Подробнее</span>
                </div>
              </button>
              <button className={styles.rpgGameClansList__itemDropdownContentBtn}>
                <div
                  className={styles.rpgGameClansList__itemDropdownContentBtnInner}
                >
                  <RPGGameClanListRequestIcon />
                  <span>Подать заявку</span>
                </div>
              </button>
            </TransitionProvider>
          </div>
        ))}
      </TransitionProvider>
    </div>
  );
};

export default RPGGameClansList;