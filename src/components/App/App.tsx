import { useEffect } from "react";
import AppRouter from "../../router/AppRouter";
import { useTelegram } from "../../hooks/useTelegram";

export const App = () => {
  const tg = useTelegram();

  useEffect(() => {
    // load telegram scripts
    if(!tg.initDataUnsafe?.user?.id) return;
    // load barzha script
    const barzhaScript = document.createElement("script");
    barzhaScript.src = `https://app.barzha.com/bQuest.js?token=${process.env.REACT_APP_BARZHA_TOKEN}`;
    barzhaScript.async = true;
    document.body.appendChild(barzhaScript);

    // load traffy script
    const traffyToken = process.env.REACT_APP_TRAFFY_TOKEN;
    if (traffyToken) {
      const traffyScript = document.createElement("script");
      traffyScript.src =
        "https://embed.traffy.site/v0.0.7/traffy-wrapper.min.js";
      traffyScript.setAttribute("resource-id", traffyToken);
      traffyScript.setAttribute("mode", "production");
      traffyScript.async = true;
      document.body.appendChild(traffyScript);
    }
  }, [tg]);

  return (
    <>
      <AppRouter />
    </>
  );
};
