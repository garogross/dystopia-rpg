import { useEffect } from "react";
import AppRouter from "../../router/AppRouter";
import { useTelegram } from "../../hooks/useTelegram";
import { getPlatformType } from "../../utils/getPlatformType";
import { useOfferwallSdk } from "../../hooks/useOfferwallSdk";
import { getLSItem } from "../../helpers/localStorage";
import { ELSProps } from "../../constants/ELSProps";
import { ELanguages } from "../../constants/ELanguages";
import { useAppDispatch } from "../../hooks/redux";
import { setLanguage } from "../../store/slices/uiSlice";
import { useFreshDate } from "../../hooks/useFreshDate";
import { postLog } from "../../api/logs";

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

  // load giga tasks script
  const script = document.createElement("script");
  script.src = "https://cdn.giga.pub/script/offer/loader/loader.js";
  script.async = true;
  document.head.appendChild(script);
};

const getLanguage = async (language_code: string | undefined) => {
  const lang = await getLSItem(ELSProps.language);
  const languages = [ELanguages.en, ELanguages.ru];
  if (lang && languages.includes(lang)) return lang;
  else if (language_code) {
    if (language_code.includes("ru")) {
      return ELanguages.ru;
    }
  }

  return ELanguages.en;
};

export const App = () => {
  const tg = useTelegram();
  const dispatch = useAppDispatch();
  const initOfferwall = useOfferwallSdk();

  const isMobile = getPlatformType();

  // update freshDate in store for use in timers if needed
  useFreshDate();

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
    window.onerror = function (message, source, lineno, colno, error) {
      postLog({
        tgId: tg?.initDataUnsafe.user?.id,
        message,
        source,
        lineno,
        colno,
        error: error?.stack,
      });
    };

    const handleDocumentClick = (event: MouseEvent) => {
      // Avoid circular structure by logging only relevant info about the target
      let targetInfo: any = {};
      if (event.target instanceof HTMLElement) {
        targetInfo = {
          tag: event.target.tagName,
          id: event.target.id,
          className: event.target.className,
          name: (event.target as HTMLInputElement).name,
          type: (event.target as HTMLInputElement).type,
          text: event.target.textContent?.slice(0, 100), // limit text length
        };
      }
      postLog({
        type: "click",
        tgId: tg?.initDataUnsafe.user?.id,
        target: targetInfo,
      });
    };
    document.addEventListener("click", handleDocumentClick);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadScripts(tg);
    initOfferwall();
    (async () => {
      const code = tg.initDataUnsafe?.user?.language_code;
      const lang = await getLanguage(code);
      dispatch(setLanguage(lang));
    })();
    const clearCache = () => {
      if ("caches" in window) {
        caches.keys().then((names) => {
          for (let name of names) {
            caches.delete(name);
          }
        });
      }
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (let registration of registrations) {
            registration.unregister();
          }
        });
      }
    };

    clearCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tg]);

  return (
    <>
      <AppRouter />
    </>
  );
};
