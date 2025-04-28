import React from "react";
import styles from "./GameCharacterTraining.module.scss";
import WrapperWithFrame from "../../../layout/WrapperWithFrame/WrapperWithFrame";
import GameCharacterTrainingRedistribution from "./GameCharacterTrainingRedistribution/GameCharacterTrainingRedistribution";
import GameCharacterTrainingDevelopment from "./GameCharacterTrainingDevelopment/GameCharacterTrainingDevelopment";
import GameCharacterTrainingCybernetics from "./GameCharacterTrainingCybernetics/GameCharacterTrainingCybernetics";
import { ETrainingTabs } from "../../../../constants/ETrainingTabs";
import InfoIcon from "../../../layout/icons/game/Common/InfoIcon";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";
interface Props {
  activeTab: ETrainingTabs;
}

const trainingTabs = [
  {
    id: ETrainingTabs.DEVELOPMENT,
    title: "Очки развития: 10000",
    content: <GameCharacterTrainingDevelopment />,
  },
  {
    id: ETrainingTabs.CYBERNETICS,
    title: "Очки кибернетики: 10000",
    content: <GameCharacterTrainingCybernetics />,
  },
  {
    id: ETrainingTabs.REDISTRIBUTION,
    title: "Перераспределение",
    content: <GameCharacterTrainingRedistribution />,
  },
];

const GameCharacterTraining: React.FC<Props> = ({ activeTab }) => {
  const activeTabDetails =
    trainingTabs.find((tab) => tab.id === activeTab) || trainingTabs[0];
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <WrapperWithFrame className={styles.gameCharacterTraining} size="lg">
      <div className={styles.gameCharacterTraining__main}>
        <TransitionProvider
          className={styles.gameCharacterTraining__header}
          inProp={gameInited}
          style={TransitionStyleTypes.top}
          height={86}
        >
          <h5 className={styles.gameCharacterTraining__headerTitle}>
            {activeTabDetails.title}
          </h5>
          <button className={styles.gameCharacterTraining__headerBtn}>
            <InfoIcon />
          </button>
        </TransitionProvider>
        {activeTabDetails.content}
      </div>
    </WrapperWithFrame>
  );
};

export default GameCharacterTraining;
