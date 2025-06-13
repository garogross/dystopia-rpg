import { useEffect } from "react";
import AppRouter from "../../router/AppRouter";
import { useTelegram } from "../../hooks/useTelegram";

const loadScripts = (tg: WebApp) => {
  // load telegram scripts
  if (!tg.initDataUnsafe?.user?.id) return;
  // load barzha script
  const barzhaScript = document.createElement("script");
  barzhaScript.src = `https://app.barzha.com/bQuest.js?token=${process.env.REACT_APP_BARZHA_TOKEN}`;
  barzhaScript.async = true;
  document.body.appendChild(barzhaScript);

  // load traffy script
  const traffyToken = process.env.REACT_APP_TRAFFY_TOKEN;
  if (traffyToken) {
    const traffyScript = document.createElement("script");
    traffyScript.src = "https://embed.traffy.site/v0.0.7/traffy-wrapper.min.js";
    traffyScript.setAttribute("resource-id", traffyToken);
    traffyScript.setAttribute("mode", "production");
    traffyScript.async = true;
    document.body.appendChild(traffyScript);
  }

  // load onclicka script
  const onclickaCode = process.env.REACT_APP_ONCLICKA_CODE;

  if (onclickaCode) {
    const onclickaScript = document.createElement("script");
    onclickaScript.src = "https://js.onclckmn.com/banner/oncbanner.m.js";
    onclickaScript.setAttribute("data-onclicka-banner", onclickaCode);
    onclickaScript.async = true;
    document.body.appendChild(onclickaScript);
  }
};

export const App = () => {
  const tg = useTelegram();

  const isMobile =
    tg?.platform &&
    !["macos", "tdesktop", "weba", "web", "webk"].includes(tg?.platform);

  useEffect(() => {
    if (!tg) return;
    // open fullscreen

    tg.expand();

    tg.disableVerticalSwipes();
    tg.setHeaderColor("#000000");

    if (isMobile) {
      // disable scroll on mobile
      const overflow = 100;
      document.body.style.overflowY = "hidden";
      document.body.style.marginTop = `${overflow}px`;
      document.body.style.height = window.innerHeight + overflow + "px";
      document.body.style.paddingBottom = `${overflow}px`;
      window.scrollTo(0, overflow);
    }
    tg.ready();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadScripts(tg);
  }, [tg]);

  return (
    <>
      <AppRouter />
    </>
  );
};
