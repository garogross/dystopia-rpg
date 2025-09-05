import React, { useState } from "react";
import {
  AchievmentsIcon,
  ModeSelectIcon,
  NecrobombIcon,
  RatingsIcon,
} from "../../layout/icons/BubbleFront/BubbleFrontBottomNavbar";
import { TopBtnBg } from "../../layout/icons/BubbleFront/BubbleFrontBottomNavbar/TopBtnBg";
import BottomBtnBg from "../../layout/icons/BubbleFront/BubbleFrontBottomNavbar/BottomBtnBg";
import styles from "./BubbleFrontBottomNavbar.module.scss";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import { BottomWings } from "../../layout/icons/HackTerminal/HackTerminalBottomNavbar";
import {
  bubbleFrontAchievmentsPagePath,
  bubbleFrontPagePath,
  bubbleFrontRatingsPagePath,
} from "../../../router/constants";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import BubbleFrontGun from "./BubbleFrontGun/BubbleFrontGun";
import BubbleFrontMainBuyNecroBallModal from "../BubbleFrontBuyNecroBallModal/BubbleFrontBuyNecroBallModal";
import { setNextBalls } from "../../../store/slices/bubbleFront/bubbleFrontSlice";
import { EBubbleFrontBalls } from "../../../constants/bubbleFront/EBubbleFrontBalls";
import BubbleFrontLevelDifficultyModal from "../BubbleFrontLevelDifficultyModal/BubbleFrontLevelDifficultyModal";
import { useTooltip } from "../../../hooks/useTooltip";
import Tooltip from "../../layout/Tooltip/Tooltip";

const { modeSelectText, ratingsText, necrobombText, achievementsText } =
  TRANSLATIONS.bubbleFront.bottomNavbar;
const { inDevelopmentText } = TRANSLATIONS.common;

const BubbleFrontBottomNavbar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const nextBalls = useAppSelector(
    (state) => state.bubbleFront.global.nextBalls
  );
  const [buyNecroBallModalOpened, setBuyNecroBallModalOpened] = useState(false);
  const [difficultyLevelModalOpened, setDifficultyLevelModalOpened] =
    useState(false);
  const isMainPage = useMatch(bubbleFrontPagePath);
  const { show, openTooltip } = useTooltip();

  const linkActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.bubbleFrontBottomNavbar__btn_active} ${styles.bubbleFrontBottomNavbar__btn}`
      : `${styles.bubbleFrontBottomNavbar__btn}`;

  const onBuyNecroBall = () => {
    if (nextBalls) {
      const updatedNextBalls = [...nextBalls] as typeof nextBalls;
      updatedNextBalls.pop();
      updatedNextBalls.unshift(EBubbleFrontBalls.NEKRO_BALL);

      dispatch(setNextBalls(updatedNextBalls));
    }
  };
  return (
    <div className={styles.bubbleFrontBottomNavbar}>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.bubbleFrontBottomNavbar__main}
      >
        <div className={styles.bubbleFrontBottomNavbar__col}>
          <button
            onClick={() => setDifficultyLevelModalOpened(true)}
            className={styles.bubbleFrontBottomNavbar__btn}
          >
            <ModeSelectIcon />
            <span>{modeSelectText[language]}</span>
            <div className={styles.bubbleFrontBottomNavbar__btnBg}>
              <TopBtnBg />
            </div>
          </button>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              openTooltip();
            }}
            to={bubbleFrontRatingsPagePath}
            className={linkActiveClass}
          >
            <RatingsIcon />
            <span>{ratingsText[language]}</span>
            <div className={styles.bubbleFrontBottomNavbar__btnBg}>
              <BottomBtnBg
                reversed
                active={location.pathname.endsWith(bubbleFrontRatingsPagePath)}
              />
            </div>
          </NavLink>
        </div>
        <BubbleFrontGun />
        <div className={styles.bubbleFrontBottomNavbar__col}>
          <button
            disabled={!isMainPage}
            onClick={() => setBuyNecroBallModalOpened(true)}
            className={styles.bubbleFrontBottomNavbar__btn}
          >
            <NecrobombIcon />
            <span>{necrobombText[language]}</span>
            <div className={styles.bubbleFrontBottomNavbar__btnBg}>
              <TopBtnBg reversed />
            </div>
          </button>
          <NavLink
            to={bubbleFrontAchievmentsPagePath}
            className={linkActiveClass}
            onClick={(e) => {
              e.preventDefault();
              openTooltip();
            }}
          >
            <AchievmentsIcon />
            <span>{achievementsText[language]}</span>
            <div className={styles.bubbleFrontBottomNavbar__btnBg}>
              <BottomBtnBg
                active={location.pathname.endsWith(
                  bubbleFrontAchievmentsPagePath
                )}
              />
            </div>
          </NavLink>
        </div>
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.bubbleFrontBottomNavbar__bottowmWings}
      >
        <BottomWings />
      </TransitionProvider>
      <BubbleFrontMainBuyNecroBallModal
        show={buyNecroBallModalOpened}
        onClose={() => setBuyNecroBallModalOpened(false)}
        onBuy={onBuyNecroBall}
      />
      <BubbleFrontLevelDifficultyModal
        show={difficultyLevelModalOpened}
        onClose={() => setDifficultyLevelModalOpened(false)}
      />
      <Tooltip show={show} text={inDevelopmentText[language]} />
    </div>
  );
};

export default BubbleFrontBottomNavbar;
