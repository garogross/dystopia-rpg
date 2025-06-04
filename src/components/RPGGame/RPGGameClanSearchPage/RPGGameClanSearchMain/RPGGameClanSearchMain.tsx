import React from "react";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";

import styles from "./RPGGameClanSearchMain.module.scss";
import HeaderBtn from "../../../layout/HeaderBtn/HeaderBtn";
import {SearchLupeIcon} from "../../../layout/icons/RPGGame/Common";
import { CLANS } from "../../../../dummyData/clans";
import { useNavigate } from "react-router-dom";
import { gameClanPagePath, gamePagePath } from "../../../../router/constants";
import { useAppSelector } from "../../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import MainInput from "../../../layout/MainInput/MainInput";
import RPGGameClansList from "../../RPGGameClanPage/RPGGameClansList/RPGGameClansList";

const RPGGameClanSearchMain = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <WrapperWithFrame size="lg" className={styles.rpgGameClanSearchMain}>
      <div className={styles.rpgGameClanSearchMain__container}>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomOut}
          className={styles.rpgGameClanSearchMain__header}
        >
          <h3 className="titleH3Italic">Найти свой клан</h3>
          <HeaderBtn
            type="close"
            onClick={() => navigate(`${gamePagePath}/${gameClanPagePath}`)}
          />
        </TransitionProvider>

        <MainInput placeholder="Поиск..." icon={<SearchLupeIcon />} />

        <RPGGameClansList clans={CLANS} />
      </div>
    </WrapperWithFrame>
  );
};

export default RPGGameClanSearchMain;
