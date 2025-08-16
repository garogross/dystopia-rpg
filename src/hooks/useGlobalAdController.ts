import { useEffect, useState } from "react";
import { useAppSelector } from "./redux";
import { AdsgramController } from "../types/AdsgramController";
import { EAdActionTypes } from "../constants/EadActionTypes";
import { EadProviders } from "../constants/EadProviders";

export const useGlobalAdController = (
  type: EAdActionTypes,
  provider: EadProviders,
  id: string,
  scsClb?: (id?: string) => void,
  errClb?: (noAds?: boolean) => void,
  dependencies?: unknown[]
) => {
  const [onclickaAd, setOnclickaAd] = useState<any>(null);

  const tgId = useAppSelector((state) => state.profile.tgId);
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  let AdController: AdsgramController | null = null;
  if (
    type === EAdActionTypes.Video &&
    provider === EadProviders.Adsgram &&
    window.Adsgram
  ) {
    AdController = window.Adsgram?.init({ blockId: id });
  }

  const onSuccess = () => {
    scsClb?.();
  };

  useEffect(
    () => {
      if (!tgId || !gameInited) return;
      if (type === EAdActionTypes.Video && provider === EadProviders.Onclicka) {
        window
          .initCdTma?.({ id })
          .then((show) => {
            setOnclickaAd(() => show);
          })
          .catch((e) => console.error(e));
      }
      console.log(
        "type === EAdActionTypes.Vide",
        (type === EAdActionTypes.Video ||
          type === EAdActionTypes.Interstitial) &&
          provider === EadProviders.AdsController
      );

      if (
        (type === EAdActionTypes.Video ||
          type === EAdActionTypes.Interstitial) &&
        provider === EadProviders.AdsController
      ) {
        try {
          console.log("TelegramAdsController init");

          window.TelegramAdsController = new TelegramAdsController();
          window.TelegramAdsController?.initialize({
            pubId: "983111",
            appId: "3212",
            debug: true,
          });
        } catch (error) {
          console.log("TelegramAdsController init error", error);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies ? [...dependencies, gameInited, tgId] : [tgId]
  );

  const onShowAd = async () => {
    try {
      switch (provider) {
        case EadProviders.Adsgram: {
          if (type === EAdActionTypes.Video && AdController) {
            const result = await AdController.show();
            if (result.done) onSuccess();
          }
          break;
        }
        case EadProviders.Gigapub: {
          if (type === EAdActionTypes.Video) {
            if (!window.showGiga) {
              errClb?.();
              return;
            }

            await window.showGiga();
            onSuccess();
          }
          break;
        }
        case EadProviders.Onclicka: {
          if (type === EAdActionTypes.Video) {
            if (!onclickaAd) {
              errClb?.();
              return;
            }
            await onclickaAd();
            onSuccess();
          }
          break;
        }
        case EadProviders.Taddy: {
          if (type === EAdActionTypes.Video) {
            const success = await window.Taddy.ads().interstitial({
              onClosed: () => console.dir("Объявление закрыто"),
              onViewThrough: (id: string) => scsClb?.(id || "id"),
            });
            if (!success) errClb?.(true);
          }
          break;
        }
        case EadProviders.AdsController: {
          if (type === EAdActionTypes.Video) {
            console.log("triggerNativeNotification");

            // window.TelegramAdsController.triggerNativeNotification()
            //   .then((result) => {
            //     console.log({ result });
            //   })
            //   .catch((result) => {
            //     errClb?.(true);

            //     console.log("err", { result });
            //   });
          }
          if (type === EAdActionTypes.Interstitial) {
            // window.TelegramAdsController.triggerInterstitialBanner()
            //   .then((result) => {
            //     console.log({ result });
            //   })
            //   .catch((result) => {
            //     errClb?.(true);
            //     console.log("err", { result });
            //   });
          }
          break;
        }
        default:
          break;
      }
    } catch (e) {
      errClb?.();
      console.error(e);
    }
  };

  return onShowAd;
};
