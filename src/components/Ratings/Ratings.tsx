import React, { useState } from "react";
import HeaderWithBackButton from "../layout/HeaderWithBackButton/HeaderWithBackButton";
import { useNavigate } from "react-router-dom";
import { ClanIcon, PlayerIcon } from "../layout/icons/Influence/BottomNavbar";
import MainInput from "../layout/MainInput/MainInput";
import { SearchLupeIcon } from "../layout/icons/Common";
import WrapperWithFrame from "../layout/WrapperWithFrame/WrapperWithFrame";
import Table from "../layout/Table/Table";

import styles from "./Ratings.module.scss";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";
import { useAppSelector } from "../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../providers/TransitionProvider";

const {
  titleText,
  playerTabText,
  clanTabText,
  sortTexts,
  searchPlaceholder,
  tableHeaderTexts,
} = TRANSLATIONS.rating;

const sorts = [
  { name: sortTexts.level, value: "level" },
  { name: sortTexts.params, value: "params" },
  { name: sortTexts.winrate, value: "winrate" },
  { name: sortTexts.activity, value: "activity" },
];

const data = [
  ...Array.from({ length: 20 }, (_, i) => ({
    index: i + 1,
    username: `Player_${Math.floor(Math.random() * 10000)}`,
    rating: Math.floor(Math.random() * 2000) + 500,
  })),
];

const Ratings = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const [selectedType, setSelectedType] = useState<"player" | "clan">("player");
  const [selectedSort, setSelectedSort] = useState(sorts[0].value);
  return (
    <section className={`container ${styles.ratings}`}>
      <HeaderWithBackButton
        onClose={() => navigate(-1)}
        title={titleText[language]}
      />
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.top}
        className={styles.ratings__typeTabs}
      >
        <button
          onClick={() => setSelectedType("player")}
          className={`${styles.ratings__typeTabBtn} ${
            selectedType === "player" ? styles.ratings__typeTabBtn_active : ""
          }`}
        >
          <div className={styles.ratings__typeTabBtnInner}>
            <PlayerIcon />
            <span>{playerTabText[language]}</span>
          </div>
        </button>
        <button
          onClick={() => setSelectedType("clan")}
          className={`${styles.ratings__typeTabBtn} ${
            selectedType === "clan" ? styles.ratings__typeTabBtn_active : ""
          }`}
        >
          <div className={styles.ratings__typeTabBtnInner}>
            <ClanIcon />
            <span>{clanTabText[language]}</span>
          </div>
        </button>
      </TransitionProvider>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.bottom}
        className={styles.ratings__sortTabs}
      >
        {sorts.map((sort) => (
          <button
            key={sort.value}
            onClick={() => setSelectedSort(sort.value)}
            className={`${styles.ratings__sortTabBtn} ${
              selectedSort === sort.value
                ? styles.ratings__sortTabBtn_active
                : ""
            }`}
          >
            {sort.name[language]}
          </button>
        ))}
      </TransitionProvider>
      <MainInput
        placeholder={searchPlaceholder[language]}
        icon={<SearchLupeIcon />}
      />
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomIn}
        className={styles.ratings__main}
      >
        <WrapperWithFrame
          size="lg"
          className={styles.ratings__mainWrapper}
          innerClassName={styles.ratings__mainWrapperInner}
        >
          <Table
            className={styles.ratings__table}
            columnsTemplate="1fr 2fr 2fr"
            headers={Object.values(tableHeaderTexts)}
            data={data}
            cols={[{ key: "index" }, { key: "username" }, { key: "rating" }]}
          />
        </WrapperWithFrame>
      </TransitionProvider>
    </section>
  );
};

export default Ratings;
