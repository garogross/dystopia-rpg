import React from "react";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import {
  ProductionIcon,
  TrainingIcon,
  VideoGuidesIcon,
} from "../../layout/icons/CyberFarmEvo/SupportMenuBar";
import CyberFarmEvoMenuBar from "../CyberFarmEvoMenuBar/CyberFarmEvoMenuBar";

const { titleText, productionText, trainingText, videoGuidesText } =
  TRANSLATIONS.cyberfarmEvo.supportMenuBar;

interface Props {
  show: boolean;
  onClose: () => void;
}

const CyberFarmEvoSupportMenuBar: React.FC<Props> = ({ show, onClose }) => {
  const items = [
    {
      name: productionText,
      icon: <ProductionIcon />,
    },
    { name: trainingText, icon: <TrainingIcon /> },
    {
      name: videoGuidesText,
      icon: <VideoGuidesIcon />,
    },
  ];

  return (
    <CyberFarmEvoMenuBar
      items={items}
      show={show}
      onClose={onClose}
      title={titleText}
    />
  );
};

export default CyberFarmEvoSupportMenuBar;
