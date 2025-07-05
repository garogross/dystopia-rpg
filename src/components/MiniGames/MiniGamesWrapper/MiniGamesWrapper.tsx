import MiniGamesHeader from "../MiniGamesHeader/MiniGamesHeader";
import MiniGamesBottomNavbar from "../MiniGamesBottomNavbar/MiniGamesBottomNavbar";

import * as miniGamesImages from "../../../assets/imageMaps/miniGamesImages";
import GameWrapper from "../../GameWrapper/GameWrapper";

const MiniGamesWrapper = () => {
  return (
    <GameWrapper
      header={<MiniGamesHeader />}
      bottomNavbar={<MiniGamesBottomNavbar />}
      images={miniGamesImages}
      gameInited={false}
      offsetSize={180}
    />
  );
};

export default MiniGamesWrapper;
