import React from "react";

import styles from "./RPGGamePlayAreaHeader.module.scss";
import { rivalAvatarImage } from "../../../../assets/imageMaps";
import {HeartIcon,
  SheildIcon,
RPGGamePlayAreaHeaderSettingsIcon,
PowerSheildIcon,
RPGGamePlayAreaHeaderLogArrowsIcon,
} from "../../../layout/icons/RPGGame/RPGGamePlayArea/RPGGamePlayAreaHeader";
import { getCharacterModel } from "../../../../utils/getCharacterModel";
import { useAppSelector } from "../../../../hooks/redux";
import { ICharacter } from "../../../../models/ICharacter";

const ORDER_ITEM_WIDTH = 20;
const ORDERS_GAP = 6;

interface Props {
  characters: ICharacter[] | null;
  activeOrderIndex: number;
  curCharacter: ICharacter | null;
}

const RPGGamePlayAreaHeader: React.FC<Props> = ({
  characters,
  activeOrderIndex,
  curCharacter,
}) => {
  const username = useAppSelector((state) => state.profile.username);

  if (!curCharacter || !characters) return null;
  const model = getCharacterModel(curCharacter.modelId);

  return (
    <header className={styles.rpgGamePlayAreaHeader}>
      <div className={styles.rpgGamePlayAreaHeader__curChar}>
        <div
          className={`${styles.rpgGamePlayAreaHeader__avatarImgWrapper} ${styles.rpgGamePlayAreaHeader__avatarImgWrapper_left}`}
        >
          <div className={styles.rpgGamePlayAreaHeader__avatarImgInner}>
            <img
              src={model.avatar}
              alt="avatar"
              className={styles.rpgGamePlayAreaHeader__avatarImg}
            />
          </div>
        </div>
        <div className={styles.rpgGamePlayAreaHeader__curCharInner}>
          <div className={styles.rpgGamePlayAreaHeader__curCharInfo}>
            <h6 className={styles.rpgGamePlayAreaHeader__curCharNameText}>
              {username}
            </h6>
            <div className={styles.rpgGamePlayAreaHeader__curCharDetails}>
              <div className={styles.rpgGamePlayAreaHeader__curCharDetailItem}>
                <HeartIcon />
                <h4 className={styles.rpgGamePlayAreaHeader__curCharDetailsText}>
                  {curCharacter.battle_parameters.max_hp || 0}
                </h4>
              </div>
              <div className={styles.rpgGamePlayAreaHeader__curCharDetailItem}>
                <SheildIcon />
                <h4 className={styles.rpgGamePlayAreaHeader__curCharDetailsText}>
                  {curCharacter.parameters?.damage || 0}
                </h4>
              </div>
              <div className={styles.rpgGamePlayAreaHeader__curCharDetailItem}>
                <PowerSheildIcon />
                <h4 className={styles.rpgGamePlayAreaHeader__curCharDetailsText}>
                  {curCharacter.parameters?.shield_power || 0}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rpgGamePlayAreaHeader__settings}>
        <div className={styles.rpgGamePlayAreaHeader__settingsInner}>
          <RPGGamePlayAreaHeaderSettingsIcon />
        </div>
      </div>
      <div className={styles.rpgGamePlayAreaHeader__statusPanel}>
        <div
          className={`${styles.rpgGamePlayAreaHeader__avatarImgWrapper} ${styles.rpgGamePlayAreaHeader__avatarImgWrapper_right}`}
        >
          <div className={styles.rpgGamePlayAreaHeader__avatarImgInner}>
            <img
              src={rivalAvatarImage}
              alt="rival avatar"
              className={styles.rpgGamePlayAreaHeader__avatarImg}
            />
          </div>
        </div>
        <div className={styles.rpgGamePlayAreaHeader__statusPanelMain}>
          <div
            style={{
              gap: 6,
            }}
            className={styles.rpgGamePlayAreaHeader__statusPanelOrder}
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
              className={styles.rpgGamePlayAreaHeader__statusPanelOrderActiveFrame}
            ></div>
            {characters.map((item, index) => (
              <div
                key={index}
                style={{
                  width: ORDER_ITEM_WIDTH,
                  height: ORDER_ITEM_WIDTH,
                }}
                className={styles.rpgGamePlayAreaHeader__statusPanelOrderItem}
              >
                <img
                  src={getCharacterModel(item.modelId, !!item.mob_name).avatar}
                  alt="avatar"
                  className={styles.rpgGamePlayAreaHeader__statusPanelOrderItemImg}
                />
                <span
                  className={
                    styles.rpgGamePlayAreaHeader__statusPanelOrderItemIndexText
                  }
                >
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rpgGamePlayAreaHeader__statusPanelLogs}>
          <div className={styles.rpgGamePlayAreaHeader__statusPanelLogsInner}>
            <span className={styles.rpgGamePlayAreaHeader__statusPanelLogsText}>
              {characters[activeOrderIndex].owned
                ? username
                : characters[activeOrderIndex]?.mob_name || ""}
            </span>
            <RPGGamePlayAreaHeaderLogArrowsIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default RPGGamePlayAreaHeader;
