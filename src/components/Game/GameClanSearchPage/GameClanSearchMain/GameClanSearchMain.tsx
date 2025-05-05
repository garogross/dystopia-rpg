import React from "react";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";

import styles from "./GameClanSearchMain.module.scss";
import HeaderBtn from "../../../layout/HeaderBtn/HeaderBtn";
import SearchLupeIcon from "../../../layout/icons/game/Common/SearchLupeIcon";
import GameClansList from "../../../layout/icons/game/GameClanPage/GameClansList/GameClansList";
import { CLANS } from "../../../../dummyData/clans";
import { useNavigate } from "react-router-dom";
import { gameClanPagePath, gamePagePath } from "../../../../router/constants";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import MainInput from "../../../layout/MainInput/MainInput";

const GameClanSearchMain = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <WrapperWithFrame size="lg" className={styles.gameClanSearchMain}>
      <div className={styles.gameClanSearchMain__container}>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomOut}
          className={styles.gameClanSearchMain__header}
        >
          <h3 className="titleH3Italic">Найти свой клан</h3>
          <HeaderBtn
            type="close"
            onClick={() => navigate(`${gamePagePath}/${gameClanPagePath}`)}
          />
        </TransitionProvider>

        <MainInput placeholder="Поиск..." icon={<SearchLupeIcon />} />

        <GameClansList clans={CLANS} />
      </div>
    </WrapperWithFrame>
  );
};

export default GameClanSearchMain;
