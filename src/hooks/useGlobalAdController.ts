import { useEffect, useState } from "react";
import { EAdTypes } from "../constants/EAdTypes";
import { useAppSelector } from "./redux";
import { AdsgramController } from "../types/AdsgramController";

export const useGlobalAdController = (
  type: EAdTypes,
  id: string,
  scsClb?: () => void,
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
          .catch((e) => console.log(e));
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
        default: {
          break;
        }
      }
    };

    showCurAd();
  };

  return onShowAd;
};
