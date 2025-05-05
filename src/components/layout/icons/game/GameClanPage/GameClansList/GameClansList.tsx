import React, { useState } from "react";

import styles from "./GameClansList.module.scss";
import SortList, { SortItem } from "../../../../SortList/SortList";
import { IClan } from "../../../../../../models/IClan";
import GameClanListDotsline from "../GameClanList/GameClanListDotsline";
import GameClanListAccordionSwitcherIcon from "../GameClanList/GameClanListAccordionSwitcherIcon";
import GameClanListViewIcon from "../GameClanList/GameClanListViewIcon";
import GameClanListRequestIcon from "../GameClanList/GameClanListRequestIcon";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import {
  gameClansPagePath,
  gamePagePath,
} from "../../../../../../router/constants";

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

const GameClansList: React.FC<Props> = ({
  sortDisabled,
  clans,
  avoidAccordion,
}) => {
  const navigate = useNavigate();
  const [openedItemId, setOpenedItemId] = useState<string | null>(null);
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const goToSingleClan = (clanId: string) => {
    navigate(`${gamePagePath}/${gameClansPagePath}/${clanId}`);
  };

  return (
    <div className={styles.gameClansList}>
      <SortList
        items={sortItems}
        onChange={() => {}}
        activeSort={""}
        className={styles.gameClansList__sortList}
        disabled={sortDisabled}
      />
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.gameClansList__main}
      >
        {clans.map((clan) => (
          <div key={clan.id} className={styles.gameClansList__item}>
            {!avoidAccordion && (
              <div className={styles.gameClansList__itemDotsLine}>
                <GameClanListDotsline />
              </div>
            )}
            <button
              onClick={() => {
                if (avoidAccordion) goToSingleClan(clan.id);
                setOpenedItemId((prev) => (prev === clan.id ? null : clan.id));
              }}
              className={styles.gameClansList__itemMain}
            >
              <span className={styles.gameClansList__itemNameBlock}>
                <img
                  src={clan.image}
                  alt={clan.name}
                  className={styles.gameClansList__itemLogoImg}
                />
                <span className={styles.gameClansList__itemText}>
                  {clan.name}
                </span>
              </span>
              <span className={styles.gameClansList__itemText}>
                {clan.participants.length}/{clan.participantsLimit}
              </span>
              <span className={styles.gameClansList__levelBlock}>
                <span className={styles.gameClansList__itemText}>
                  {clan.level}
                </span>
                {!avoidAccordion && (
                  <GameClanListAccordionSwitcherIcon
                    open={openedItemId === clan.id}
                  />
                )}
              </span>
            </button>
            <TransitionProvider
              inProp={!avoidAccordion && openedItemId === clan.id}
              style={TransitionStyleTypes.height}
              height={34}
              className={styles.gameClansList__itemDropdownContent}
            >
              <button
                onClick={() => goToSingleClan(clan.id)}
                className={styles.gameClansList__itemDropdownContentBtn}
              >
                <div
                  className={styles.gameClansList__itemDropdownContentBtnInner}
                >
                  <GameClanListViewIcon />
                  <span>Подробнее</span>
                </div>
              </button>
              <button className={styles.gameClansList__itemDropdownContentBtn}>
                <div
                  className={styles.gameClansList__itemDropdownContentBtnInner}
                >
                  <GameClanListRequestIcon />
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

export default GameClansList;
