import styles from "./RPGGameClanHeader.module.scss";
import WrapperWithFrame from "../../../../layout/WrapperWithFrame/WrapperWithFrame";
import {RPGGameClanEditIcon} from "../../../../layout/icons/RPGGame/RPGGameClanPage/RPGGameClanAbout";
import {RPGGameClanLeaveIcon} from "../../../../layout/icons/RPGGame/RPGGameClanPage";
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

const RPGGameClanHeader: React.FC<Props> = ({ clan, descriptionText }) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const userClan = useAppSelector((state) => state.clan.clan);

  return (
    <TransitionProvider inProp={gameInited} style={TransitionStyleTypes.top}>
      <header className={`${styles.rpgGameClanHeader} container`}>
        <WrapperWithFrame>
          <div className={styles.rpgGameClanHeader__wrapper}>
            {clan?.image && (
              <img
                src={clan?.image}
                alt="logo"
                className={styles.rpgGameClanHeader__logoImg}
              />
            )}
            <div className={styles.rpgGameClanHeader__main}>
              {clan?.id && (
                <div className={styles.rpgGameClanHeader__topBlock}>
                  <div className={styles.rpgGameClanHeader__texts}>
                    <h2 className={styles.rpgGameClanHeader__nameText}>
                      <span>{clan.name}</span>
                      <button className={styles.rpgGameClanHeader__editBtn}>
                        <RPGGameClanEditIcon />
                      </button>
                    </h2>
                    <h6 className={styles.rpgGameClanHeader__levelText}>
                      Уровень {clan.level}
                    </h6>
                  </div>
                  <button className={styles.rpgGameClanHeader__leaveClanBtn}>
                    <div className={styles.rpgGameClanHeader__leaveClanBtnInner}>
                      <RPGGameClanLeaveIcon />
                      <span>
                        {clan.id === userClan?.id
                          ? "Покинуть клан"
                          : "Вступить в клан"}
                      </span>
                    </div>
                  </button>
                </div>
              )}
              <p className={styles.rpgGameClanHeader__description}>
                {clan?.description || descriptionText}
              </p>
            </div>
          </div>
        </WrapperWithFrame>
      </header>
    </TransitionProvider>
  );
};

export default RPGGameClanHeader;
