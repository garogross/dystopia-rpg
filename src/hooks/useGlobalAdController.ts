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
  dependencies?: unknown[],
  forceInit?: boolean
) => {
  const [onclickaAd, setOnclickaAd] = useState<any>(null);

  const tgId = useAppSelector((state) => state.profile.tgId);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [adController, setadController] = useState<AdsgramController | null>(
    null
  );

  const onSuccess = () => {
    scsClb?.();
  };

  useEffect(
    () => {
      if (!tgId || !gameInited) return;
      if (
        forceInit ||
        (type === EAdActionTypes.Video && provider === EadProviders.Onclicka)
      ) {
        window
          .initCdTma?.({ id: "6079126" })
          .then((show) => {
            setOnclickaAd(() => show);
          })
          .catch((e) => console.error(e));
      }

      if (
        (forceInit ||
          ((type === EAdActionTypes.Video ||
            type === EAdActionTypes.Interstitial) &&
            provider === EadProviders.Adsgram)) &&
        window.Adsgram
      ) {
        const blockId =
          type === EAdActionTypes.Interstitial ? "int-13832" : "11778";
        setadController(window.Adsgram?.init({ blockId }));
      }

      // if (
      //   forceInit ||
      //   ((type === EAdActionTypes.Video ||
      //     type === EAdActionTypes.Interstitial) &&
      //     provider === EadProviders.AdsController)
      // ) {
      //   try {
      //     window.TelegramAdsController = new TelegramAdsController();
      //     window.TelegramAdsController?.initialize({
      //       pubId: "983111",
      //       appId: "3212",
      //       debug: true,
      //     });
      //   } catch (error) {}
      // }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies ? [...dependencies, gameInited, tgId] : [tgId, gameInited]
  );

  const onShowAd = async () => {
    try {
      switch (provider) {
        case EadProviders.Adsgram: {
          if (
            (type === EAdActionTypes.Video ||
              type === EAdActionTypes.Interstitial) &&
            adController
          ) {
            const result = await adController?.show();

            if (result?.done) onSuccess();
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
            // Workaround for Taddy SDK bug: check for iframe after 5s, reject if not found
            let iframeCheckTimeout: NodeJS.Timeout | number | undefined;
            let didTimeout = false;

            const interstitialPromise = window.Taddy.ads().interstitial({
              onClosed: () => console.dir("Объявление закрыто"),
              onViewThrough: (id: string) => scsClb?.(id || "id"),
            });

            // Create a race between the ad promise and our iframe check
            const success = await Promise.race([
              interstitialPromise,
              new Promise((_, reject) => {
                iframeCheckTimeout = setTimeout(() => {
                  const hasIframe = [
                    ...(document.querySelector("html")?.children || []),
                  ].find((item) => item.tagName.toLowerCase() === "iframe");
                  console.log({ hasIframe });

                  if (!hasIframe) {
                    didTimeout = true;
                    reject(new Error("Taddy ad did not show iframe in time"));
                  }
                }, 6000);
              }),
            ]).catch((err) => {
              // If we rejected due to missing iframe, call error callback
              if (didTimeout) {
                errClb?.(true);
              }
              return false;
            });

            // Clean up timeout if ad resolved first
            if (iframeCheckTimeout) clearTimeout(iframeCheckTimeout);
            if (!success) errClb?.(true);
          }
          break;
        }
        case EadProviders.AdsController: {
          if (type === EAdActionTypes.Video) {
            window.TelegramAdsController?.triggerNativeNotification()
              .then(() => {})
              .catch(() => {
                errClb?.(true);
              });
          }
          if (type === EAdActionTypes.Interstitial) {
            window.TelegramAdsController?.triggerInterstitialBanner()
              .then(() => {})
              .catch(() => {
                errClb?.(true);
              });
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
