import { useNavigate } from "react-router-dom";
import { useTelegram } from "./useTelegram";
import { useEffect } from "react";

export const useBackBtn = () => {
  const tg = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    tg?.BackButton.show();
    tg?.BackButton.onClick(() => navigate(-1));
    return () => {
      tg?.BackButton.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
