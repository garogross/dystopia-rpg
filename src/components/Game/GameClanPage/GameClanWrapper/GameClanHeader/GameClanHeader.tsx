import styles from "./GameClanHeader.module.scss";
import WrapperWithFrame from "../../../../layout/WrapperWithFrame/WrapperWithFrame";
import GameClanEditIcon from "../../../../layout/icons/game/GameClanPage/GameClanAbout/GameClanEditIcon";
import GameClanLeaveIcon from "../../../../layout/icons/game/GameClanPage/GameClanLeaveIcon";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../../hooks/redux";
import React from "react";
import { IClan } from "../../../../../models/IClan";

interface Props {
  clan?: {
    name: IClan["name"];
    level: IClan["level"];
    description: IClan["description"];
    image: IClan["image"];
    id: IClan["id"];
  };
  descriptionText?: React.ReactNode;
}

const GameClanHeader: React.FC<Props> = ({ clan, descriptionText }) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const userClan = useAppSelector((state) => state.clan.clan);

  return (
    <TransitionProvider inProp={gameInited} style={TransitionStyleTypes.top}>
      <header className={`${styles.gameClanHeader} container`}>
        <WrapperWithFrame>
          <div className={styles.gameClanHeader__wrapper}>
            {clan?.image && (
              <img
                src={clan?.image}
                alt="logo"
                className={styles.gameClanHeader__logoImg}
              />
            )}
            <div className={styles.gameClanHeader__main}>
              {clan?.id && (
                <div className={styles.gameClanHeader__topBlock}>
                  <div className={styles.gameClanHeader__texts}>
                    <h2 className={styles.gameClanHeader__nameText}>
                      <span>{clan.name}</span>
                      <button className={styles.gameClanHeader__editBtn}>
                        <GameClanEditIcon />
                      </button>
                    </h2>
                    <h6 className={styles.gameClanHeader__levelText}>
                      Уровень {clan.level}
                    </h6>
                  </div>
                  <button className={styles.gameClanHeader__leaveClanBtn}>
                    <div className={styles.gameClanHeader__leaveClanBtnInner}>
                      <GameClanLeaveIcon />
                      <span>
                        {clan.id === userClan?.id
                          ? "Покинуть клан"
                          : "Вступить в клан"}
                      </span>
                    </div>
                  </button>
                </div>
              )}
              <p className={styles.gameClanHeader__description}>
                {clan?.description || descriptionText}
              </p>
            </div>
          </div>
        </WrapperWithFrame>
      </header>
    </TransitionProvider>
  );
};

export default GameClanHeader;
