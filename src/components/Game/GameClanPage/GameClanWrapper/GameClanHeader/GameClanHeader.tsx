import styles from "./GameClanHeader.module.scss";
import WrapperWithFrame from "../../../../layout/WrapperWithFrame/WrapperWithFrame";
import { clanLogoImage } from "../../../../../assets/images";
import GameClanEditIcon from "../../../../layout/icons/game/GameClanPage/GameClanAbout/GameClanEditIcon";
import GameClanLeaveIcon from "../../../../layout/icons/game/GameClanPage/GameClanLeaveIcon";
const GameClanHeader = () => {
  return (
    <header className={`${styles.gameClanHeader} container`}>
      <WrapperWithFrame>
        <div className={styles.gameClanHeader__wrapper}>
          <img
            src={clanLogoImage}
            alt="logo"
            className={styles.gameClanHeader__logoImg}
          />
          <div className={styles.gameClanHeader__main}>
            <div className={styles.gameClanHeader__topBlock}>
              <div className={styles.gameClanHeader__texts}>
                <h2 className={styles.gameClanHeader__nameText}>
                  <span>Стальные псы</span>
                  <button className={styles.gameClanHeader__editBtn}>
                    <GameClanEditIcon />
                  </button>
                </h2>
                <h6 className={styles.gameClanHeader__levelText}>Уровень 17</h6>
              </div>
              <button className={styles.gameClanHeader__leaveClanBtn}>
                <div className={styles.gameClanHeader__leaveClanBtnInner}>
                  <GameClanLeaveIcon />
                  <span>Покинуть клан</span>
                </div>
              </button>
            </div>
            <p className={styles.gameClanHeader__description}>
              Наша хватка крепка, наша верность - закон. <br /> Присоединяйся к
              сильным.
            </p>
          </div>
        </div>
      </WrapperWithFrame>
    </header>
  );
};

export default GameClanHeader;
