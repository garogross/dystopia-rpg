import React, { ReactElement, lazy } from "react";
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
  cyberFarmFabricPagePath,
} from "./constants";

const HomePage = lazy(() => import("../pages/HomePage"));
const RPGGamePage = lazy(() => import("../pages/RPGGame/RPGGamePage"));
const RPGGameCharacterPage = lazy(
  () => import("../pages/RPGGame/RPGGameCharacterPage")
);
const RPGGameChallengesPage = lazy(
  () => import("../pages/RPGGame/RPGGameChallengesPage")
);
const RPGGameMinigamesPage = lazy(
  () => import("../pages/RPGGame/RPGGameMinigamesPage")
);
const RPGGameDuelPage = lazy(() => import("../pages/RPGGame/RPGGameDuelPage"));
const RPGGameClanPage = lazy(() => import("../pages/RPGGame/RPGGameClanPage"));
const RPGGameLoyalityPage = lazy(
  () => import("../pages/RPGGame/RPGGameLoyalityPage")
);
const RPGGameSingleChalangePage = lazy(
  () => import("../pages/RPGGame/RPGGameSingleChalangePage")
);
const RPGGameReferalsPage = lazy(
  () => import("../pages/RPGGame/RPGGameReferalsPage")
);
const RPGGameSkinViewPage = lazy(
  () => import("../pages/RPGGame/RPGGameSkinViewPage")
);
const RPGGameClanSearchPage = lazy(
  () => import("../pages/RPGGame/RPGGameClanSearchPage")
);
const RPGGameCreateClanPage = lazy(
  () => import("../pages/RPGGame/RPGGameCreateClanPage")
);
const RPGGameSingeClanPage = lazy(
  () => import("../pages/RPGGame/RPGGameSingeClanPage")
);
const RPGGamePlayAreaPage = lazy(
  () => import("../pages/RPGGame/RPGGamePlayAreaPage")
);
const OnBoardingPage = lazy(() => import("../pages/OnBoardingPage"));
const CyberFarmPage = lazy(() => import("../pages/CyberFarm/CyberFarmPage"));
const CyberFarmFieldsPage = lazy(
  () => import("../pages/CyberFarm/CyberFarmFieldsPage")
);
const CyberFarmFarmsPage = lazy(
  () => import("../pages/CyberFarm/CyberFarmFarmsPage")
);
const CyberFarmFactoriesPage = lazy(
  () => import("../pages/CyberFarm/CyberFarmFactoriesPage")
);
const CyberFarmWarehousePage = lazy(
  () => import("../pages/CyberFarm/CyberFarmWarehousePage")
);
const CyberFarmSupportPage = lazy(
  () => import("../pages/CyberFarm/CyberFarmSupportPage")
);
const CyberFarmReferalsPage = lazy(
  () => import("../pages/CyberFarm/CyberFarmReferalsPage")
);
const CyberFarmAchievmentsPage = lazy(
  () => import("../pages/CyberFarm/CyberFarmAchievmentsPage")
);
const CyberFarmEvoFabricPage = lazy(
  () => import("../pages/CyberFarmEvo/CyberFarmEvoFabricPage")
);
const CyberFarmEvoRatingsPage = lazy(
  () => import("../pages/CyberFarmEvo/CyberFarmEvoRatingsPage")
);

const MiniGamesPage = lazy(() => import("../pages/MiniGames/MiniGamesPage"));
const MiniGamesAchievmentsPage = lazy(
  () => import("../pages/MiniGames/MiniGamesAchievmentsPage")
);
const MiniGamesCatalogPage = lazy(
  () => import("../pages/MiniGames/MiniGamesCatalogPage")
);
const MiniGamesLoyalityPage = lazy(
  () => import("../pages/MiniGames/MiniGamesLoyalityPage")
);
const MiniGamesPinnedPage = lazy(
  () => import("../pages/MiniGames/MiniGamesPinnedPage")
);
const MiniGamesReferalsPage = lazy(
  () => import("../pages/MiniGames/MiniGamesReferalsPage")
);
const HackTerminalPage = lazy(
  () => import("../pages/HackTerminal/HackTerminalPage")
);
const HackTerminalMainPage = lazy(
  () => import("../pages/HackTerminal/HackTerminalMainPage")
);
const HackTerminalLevelSelectPage = lazy(
  () => import("../pages/HackTerminal/HackTerminalLevelSelectPage")
);
const HackTerminalPrizesPage = lazy(
  () => import("../pages/HackTerminal/HackTerminalPrizesPage")
);
const HackTerminalRatingsPage = lazy(
  () => import("../pages/HackTerminal/HackTerminalRatingsPage")
);
const HackTerminalRulesPage = lazy(
  () => import("../pages/HackTerminal/HackTerminalRulesPage")
);
const HackTerminalAchievmentsPage = lazy(
  () => import("../pages/HackTerminal/HackTerminalAchievmentsPage")
);
const PuzzlePage = lazy(() => import("../pages/Puzzle/PuzzlePage"));
const PuzzleMainPage = lazy(() => import("../pages/Puzzle/PuzzleMainPage"));
const PuzzleSelectModePage = lazy(
  () => import("../pages/Puzzle/PuzzleSelectModePage")
);
const PuzzleGalleryPage = lazy(
  () => import("../pages/Puzzle/PuzzleGalleryPage")
);
const PuzzleAchievmentsPage = lazy(
  () => import("../pages/Puzzle/PuzzleAchievmentsPage")
);
const PuzzleRatingsPage = lazy(
  () => import("../pages/Puzzle/PuzzleRatingsPage")
);
const InfluencePage = lazy(() => import("../pages/Influence/InfluencePage"));
const InfluenceMapPage = lazy(
  () => import("../pages/Influence/InfluenceMapPage")
);
const InfluenceClanPage = lazy(
  () => import("../pages/Influence/InfluenceClanPage")
);
const InfluenceLoyalityPage = lazy(
  () => import("../pages/Influence/InfluenceLoyalityPage")
);
const InfluencePlayerPage = lazy(
  () => import("../pages/Influence/InfluencePlayerPage")
);
const InfluenceReferalsPage = lazy(
  () => import("../pages/Influence/InfluenceReferalsPage")
);
const InfluenceNotificatonsPage = lazy(
  () => import("../pages/Influence/InfluenceNotificatonsPage")
);
const InfluenceCreateClanPage = lazy(
  () => import("../pages/Influence/InfluenceCreateClanPage")
);
const InfluenceMyClanPage = lazy(
  () => import("../pages/Influence/InfluenceMyClanPage")
);
const InfluenceMailPage = lazy(
  () => import("../pages/Influence/InfluenceMailPage")
);
const InfluenceRatingsPage = lazy(
  () => import("../pages/Influence/InfluenceRatingsPage")
);
const BubbleFrontPage = lazy(
  () => import("../pages/BubbleFront/BubbleFrontPage")
);
const BubbleFrontMainPage = lazy(
  () => import("../pages/BubbleFront/BubbleFrontMainPage")
);
const BubbleFrontAchievmentsPage = lazy(
  () => import("../pages/BubbleFront/BubbleFrontAchievmentsPage")
);
const BubbleFrontRatingsPage = lazy(
  () => import("../pages/BubbleFront/BubbleFrontRatingsPage")
);
const CyberFarmEvoPage = lazy(
  () => import("../pages/CyberFarmEvo/CyberFarmEvoPage")
);
const CyberFarmEvoWarehousePage = lazy(
  () => import("../pages/CyberFarmEvo/CyberFarmEvoWarehousePage")
);
const CyberFarmEvoSupportPage = lazy(
  () => import("../pages/CyberFarmEvo/CyberFarmEvoSupportPage")
);
const CyberFarmEvoReferalsPage = lazy(
  () => import("../pages/CyberFarmEvo/CyberFarmEvoReferalsPage")
);
const CyberFarmEvoAchievmentsPage = lazy(
  () => import("../pages/CyberFarmEvo/CyberFarmEvoAchievmentsPage")
);
const CyberFarmEvoMapPage = lazy(
  () => import("../pages/CyberFarmEvo/CyberFarmEvoMapPage")
);
const CyberFarmEvoFarmsPage = lazy(
  () => import("../pages/CyberFarmEvo/CyberFarmEvoFarmsPage")
);
const CyberFarmEvoProductionPage = lazy(
  () => import("../pages/CyberFarmEvo/CyberFarmEvoProductionPage")
);
const GridlinePage = lazy(() => import("../pages/Gridline/GridlinePage"));
const GridlineMainPage = lazy(
  () => import("../pages/Gridline/GridlineMainPage")
);
const GridlineAchievmentsPage = lazy(
  () => import("../pages/Gridline/GridlineAchievmentsPage")
);
const GridlineRatingsPage = lazy(
  () => import("../pages/Gridline/GridlineRatingsPage")
);
const GridlineLevelSelectPage = lazy(
  () => import("../pages/Gridline/GridlineLevelSelectPage")
);

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
        path: cyberFarmFabricPagePath,
        component: <CyberFarmEvoFabricPage />,
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
      {
        path: cyberFarmFabricPagePath,
        component: <CyberFarmEvoFabricPage />,
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
