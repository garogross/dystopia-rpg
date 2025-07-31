import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  HeaderBottomBg,
  HeaderBtnsBg,
  HeaderMailIcon,
  HeaderPremiumIcon,
  HeaderRatingIcon,
  HeaderReferenceIcon,
  HeaderSettingsIcon,
  HeaderSwitcherIcon,
} from "../../layout/icons/Common/Header";
import { DotsLine } from "../../layout/icons/RPGGame/Common";
import styles from "./InfluenceHeader.module.scss";
import {
  influenceMailPagePath,
  influencePagePath,
  influenceReferalsPagePath,
  onBoardingPagePath,
} from "../../../router/constants";
import StatImg from "../../layout/StatImg/StatImg";
import { EStats } from "../../../constants/EStats";
import {
  ColorSwitcherIcon,
  RadiusSwitcherIcon,
} from "../../layout/icons/Influence/InfluenceHeader";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  influenceEnergyImage,
  influenceEnergyImageWebp,
} from "../../../assets/imageMaps";
import { formatNumber } from "../../../utils/formatNumber";
import { useState } from "react";
import { formatTime } from "../../../utils/formatTime";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { openRestoreModal } from "../../../store/slices/influence/influenceSlice";
import SettingsModal from "../../SettingsModal/SettingsModal";
import { useInfluenceRestoretimer } from "../../../hooks/influence/useInfluenceRestoretimer";

const { throughText } = TRANSLATIONS.influence.header;
const { getPremiumText } = TRANSLATIONS.common;

const ActionPointTimer = () => {
  const language = useAppSelector((state) => state.ui.language);
  const actionPointMax = useAppSelector(
    (state) => state.influence.settings.actionPointMax
  );
  const actionPoints = useAppSelector(
    (state) => state.influence.influence.actionPoints
  );
  const actionPointRestore = useAppSelector(
    (state) => state.influence.settings.actionPointRestore
  );
  const timeLeft = useInfluenceRestoretimer();

  return (
    <div className={styles.influenceHeader__timer}>
      {actionPoints < actionPointMax && (
        <>
          <span>
            +{actionPointRestore.amount} {throughText[language]}
          </span>
          <span>({formatTime(timeLeft)})</span>
        </>
      )}{" "}
    </div>
  );
};

const InfluenceHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const cp = useAppSelector((state) => state.profile.stats.cp);
  const actionPoints = useAppSelector(
    (state) => state.influence.influence.actionPoints
  );
  const actionPointMax = useAppSelector(
    (state) => state.influence.settings.actionPointMax
  );
  const [settingsOpened, setSettingsOpened] = useState(false);

  const linkActiveClass =
    (className?: string) =>
    ({ isActive }: { isActive: boolean }) =>
      isActive
        ? `${styles.influenceHeader__navBtn_active} ${
            styles.influenceHeader__navBtn
          } ${className || ""}`
        : `${styles.influenceHeader__navBtn} ${className || ""}`;

  const onSwith = () => {
    // removeLSItem(lsProps.selectedGameLink);
    navigate(onBoardingPagePath);
  };
  return (
    <header
      className={`${styles.influenceHeader} ${
        gameInited ? styles.influenceHeader_inited : ""
      }`}
    >
      <div
        className={`${styles.influenceHeader__cornerBlock} ${styles.influenceHeader__cornerBlock_left}`}
      >
        <div className={styles.influenceHeader__headerBtnsBg}>
          <HeaderBtnsBg />
        </div>
        <div className={styles.influenceHeader__dotsLine}>
          <DotsLine />
        </div>
        <button onClick={onSwith} className={styles.influenceHeader__mainBtn}>
          <HeaderSwitcherIcon />
        </button>
        <div className={styles.influenceHeader__navBtns}>
          <NavLink to={"/mingames"} className={linkActiveClass()}>
            <HeaderReferenceIcon />
          </NavLink>
          <NavLink
            to={`${influencePagePath}/${influenceMailPagePath}`}
            className={linkActiveClass(styles.influenceHeader__mailBtn)}
          >
            <HeaderMailIcon />
          </NavLink>
        </div>
        <div className={styles.influenceHeader__stat}>
          <StatImg stat={EStats.cp} size={19} />
          <span className={styles.influenceHeader__statText}>
            {formatNumber(cp, undefined, true)}
          </span>
        </div>
      </div>
      <button className={styles.influenceHeader__premiumBtn}>
        <HeaderPremiumIcon />
        <span>{getPremiumText[language]}</span>
      </button>
      <div
        className={`${styles.influenceHeader__cornerBlock} ${styles.influenceHeader__cornerBlock_right}`}
      >
        <div className={styles.influenceHeader__headerBtnsBg}>
          <HeaderBtnsBg />
        </div>
        <div className={styles.influenceHeader__dotsLine}>
          <DotsLine />
        </div>
        <button
          onClick={() => setSettingsOpened(true)}
          className={styles.influenceHeader__mainBtn}
        >
          <HeaderSettingsIcon />
        </button>
        <div className={styles.influenceHeader__navBtns}>
          <NavLink
            to={"/rating"}
            className={linkActiveClass(styles.influenceHeader__ratingBtn)}
          >
            <HeaderRatingIcon />
          </NavLink>
          <NavLink
            to={`${influencePagePath}/${influenceReferalsPagePath}`}
            className={linkActiveClass()}
          >
            <HeaderReferenceIcon />
          </NavLink>
        </div>
        <div
          onClick={() => dispatch(openRestoreModal("fill"))}
          className={styles.influenceHeader__stat}
        >
          <ImageWebp
            src={influenceEnergyImage}
            srcSet={influenceEnergyImageWebp}
            alt="energy"
            className={styles.influenceHeader__energyImg}
          />
          <span className={styles.influenceHeader__statText}>
            {actionPoints}/{actionPointMax}
          </span>
          <ActionPointTimer />
        </div>
      </div>

      <div className={styles.influenceHeader__bottomBlock}>
        <div className={styles.influenceHeader__bottomBlockBg}>
          <HeaderBottomBg />
        </div>
        <div className={styles.influenceHeader__bottomBtns}>
          <button className={styles.influenceHeader__bottomBtn}>
            <RadiusSwitcherIcon />
          </button>
          <button className={styles.influenceHeader__bottomBtn}>
            <ColorSwitcherIcon />
          </button>
        </div>
      </div>
      <SettingsModal
        show={settingsOpened}
        onClose={() => setSettingsOpened(false)}
      />
    </header>
  );
};

export default InfluenceHeader;
