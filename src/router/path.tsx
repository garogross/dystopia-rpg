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
  gameReferalsPagePath
} from "./constants";
import GameLoyalityPage from "../pages/Game/GameLoyalityPage";
import GameSingleChalangePage from "../pages/Game/GameSingleChalangePage";
import GameReferalsPage from "../pages/Game/GameReferalsPage";

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
    ],
  },
];
