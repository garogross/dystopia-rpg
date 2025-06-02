import React from "react";

import styles from "./GamePlayAreaHeader.module.scss";
import { rivalAvatarImage } from "../../../../assets/images";
import HeartIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/HeartIcon";
import SheildIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/SheildIcon";
import GamePlayAreaHeaderSettingsIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/GamePlayAreaHeaderSettingsIcon";
import PowerSheildIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/PowerSheildIcon";
import { ICharacter } from "../../../../models/ICharacter";
import GamePlayAreaHeaderLogArrowsIcon from "../../../layout/icons/game/GamePlayArea/GamePlayAreaHeader/GamePlayAreaHeaderLogArrowsIcon";
import { getCharacterModel } from "../../../../utils/getCharacterModel";
import { useAppSelector } from "../../../../hooks/redux";

const ORDER_ITEM_WIDTH = 20;
const ORDERS_GAP = 6;

interface Props {
  characters: ICharacter[] | null;
  activeOrderIndex: number;
  curCharacter: ICharacter | null;
}

const GamePlayAreaHeader: React.FC<Props> = ({
  characters,
  activeOrderIndex,
  curCharacter,
}) => {
  const username = useAppSelector((state) => state.profile.username);

  if (!curCharacter || !characters) return null;
  const model = getCharacterModel(curCharacter.modelId);

  return (
    <header className={styles.gamePlayAreaHeader}>
      <div className={styles.gamePlayAreaHeader__curChar}>
        <div
          className={`${styles.gamePlayAreaHeader__avatarImgWrapper} ${styles.gamePlayAreaHeader__avatarImgWrapper_left}`}
        >
          <div className={styles.gamePlayAreaHeader__avatarImgInner}>
            <img
              src={model.avatar}
              alt="avatar"
              className={styles.gamePlayAreaHeader__avatarImg}
            />
          </div>
        </div>
        <div className={styles.gamePlayAreaHeader__curCharInner}>
          <div className={styles.gamePlayAreaHeader__curCharInfo}>
            <h6 className={styles.gamePlayAreaHeader__curCharNameText}>
              {username}
            </h6>
            <div className={styles.gamePlayAreaHeader__curCharDetails}>
              <div className={styles.gamePlayAreaHeader__curCharDetailItem}>
                <HeartIcon />
                <h4 className={styles.gamePlayAreaHeader__curCharDetailsText}>
                  {curCharacter.battle_parameters.max_hp || 0}
                </h4>
              </div>
              <div className={styles.gamePlayAreaHeader__curCharDetailItem}>
                <SheildIcon />
                <h4 className={styles.gamePlayAreaHeader__curCharDetailsText}>
                  {curCharacter.parameters?.damage || 0}
                </h4>
              </div>
              <div className={styles.gamePlayAreaHeader__curCharDetailItem}>
                <PowerSheildIcon />
                <h4 className={styles.gamePlayAreaHeader__curCharDetailsText}>
                  {curCharacter.parameters?.shield_power || 0}
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
                  src={getCharacterModel(item.modelId, !!item.mob_name).avatar}
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
              {characters[activeOrderIndex].owned
                ? username
                : characters[activeOrderIndex]?.mob_name || ""}
            </span>
            <GamePlayAreaHeaderLogArrowsIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GamePlayAreaHeader;
