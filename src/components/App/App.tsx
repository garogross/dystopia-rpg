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
import { postLog } from "../../api/logs";
import { useStoreFreshDate } from "../../hooks/useStoreFreshDate";

const loadScripts = (tg: WebApp) => {
  // load telegram scripts
  if (!tg.initDataUnsafe?.user?.id) return;
  // load barzha script
  const barzhaScript = document.createElement("script");
  barzhaScript.src = `https://app.barzha.com/bQuest.js?token=${process.env.REACT_APP_BARZHA_TOKEN}`;
  barzhaScript.async = true;
  barzhaScript.onerror = () => {
    postLog({
      type: "script_error",
      message: "Failed to load barzha script",
      src: barzhaScript.src,
    });
  };
  document.body.appendChild(barzhaScript);
  // load barzha task-widget script
  // const barzhaTaskWidgetScript = document.createElement("script");
  // barzhaTaskWidgetScript.src = "https://app.barzha.com/task-widget.js";
  // barzhaTaskWidgetScript.async = true;
  // barzhaTaskWidgetScript.onerror = () => {
  //   postLog({
  //     type: "script_error",
  //     message: "Failed to load barzha task-widget script",
  //     src: barzhaTaskWidgetScript.src,
  //   });
  // };
  // document.body.appendChild(barzhaTaskWidgetScript);
  // load traffy script
  const traffyToken = process.env.REACT_APP_TRAFFY_TOKEN;
  if (traffyToken) {
    const traffyScript = document.createElement("script");
    traffyScript.src = "https://embed.traffy.site/v0.0.7/traffy-wrapper.min.js";
    traffyScript.setAttribute("resource-id", traffyToken);
    traffyScript.setAttribute("mode", "production");
    traffyScript.async = true;
    traffyScript.onerror = () => {
      postLog({
        type: "script_error",
        message: "Failed to load traffy script",
        src: traffyScript.src,
      });
    };
    document.body.appendChild(traffyScript);

    // load adsgram script with error handling
    const adsgramScript = document.createElement("script");
    adsgramScript.src = "https://sad.adsgram.ai/js/sad.min.js";
    adsgramScript.async = true;
    adsgramScript.onerror = () => {
      postLog({
        type: "script_error",
        message: "Failed to load adsgram script",
        src: adsgramScript.src,
      });
    };
    document.body.appendChild(adsgramScript);

    // load taddy script with error handling
    const taddyScript = document.createElement("script");
    taddyScript.src = "https://sdk.taddy.pro/web/taddy.min.js";
    taddyScript.async = true;
    taddyScript.onerror = () => {
      postLog({
        type: "script_error",
        message: "Failed to load taddy script",
        src: taddyScript.src,
      });
    };
    document.body.appendChild(taddyScript);

    // load barzha admaster-callback script with error handling
    const barzhaAdmasterCallbackScript = document.createElement("script");
    barzhaAdmasterCallbackScript.src =
      "https://app.barzha.com/admaster-callback.js";
    barzhaAdmasterCallbackScript.async = true;
    barzhaAdmasterCallbackScript.onerror = () => {
      postLog({
        type: "script_error",
        message: "Failed to load barzha admaster-callback script",
        src: barzhaAdmasterCallbackScript.src,
      });
    };
    document.body.appendChild(barzhaAdmasterCallbackScript);
  }

  // load onclicka banner script
  const onclickaCode = process.env.REACT_APP_ONCLICKA_CODE;

  if (onclickaCode) {
    const onclickaScript = document.createElement("script");
    onclickaScript.src = "https://js.onclckmn.com/banner/oncbanner.m.js";
    onclickaScript.setAttribute("data-onclicka-banner", onclickaCode);
    onclickaScript.async = true;
    onclickaScript.onerror = () => {
      postLog({
        type: "script_error",
        message: "Failed to load onclicka banner script",
        src: onclickaScript.src,
      });
    };
    document.body.appendChild(onclickaScript);
  }
  // load giga video ad script
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
    gigapubScript.onerror = () => {
      postLog({
        type: "script_error",
        message: "Failed to load gigapub script",
        src: "https://ad.gigapub.tech or https://ru-ad.gigapub.tech",
      });
    };
    document.body.appendChild(gigapubScript);
  }

  // load giga tasks script
  const script = document.createElement("script");
  script.src = "https://cdn.giga.pub/script/offer/loader/loader.js";
  script.async = true;
  script.onerror = () => {
    postLog({
      type: "script_error",
      message: "Failed to load giga tasks script",
      src: script.src,
    });
  };
  document.head.appendChild(script);

  // load onclicka script
  const onclickaScript2 = document.createElement("script");
  onclickaScript2.src = "https://js.onclckvd.com/in-stream-ad-admanager/tma.js";
  onclickaScript2.async = true;
  onclickaScript2.onerror = () => {
    postLog({
      type: "script_error",
      message: "Failed to load onclicka in-stream script",
      src: onclickaScript2.src,
    });
  };
  document.body.appendChild(onclickaScript2);
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
  useStoreFreshDate();
  // set timer for adsController Notification (native)  Ad
  // useNotificationAd();

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
