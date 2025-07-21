import { useEffect, useState } from "react";
import { EAdTypes } from "../constants/EAdTypes";
import { useAppSelector } from "./redux";
import { AdsgramController } from "../types/AdsgramController";

export const useGlobalAdController = (
  type: EAdTypes,
  id: string,
  scsClb?: (id?: string) => void,
  errClb?: () => void,
  dependencies?: unknown[]
) => {
  const [onclickaAd, setOnclickaAd] = useState<any>(null);

  const tgId = useAppSelector((state) => state.profile.tgId);

  let AdController: AdsgramController | null = null;
  if (type === EAdTypes.ADSGRAM_V && window.Adsgram) {
    AdController = window.Adsgram?.init({ blockId: id });
  }

  const onSuccess = () => {
    scsClb?.();
  };

  useEffect(
    () => {
      if (!tgId) return;
      if (type === EAdTypes.ONCLICKA_V) {
        window
          .initCdTma?.({ id })
          .then((show) => {
            setOnclickaAd(() => show);
          })
          .catch((e) => console.error(e));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies ? [...dependencies, tgId] : [tgId]
  );

  const onShowAd = () => {
    const showCurAd = () => {
      switch (type) {
        case EAdTypes.ADSGRAM_V: {
          if (AdController) {
            AdController.show()
              .then((result: { done: boolean }) => {
                if (result.done) {
                  onSuccess();
                }
              })
              .catch((result: unknown) => {
                console.error("err", result);
              });
          }
          break;
        }
        case EAdTypes.GIGA_V: {
          if (!window.showGiga) {
            errClb?.();
            return;
          }
          window
            .showGiga()
            .then(() => {
              onSuccess();
            })
            .catch((e) => {
              errClb?.();
            });

          break;
        }
        case EAdTypes.ONCLICKA_V: {
          if (!onclickaAd) {
            errClb?.();
            return;
          }
          onclickaAd?.()
            .then(() => {
              onSuccess();
            })
            .catch(() => {
              errClb?.();
            });
          break;
        }
        case EAdTypes.TADDY_V: {
          window.Taddy.ads()
            .interstitial({
              onClosed: () => console.log("Объявление закрыто"),
              onViewThrough: (id: string) => scsClb?.(id),
            })
            .then((success: boolean) => {
              // success содержит признак того, что объявление было показано
            })
            .catch((err) => console.error("error"));
          break;
        }
        default: {
          break;
        }
      }
    };

    showCurAd();
  };

  return onShowAd;
};
