import { useEffect } from "react";
import AppRouter from "../../router/AppRouter";
import { useTelegram } from "../../hooks/useTelegram";
import { getPlatformType } from "../../utils/getPlatformType";

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
  // load onclicka script
  const gigapubProjectId = process.env.REACT_APP_GIGAPUB_PROJECT_ID;

  if (gigapubProjectId) {
    const gigapubScript = document.createElement("script");
    gigapubScript.setAttribute("data-project-id", gigapubProjectId);
    gigapubScript.innerHTML = `
      !function(){
        var s=document.currentScript,p=s.getAttribute('data-project-id')||'default';
        var d=['https://ad.gigapub.tech','https://ru-ad.gigapub.tech'],i=0,t,sc;
        function l(){
          sc=document.createElement('script');
          sc.async=true;
          sc.src=d[i]+'/script?id='+p;
          clearTimeout(t);
          t=setTimeout(function(){
            sc.onload=sc.onerror=null;
            sc.src='';
            if(++i<d.length)l();
          },15000);
          sc.onload=function(){clearTimeout(t)};
          sc.onerror=function(){clearTimeout(t);if(++i<d.length)l()};
          document.head.appendChild(sc);
        }
        l();
      }();
    `;
    document.body.appendChild(gigapubScript);
  }
};

export const App = () => {
  const tg = useTelegram();

  const isMobile = getPlatformType();

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
