import * as puzzleImages from "../../../assets/imageMaps/puzzleImages";
import PuzzleHeader from "../PuzzleHeader/PuzzleHeader";
import PuzzleBottomNavbar from "../PuzzleBottomNavbar/PuzzleBottomNavbar";
import GameWrapper from "../../GameWrapper/GameWrapper";

const PuzzleWrapper = () => {
  <GameWrapper
    gameInited={false}
    header={<PuzzleHeader />}
    bottomNavbar={<PuzzleBottomNavbar />}
    images={puzzleImages}
    offsetSize={108}
    mode={"ton_cyber_farm"}
  />;
};

export default PuzzleWrapper;
