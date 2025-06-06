import React, { ReactElement } from "react";

import HomePage from "../pages/HomePage";
import GamePage from "../pages/Game/GamePage";
import GameCharacterPage from "../pages/Game/GameCharacterPage";
import GameChallengesPage from "../pages/Game/GameChallengesPage";
import GameMinigamesPage from "../pages/Game/GameMinigamesPage";
import GameDuelPage from "../pages/Game/GameDuelPage";
import GameClanPage from "../pages/Game/GameClanPage";
import {
  rpgGamePagePath,
  rpgGameChallengesPagePath,
  rpgGameSingleChallengePagePath,
  rpgGameMinigamesPagePath,
  rpgGameDuelPagePath,
  rpgGameClanPagePath,
  rpgGameLoyalityPagePath,
  rpgGameReferalsPagePath,
  rpgGameSkinViewPagePath,
  rpgGameClanSearchPagePath,
  rpgGameCreateClanPagePath,
  rpgGameClansPagePath,
  rpgGamePlayAreaPagePath,
  onBoardingPagePath,
  cyberFarmPagePath,
} from "./constants";
import GameLoyalityPage from "../pages/Game/GameLoyalityPage";
import GameSingleChalangePage from "../pages/Game/GameSingleChalangePage";
import GameReferalsPage from "../pages/Game/GameReferalsPage";
import GameSkinViewPage from "../pages/Game/GameSkinViewPage";
import GameClanSearchPage from "../pages/Game/GameClanSearchPage";
import GameCreateClanPage from "../pages/Game/GameCreateClanPage";
import GameSingeClanPage from "../pages/Game/GameSingeClanPage";
import GamePlayAreaPage from "../pages/Game/GamePlayAreaPage";
import OnBoardingPage from "../pages/OnBoardingPage";
import CyberFarmPage from "../pages/CyberFarm/CyberFarmPage";
import CyberFarmFieldsPage from "../pages/CyberFarm/CyberFarmFieldsPage";

export const homePagePath = "/";

export interface IRoute {
  path: string;
  component: ReactElement<any, any>;
  indexComponent?: ReactElement;
  children?: IRoute[];
}

export const routes: IRoute[] = [
  {
    path: homePagePath,
    component: <HomePage />,
  },
  {
    path: onBoardingPagePath,
    component: <OnBoardingPage />,
  },
  {
    path: rpgGamePagePath,
    component: <GamePage />,
    indexComponent: <GameCharacterPage />,
    children: [
      {
        path: rpgGameChallengesPagePath,
        component: <GameChallengesPage />,
      },
      {
        path: rpgGameMinigamesPagePath,
        component: <GameMinigamesPage />,
      },
      {
        path: rpgGameDuelPagePath,
        component: <GameDuelPage />,
      },
      {
        path: rpgGameClanPagePath,
        component: <GameClanPage />,
      },
      {
        path: rpgGameClanSearchPagePath,
        component: <GameClanSearchPage />,
      },
      {
        path: rpgGameCreateClanPagePath,
        component: <GameCreateClanPage />,
      },
      {
        path: `${rpgGameClansPagePath}/:id`,
        component: <GameSingeClanPage />,
      },
      {
        path: rpgGameLoyalityPagePath,
        component: <GameLoyalityPage />,
      },
      {
        path: `${rpgGameSingleChallengePagePath}/:id`,
        component: <GameSingleChalangePage />,
      },
      {
        path: rpgGameReferalsPagePath,
        component: <GameReferalsPage />,
      },
      {
        path: rpgGameSkinViewPagePath,
        component: <GameSkinViewPage />,
      },
    ],
  },
  {
    path: rpgGamePlayAreaPagePath,
    component: <GamePlayAreaPage />,
  },

  // cyberfarm
  {
    path: cyberFarmPagePath,
    component: <CyberFarmPage />,
    indexComponent: <CyberFarmFieldsPage />,
    children: [
    
    ],
  },
];
