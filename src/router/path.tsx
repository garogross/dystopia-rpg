import React, { ReactElement } from "react";

import HomePage from "../pages/HomePage";
import GamePage from "../pages/Game/GamePage";
import GameCharacterPage from "../pages/Game/GameCharacterPage";
import GameChallengesPage from "../pages/Game/GameChallengesPage";
import GameMinigamesPage from "../pages/Game/GameMinigamesPage";
import GameDuelPage from "../pages/Game/GameDuelPage";
import GameClanPage from "../pages/Game/GameClanPage";
import {
  gamePagePath,
  gameChallengesPagePath,
  gameSingleChallengePagePath,
  gameMinigamesPagePath,
  gameDuelPagePath,
  gameClanPagePath,
  gameLoyalityPagePath,
  gameReferalsPagePath,
  gameSkinViewPagePath,
  gameClanSearchPagePath,
  gameCreateClanPagePath,
  gameClansPagePath,
  gamePlayAreaPagePath,
} from "./constants";
import GameLoyalityPage from "../pages/Game/GameLoyalityPage";
import GameSingleChalangePage from "../pages/Game/GameSingleChalangePage";
import GameReferalsPage from "../pages/Game/GameReferalsPage";
import GameSkinViewPage from "../pages/Game/GameSkinViewPage";
import GameClanSearchPage from "../pages/Game/GameClanSearchPage";
import GameCreateClanPage from "../pages/Game/GameCreateClanPage";
import GameSingeClanPage from "../pages/Game/GameSingeClanPage";
import GamePlayAreaPage from "../pages/Game/GamePlayAreaPage";

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
    path: gamePagePath,
    component: <GamePage />,
    indexComponent: <GameCharacterPage />,
    children: [
    
      {
        path: gameChallengesPagePath,
        component: <GameChallengesPage />,
      },
      {
        path: gameMinigamesPagePath,
        component: <GameMinigamesPage />,
      },
      {
        path: gameDuelPagePath,
        component: <GameDuelPage />,
      },
      {
        path: gameClanPagePath,
        component: <GameClanPage />,
      },
      {
        path: gameClanSearchPagePath,
        component: <GameClanSearchPage />,
      },
      {
        path: gameCreateClanPagePath,
        component: <GameCreateClanPage />,
      },
      {
        path: `${gameClansPagePath}/:id`,
        component: <GameSingeClanPage />,
      },
      {
        path: gameLoyalityPagePath,
        component: <GameLoyalityPage />,
      },
      {
        path: `${gameSingleChallengePagePath}/:id`,
        component: <GameSingleChalangePage />,
      },
      {
        path: gameReferalsPagePath,
        component: <GameReferalsPage />,
      },
      {
        path: gameSkinViewPagePath,
        component: <GameSkinViewPage />,
      },
    ],
  },
  {
    path: gamePlayAreaPagePath,
    component: <GamePlayAreaPage />,
  },
];
