import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
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

const InfluenceHeader = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);

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
            to={"/mail"}
            className={linkActiveClass(styles.influenceHeader__mailBtn)}
          >
            <HeaderMailIcon />
          </NavLink>
        </div>
        <div className={styles.influenceHeader__stat}>
          <StatImg stat={EStats.cp} size={19} />
          <span className={styles.influenceHeader__statText}>126,90k</span>
        </div>
      </div>
      <button className={styles.influenceHeader__premiumBtn}>
        <HeaderPremiumIcon />
        <span>Получить премиум</span>
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
        <button className={styles.influenceHeader__mainBtn}>
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
        <div className={styles.influenceHeader__stat}>
          <ImageWebp
            src={influenceEnergyImage}
            srcSet={influenceEnergyImageWebp}
            alt="energy"
            className={styles.influenceHeader__energyImg}
          />
          <span className={styles.influenceHeader__statText}>126,90k</span>
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
    </header>
  );
};

export default InfluenceHeader;
