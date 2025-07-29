import { useEffect, useState } from "react";
import { EAdTypes } from "../constants/EAdTypes";
import { useAppSelector } from "./redux";
import { AdsgramController } from "../types/AdsgramController";

export const useGlobalAdController = (
  type: EAdTypes,
  id: string,
  scsClb?: (id?: string) => void,
  errClb?: (noAds?: boolean) => void,
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

  const onShowAd = async () => {
    try {
      switch (type) {
        case EAdTypes.ADSGRAM_V: {
          if (AdController) {
            const result = await AdController.show();
            if (result.done) onSuccess();
          }
          break;
        }
        case EAdTypes.GIGA_V: {
          if (!window.showGiga) {
            errClb?.();
            return;
          }
          await window.showGiga();
          onSuccess();
          break;
        }
        case EAdTypes.ONCLICKA_V: {
          if (!onclickaAd) {
            errClb?.();
            return;
          }
          await onclickaAd();
          onSuccess();
          break;
        }
        case EAdTypes.TADDY_V: {
          const success = await window.Taddy.ads().interstitial({
            onClosed: () => console.dir("Объявление закрыто"),
            onViewThrough: (id: string) => scsClb?.(id || "id"),
          });
          if (!success) errClb?.(true);
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
