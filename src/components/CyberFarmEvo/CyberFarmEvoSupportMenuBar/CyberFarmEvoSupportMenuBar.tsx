import React from "react";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import {
  ProductionIcon,
  SupportChatIcon,
  TrainingIcon,
  VideoGuidesIcon,
} from "../../layout/icons/CyberFarmEvo/SupportMenuBar";
import CyberFarmEvoMenuBar from "../CyberFarmEvoMenuBar/CyberFarmEvoMenuBar";
import { useNavigate } from "react-router-dom";
import {
  cyberFarmEvoPagePath,
  cyberFarmProductionPagePath,
} from "../../../router/constants";
import { SUPPORT_CHAT_URL } from "../../../constants/common/supportChatUrl";
import { useTelegram } from "../../../hooks/useTelegram";

const {
  titleText,
  productionText,
  trainingText,
  videoGuidesText,
  askInChatText,
} = TRANSLATIONS.cyberfarmEvo.supportMenuBar;

interface Props {
  show: boolean;
  onClose: () => void;
}

const CyberFarmEvoSupportMenuBar: React.FC<Props> = ({ show, onClose }) => {
  const tg = useTelegram();
  const navigate = useNavigate();

  const items = [
    {
      name: productionText,
      icon: <ProductionIcon />,
      onClick: () =>
        navigate(`${cyberFarmEvoPagePath}/${cyberFarmProductionPagePath}`),
    },
    { name: trainingText, icon: <TrainingIcon /> },
    {
      name: videoGuidesText,
      icon: <VideoGuidesIcon />,
    },
    {
      name: askInChatText,
      icon: <SupportChatIcon />,
      onClick: () => {
        // @ts-ignore
        if (tg) {
          // @ts-ignore
          tg.openTelegramLink(SUPPORT_CHAT_URL);
        } else {
          window.open(SUPPORT_CHAT_URL, "_blank");
        }
      },
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
