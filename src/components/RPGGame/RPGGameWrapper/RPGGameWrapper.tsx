import RPGGameHeader from "../RPGGameHeader/RPGGameHeader";
import BottomNavbar from "../RPGBottomNavbar/RPGBottomNavbar";
import GameWrapper from "../../GameWrapper/GameWrapper";
import * as rpgGameImages from "../../../assets/imageMaps/rpgGameImages";

const RPGGameWrapper = () => {
  return (
    <GameWrapper
      header={<RPGGameHeader />}
      bottomNavbar={<BottomNavbar />}
      images={rpgGameImages}
      gameInited={false}
      offsetSize={195}
    />
  );
};

export default RPGGameWrapper;
