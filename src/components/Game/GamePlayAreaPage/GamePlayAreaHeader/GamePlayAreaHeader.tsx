import React from "react";

import styles from "./GamePlayAreaHeader.module.scss";
import { rivalAvatarImage } from "../../../../assets/images";
import HeartIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/HeartIcon";
import SheildIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/SheildIcon";
import GamePlayAreaHeaderSettingsIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/GamePlayAreaHeaderSettingsIcon";
import PowerSheildIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/PowerSheildIcon";
import { ICharacter } from "../../../../models/ICharacter";
import GamePlayAreaHeaderLogArrowsIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/GamePlayAreaHeaderLogArrowsIcon";

const ORDER_ITEM_WIDTH = 20;
const ORDERS_GAP = 6;

interface Props {
  characters: ICharacter[];
  activeOrderIndex: number;
  curCharacter: ICharacter | undefined;
}

const GamePlayAreaHeader: React.FC<Props> = ({
  characters,
  activeOrderIndex,
  curCharacter
}) => {

  if (!curCharacter) return null;

  return (
    <header className={styles.gamePlayAreaHeader}>
      <div className={styles.gamePlayAreaHeader__curChar}>
        <div
          className={`${styles.gamePlayAreaHeader__avatarImgWrapper} ${styles.gamePlayAreaHeader__avatarImgWrapper_left}`}
        >
          <div className={styles.gamePlayAreaHeader__avatarImgInner}>
            <img
              src={curCharacter.avatar}
              alt="avatar"
              className={styles.gamePlayAreaHeader__avatarImg}
            />
          </div>
        </div>
        <div className={styles.gamePlayAreaHeader__curCharInner}>
          <div className={styles.gamePlayAreaHeader__curCharInfo}>
            <h6 className={styles.gamePlayAreaHeader__curCharNameText}>
              {curCharacter.username}
            </h6>
            <div className={styles.gamePlayAreaHeader__curCharDetails}>
              <div className={styles.gamePlayAreaHeader__curCharDetailItem}>
                <HeartIcon />
                <h4 className={styles.gamePlayAreaHeader__curCharDetailsText}>
                  {curCharacter.hearts}%
                </h4>
              </div>
              <div className={styles.gamePlayAreaHeader__curCharDetailItem}>
                <SheildIcon />
                <h4 className={styles.gamePlayAreaHeader__curCharDetailsText}>
                  {curCharacter.sheild}%
                </h4>
              </div>
              <div className={styles.gamePlayAreaHeader__curCharDetailItem}>
                <PowerSheildIcon />
                <h4 className={styles.gamePlayAreaHeader__curCharDetailsText}>
                  {curCharacter.powerSheild}%
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gamePlayAreaHeader__settings}>
        <div className={styles.gamePlayAreaHeader__settingsInner}>
          <GamePlayAreaHeaderSettingsIcon />
        </div>
      </div>
      <div className={styles.gamePlayAreaHeader__statusPanel}>
        <div
          className={`${styles.gamePlayAreaHeader__avatarImgWrapper} ${styles.gamePlayAreaHeader__avatarImgWrapper_right}`}
        >
          <div className={styles.gamePlayAreaHeader__avatarImgInner}>
            <img
              src={rivalAvatarImage}
              alt="rival avatar"
              className={styles.gamePlayAreaHeader__avatarImg}
            />
          </div>
        </div>
        <div className={styles.gamePlayAreaHeader__statusPanelMain}>
          <div
            style={{
              gap: 6,
            }}
            className={styles.gamePlayAreaHeader__statusPanelOrder}
          >
            <div
              style={{
                width: ORDER_ITEM_WIDTH,
                height: ORDER_ITEM_WIDTH,
                left:
                  activeOrderIndex * ORDER_ITEM_WIDTH +
                  activeOrderIndex * ORDERS_GAP -
                  2,
              }}
              className={styles.gamePlayAreaHeader__statusPanelOrderActiveFrame}
            ></div>
            {characters.map((item, index) => (
              <div
                key={index}
                style={{
                  width: ORDER_ITEM_WIDTH,
                  height: ORDER_ITEM_WIDTH,
                }}
                className={styles.gamePlayAreaHeader__statusPanelOrderItem}
              >
                <img
                  src={item.avatar}
                  alt="avatar"
                  className={styles.gamePlayAreaHeader__statusPanelOrderItemImg}
                />
                <span
                  className={
                    styles.gamePlayAreaHeader__statusPanelOrderItemIndexText
                  }
                >
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.gamePlayAreaHeader__statusPanelLogs}>
          <div className={styles.gamePlayAreaHeader__statusPanelLogsInner}>
            <span className={styles.gamePlayAreaHeader__statusPanelLogsText}>
              1.Vasilisk48
            </span>
            <GamePlayAreaHeaderLogArrowsIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GamePlayAreaHeader;
