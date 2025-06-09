import { useEffect } from "react";
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
  const tgId = useAppSelector((state) => state.profile.tgId);

  let AdController: AdsgramController | null = null;
  if (type === "adsgram-v" && window.Adsgram) {
    AdController = window.Adsgram?.init({ blockId: id });
  }

  const onSuccess = () => {
    scsClb?.();
  };

  useEffect(
    () => {
      // for init ads
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies ? [...dependencies, tgId] : [tgId]
  );

  const onShowAd = () => {
    const showCurAd = () => {
      console.log("showCurAd", type);

      switch (type) {
        case "adsgram-v": {
          if (AdController) {
            AdController.show()
              .then((result: {done: boolean}) => {
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
        default: {
          break;
        }
      }
    };

    showCurAd();
  };

  return onShowAd;
};
