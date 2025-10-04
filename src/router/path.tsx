import React, { ReactElement } from "react";

import HomePage from "../pages/HomePage";
import RPGGamePage from "../pages/RPGGame/RPGGamePage";
import RPGGameCharacterPage from "../pages/RPGGame/RPGGameCharacterPage";
import RPGGameChallengesPage from "../pages/RPGGame/RPGGameChallengesPage";
import RPGGameMinigamesPage from "../pages/RPGGame/RPGGameMinigamesPage";
import RPGGameDuelPage from "../pages/RPGGame/RPGGameDuelPage";
import RPGGameClanPage from "../pages/RPGGame/RPGGameClanPage";
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
  cyberFarmFarmsPagePath,
  cyberFarmFactoriesPagePath,
  cyberFarmWarehousePagePath,
  cyberFarmSupportPagePath,
  cyberFarmReferalsPagePath,
  cyberFarmAchievmentsPagePath,
  miniGamesPagePath,
  miniGamesAchievmentsPagePath,
  miniGamesLoyalityPagePath,
  miniGamesPinnedPagePath,
  miniGamesReferalsPagePath,
  hackTerminalRulesPagePath,
  hackTerminalRatingsPagePath,
  hackTerminalPrizesPagePath,
  hackTerminalAchievmentsPagePath,
  hackTerminalLevelSelectPagePath,
  hackTerminalPagePath,
  puzzlePagePath,
  puzzleSelectModePagePath,
  puzzleGalleryPagePath,
  puzzleAchievmentsPagePath,
  puzzleRatingsPagePath,
  influencePagePath,
  influenceClanPagePath,
  influenceLoyalityPagePath,
  influencePlayerPagePath,
  influenceNotificationsPagePath,
  influenceReferalsPagePath,
  influenceCreateClanPagePath,
  influenceMyClanPagePath,
  influenceMailPagePath,
  influenceRatingsPagePath,
  bubbleFrontRatingsPagePath,
  bubbleFrontPagePath,
  bubbleFrontAchievmentsPagePath,
  cyberFarmEvoPagePath,
  cyberFarmProductionPagePath,
  cyberFarmRatingsPagePath,
  gridlinePagePath,
  gridlineAchievmentsPagePath,
  gridlineRatingsPagePath,
  gridlineLevelSelectPagePath,
} from "./constants";
import RPGGameLoyalityPage from "../pages/RPGGame/RPGGameLoyalityPage";
import RPGGameSingleChalangePage from "../pages/RPGGame/RPGGameSingleChalangePage";
import RPGGameReferalsPage from "../pages/RPGGame/RPGGameReferalsPage";
import RPGGameSkinViewPage from "../pages/RPGGame/RPGGameSkinViewPage";
import RPGGameClanSearchPage from "../pages/RPGGame/RPGGameClanSearchPage";
import RPGGameCreateClanPage from "../pages/RPGGame/RPGGameCreateClanPage";
import RPGGameSingeClanPage from "../pages/RPGGame/RPGGameSingeClanPage";
import RPGGamePlayAreaPage from "../pages/RPGGame/RPGGamePlayAreaPage";
import OnBoardingPage from "../pages/OnBoardingPage";
import CyberFarmPage from "../pages/CyberFarm/CyberFarmPage";
import CyberFarmFieldsPage from "../pages/CyberFarm/CyberFarmFieldsPage";
import CyberFarmFarmsPage from "../pages/CyberFarm/CyberFarmFarmsPage";
import CyberFarmFactoriesPage from "../pages/CyberFarm/CyberFarmFactoriesPage";
import CyberFarmWarehousePage from "../pages/CyberFarm/CyberFarmWarehousePage";
import CyberFarmSupportPage from "../pages/CyberFarm/CyberFarmSupportPage";
import CyberFarmReferalsPage from "../pages/CyberFarm/CyberFarmReferalsPage";
import CyberFarmAchievmentsPage from "../pages/CyberFarm/CyberFarmAchievmentsPage";
import MiniGamesPage from "../pages/MiniGames/MiniGamesPage";
import MiniGamesAchievmentsPage from "../pages/MiniGames/MiniGamesAchievmentsPage";
import MiniGamesCatalogPage from "../pages/MiniGames/MiniGamesCatalogPage";
import MiniGamesLoyalityPage from "../pages/MiniGames/MiniGamesLoyalityPage";
import MiniGamesPinnedPage from "../pages/MiniGames/MiniGamesPinnedPage";
import MiniGamesReferalsPage from "../pages/MiniGames/MiniGamesReferalsPage";
import HackTerminalPage from "../pages/HackTerminal/HackTerminalPage";
import HackTerminalMainPage from "../pages/HackTerminal/HackTerminalMainPage";
import HackTerminalLevelSelectPage from "../pages/HackTerminal/HackTerminalLevelSelectPage";
import HackTerminalPrizesPage from "../pages/HackTerminal/HackTerminalPrizesPage";
import HackTerminalRatingsPage from "../pages/HackTerminal/HackTerminalRatingsPage";
import HackTerminalRulesPage from "../pages/HackTerminal/HackTerminalRulesPage";
import HackTerminalAchievmentsPage from "../pages/HackTerminal/HackTerminalAchievmentsPage";
import PuzzlePage from "../pages/Puzzle/PuzzlePage";
import PuzzleMainPage from "../pages/Puzzle/PuzzleMainPage";
import PuzzleSelectModePage from "../pages/Puzzle/PuzzleSelectModePage";
import PuzzleGalleryPage from "../pages/Puzzle/PuzzleGalleryPage";
import PuzzleAchievmentsPage from "../pages/Puzzle/PuzzleAchievmentsPage";
import PuzzleRatingsPage from "../pages/Puzzle/PuzzleRatingsPage";
import InfluencePage from "../pages/Influence/InfluencePage";
import InfluenceMapPage from "../pages/Influence/InfluenceMapPage";
import InfluenceClanPage from "../pages/Influence/InfluenceClanPage";
import InfluenceLoyalityPage from "../pages/Influence/InfluenceLoyalityPage";
import InfluencePlayerPage from "../pages/Influence/InfluencePlayerPage";
import InfluenceReferalsPage from "../pages/Influence/InfluenceReferalsPage";
import InfluenceNotificatonsPage from "../pages/Influence/InfluenceNotificatonsPage";
import InfluenceCreateClanPage from "../pages/Influence/InfluenceCreateClanPage";
import InfluenceMyClanPage from "../pages/Influence/InfluenceMyClanPage";
import InfluenceMailPage from "../pages/Influence/InfluenceMailPage";
import InfluenceRatingsPage from "../pages/Influence/InfluenceRatingsPage";
import BubbleFrontPage from "../pages/BubbleFront/BubbleFrontPage";
import BubbleFrontMainPage from "../pages/BubbleFront/BubbleFrontMainPage";
import BubbleFrontAchievmentsPage from "../pages/BubbleFront/BubbleFrontAchievmentsPage";
import BubbleFrontRatingsPage from "../pages/BubbleFront/BubbleFrontRatingsPage";
import CyberFarmEvoPage from "../pages/CyberFarmEvo/CyberFarmEvoPage";
import CyberFarmEvoWarehousePage from "../pages/CyberFarmEvo/CyberFarmEvoWarehousePage";
import CyberFarmEvoSupportPage from "../pages/CyberFarmEvo/CyberFarmEvoSupportPage";
import CyberFarmEvoReferalsPage from "../pages/CyberFarmEvo/CyberFarmEvoReferalsPage";
import CyberFarmEvoAchievmentsPage from "../pages/CyberFarmEvo/CyberFarmEvoAchievmentsPage";
import CyberFarmEvoMapPage from "../pages/CyberFarmEvo/CyberFarmEvoMapPage";
import CyberFarmEvoFarmsPage from "../pages/CyberFarmEvo/CyberFarmEvoFarmsPage";
import CyberFarmEvoProductionPage from "../pages/CyberFarmEvo/CyberFarmEvoProductionPage";
import CyberFarmEvoRatingsPage from "../pages/CyberFarmEvo/CyberFarmEvoRatingsPage";
import GridlinePage from "../pages/Gridline/GridlinePage";
import GridlineMainPage from "../pages/Gridline/GridlineMainPage";
import GridlineAchievmentsPage from "../pages/Gridline/GridlineAchievmentsPage";
import GridlineRatingsPage from "../pages/Gridline/GridlineRatingsPage";
import GridlineLevelSelectPage from "../pages/Gridline/GridlineLevelSelectPage";

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
    component: <RPGGamePage />,
    indexComponent: <RPGGameCharacterPage />,
    children: [
      {
        path: rpgGameChallengesPagePath,
        component: <RPGGameChallengesPage />,
      },
      {
        path: rpgGameMinigamesPagePath,
        component: <RPGGameMinigamesPage />,
      },
      {
        path: rpgGameDuelPagePath,
        component: <RPGGameDuelPage />,
      },
      {
        path: rpgGameClanPagePath,
        component: <RPGGameClanPage />,
      },
      {
        path: rpgGameClanSearchPagePath,
        component: <RPGGameClanSearchPage />,
      },
      {
        path: rpgGameCreateClanPagePath,
        component: <RPGGameCreateClanPage />,
      },
      {
        path: `${rpgGameClansPagePath}/:id`,
        component: <RPGGameSingeClanPage />,
      },
      {
        path: rpgGameLoyalityPagePath,
        component: <RPGGameLoyalityPage />,
      },
      {
        path: `${rpgGameSingleChallengePagePath}/:id`,
        component: <RPGGameSingleChalangePage />,
      },
      {
        path: rpgGameReferalsPagePath,
        component: <RPGGameReferalsPage />,
      },
      {
        path: rpgGameSkinViewPagePath,
        component: <RPGGameSkinViewPage />,
      },
    ],
  },
  {
    path: rpgGamePlayAreaPagePath,
    component: <RPGGamePlayAreaPage />,
  },
  // cyberfarm
  {
    path: cyberFarmPagePath,
    component: <CyberFarmPage />,
    indexComponent: <CyberFarmFieldsPage />,
    children: [
      {
        path: cyberFarmFarmsPagePath,
        component: <CyberFarmFarmsPage />,
      },
      {
        path: cyberFarmFactoriesPagePath,
        component: <CyberFarmFactoriesPage />,
      },
      {
        path: cyberFarmWarehousePagePath,
        component: <CyberFarmWarehousePage />,
      },
      {
        path: cyberFarmSupportPagePath,
        component: <CyberFarmSupportPage />,
      },
      {
        path: cyberFarmReferalsPagePath,
        component: <CyberFarmReferalsPage />,
      },
      {
        path: cyberFarmAchievmentsPagePath,
        component: <CyberFarmAchievmentsPage />,
      },
    ],
  },
  // cyberfarm evo
  {
    path: cyberFarmEvoPagePath,
    component: <CyberFarmEvoPage />,
    indexComponent: <CyberFarmEvoMapPage />,
    children: [
      {
        path: cyberFarmFarmsPagePath,
        component: <CyberFarmEvoFarmsPage />,
      },
      {
        path: cyberFarmWarehousePagePath,
        component: <CyberFarmEvoWarehousePage />,
      },
      {
        path: cyberFarmSupportPagePath,
        component: <CyberFarmEvoSupportPage />,
      },
      {
        path: cyberFarmReferalsPagePath,
        component: <CyberFarmEvoReferalsPage />,
      },
      {
        path: cyberFarmAchievmentsPagePath,
        component: <CyberFarmEvoAchievmentsPage />,
      },
      {
        path: cyberFarmProductionPagePath,
        component: <CyberFarmEvoProductionPage />,
      },
      {
        path: cyberFarmRatingsPagePath,
        component: <CyberFarmEvoRatingsPage />,
      },
    ],
  },
  // minigames
  {
    path: miniGamesPagePath,
    component: <MiniGamesPage />,
    indexComponent: <MiniGamesCatalogPage />,
    children: [
      {
        path: miniGamesAchievmentsPagePath,
        component: <MiniGamesAchievmentsPage />,
      },
      {
        path: miniGamesLoyalityPagePath,
        component: <MiniGamesLoyalityPage />,
      },
      {
        path: miniGamesPinnedPagePath,
        component: <MiniGamesPinnedPage />,
      },
      {
        path: miniGamesReferalsPagePath,
        component: <MiniGamesReferalsPage />,
      },
    ],
  },
  // hackterminal
  {
    path: hackTerminalPagePath,
    component: <HackTerminalPage />,
    indexComponent: <HackTerminalMainPage />,
    children: [
      {
        path: hackTerminalLevelSelectPagePath,
        component: <HackTerminalLevelSelectPage />,
      },
      {
        path: hackTerminalAchievmentsPagePath,
        component: <HackTerminalAchievmentsPage />,
      },
      {
        path: hackTerminalPrizesPagePath,
        component: <HackTerminalPrizesPage />,
      },
      {
        path: hackTerminalRatingsPagePath,
        component: <HackTerminalRatingsPage />,
      },
      {
        path: hackTerminalRulesPagePath,
        component: <HackTerminalRulesPage />,
      },
    ],
  },
  {
    path: puzzlePagePath,
    component: <PuzzlePage />,
    indexComponent: <PuzzleMainPage />,
    children: [
      {
        path: puzzleSelectModePagePath,
        component: <PuzzleSelectModePage />,
      },
      {
        path: puzzleGalleryPagePath,
        component: <PuzzleGalleryPage />,
      },
      {
        path: puzzleAchievmentsPagePath,
        component: <PuzzleAchievmentsPage />,
      },
      {
        path: puzzleRatingsPagePath,
        component: <PuzzleRatingsPage />,
      },
    ],
  },
  {
    path: bubbleFrontPagePath,
    component: <BubbleFrontPage />,
    indexComponent: <BubbleFrontMainPage />,
    children: [
      {
        path: bubbleFrontAchievmentsPagePath,
        component: <BubbleFrontAchievmentsPage />,
      },
      {
        path: bubbleFrontRatingsPagePath,
        component: <BubbleFrontRatingsPage />,
      },
    ],
  },
  {
    path: gridlinePagePath,
    component: <GridlinePage />,
    indexComponent: <GridlineMainPage />,
    children: [
      {
        path: gridlineAchievmentsPagePath,
        component: <GridlineAchievmentsPage />,
      },
      {
        path: gridlineRatingsPagePath,
        component: <GridlineRatingsPage />,
      },
      {
        path: gridlineLevelSelectPagePath,
        component: <GridlineLevelSelectPage />,
      },
    ],
  },

  {
    path: influencePagePath,
    component: <InfluencePage />,
    indexComponent: <InfluenceMapPage />,
    children: [
      {
        path: influenceClanPagePath,
        component: <InfluenceClanPage />,
      },
      {
        path: influenceCreateClanPagePath,
        component: <InfluenceCreateClanPage />,
      },
      {
        path: influenceMyClanPagePath,
        component: <InfluenceMyClanPage />,
      },
      {
        path: influenceLoyalityPagePath,
        component: <InfluenceLoyalityPage />,
      },

      {
        path: influencePlayerPagePath,
        component: <InfluencePlayerPage />,
      },
      {
        path: influenceNotificationsPagePath,
        component: <InfluenceNotificatonsPage />,
      },
      {
        path: influenceReferalsPagePath,
        component: <InfluenceReferalsPage />,
      },
      {
        path: influenceRatingsPagePath,
        component: <InfluenceRatingsPage />,
      },
      {
        path: influenceMailPagePath,
        component: <InfluenceMailPage />,
      },
    ],
  },
];
