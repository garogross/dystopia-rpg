import React, { useEffect, useRef, useState } from "react";

import styles from "./CyberFarmWarehouseSocialStoreModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { ConfirmIcon } from "../../../layout/icons/CyberFarm/CyberFarmWarehousePage";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { CPOrProductType } from "../../../../types/CPOrProductType";
import { getResProductDetails } from "../../../../utils/cyberFarm/getResProductDetails";
import {
  exchange,
  setAvailableIn,
} from "../../../../store/slices/cyberFarm/socialShopSlice";
import { useTooltip } from "../../../../hooks/useTooltip";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { formatTime } from "../../../../utils/formatTime";
import { ELanguages } from "../../../../constants/ELanguages";

interface Props {
  show: boolean;
  onClose: () => void;
}

const {
  titleLgText,
  titleText,
  confirmButtonText,
  exchangeOptions,
  exchangeCompleteText,
  availableInText,
} = TRANSLATIONS.cyberFarm.warehouse.socialStoreModal;

const getAvailableInSecs = (availableIn: number | null) => {
  return availableIn ? (availableIn - Date.now()) / 1000 : 0;
};

const Timer = ({
  availableIn,
  language,
}: {
  availableIn: number | null;
  language: ELanguages;
}) => {
  const dispatch = useAppDispatch();
  const [availableInSec, setAvailableInSec] = useState(
    getAvailableInSecs(availableIn)
  );
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAvailableInSec(getAvailableInSecs(availableIn));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log({ availableInSec });

    if (availableInSec <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      dispatch(setAvailableIn(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableInSec]);

  return (
    <TransitionProvider
      inProp={!!availableIn && availableInSec > 0}
      style={TransitionStyleTypes.height}
      className={styles.cyberFarmWarehouseSocialStoreModal__timer}
    >
      <span className={styles.cyberFarmWarehouseSocialStoreModal__text}>
        {availableInText[language]} {formatTime(availableInSec)}
      </span>
    </TransitionProvider>
  );
};

const { toText } = exchangeOptions;

const CyberFarmWarehouseSocialStoreModal: React.FC<Props> = ({
  show,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const socialShop = useAppSelector(
    (state) => state.cyberfarm.socialShop.socialShop
  );
  const availableIn = useAppSelector(
    (state) => state.cyberfarm.socialShop.availableIn
  );
  const resources = useAppSelector(
    (state) => state.cyberfarm.resources.resources
  );
  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(
    null
  );
  const cp = useAppSelector((state) => state.profile.stats.cp);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  console.log({ availableIn });

  const { show: showTooltip, openTooltip } = useTooltip();
  const onSubmit = async () => {
    if (!selectedOptionKey) return;
    try {
      setLoading(true);
      setErrored(false);
      await dispatch(exchange(selectedOptionKey)).unwrap();
      await openTooltip();
      onClose();
    } catch (error) {
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      withoutFrame
      titleLg={titleLgText[language]}
      title={titleText[language]}
      loading={loading}
      errored={errored}
    >
      <div className={styles.cyberFarmWarehouseSocialStoreModal}>
        <div className={styles.cyberFarmWarehouseSocialStoreModal__lsit}>
          {socialShop &&
            Object.keys(socialShop).map((key, index) => {
              const curOption = socialShop[key as keyof typeof socialShop];
              if (!curOption) return null;
              const spendingResKey = Object.keys(curOption).find(
                (key) => key !== "reward"
              ) as CPOrProductType;
              const rewardResKey = Object.keys(
                curOption.reward
              )[0] as CPOrProductType;

              const spendingProductDetails =
                getResProductDetails(spendingResKey);
              const rewardProductDetails = getResProductDetails(rewardResKey);

              return (
                <button
                  onClick={() => setSelectedOptionKey(key)}
                  disabled={
                    spendingResKey === "cash_point"
                      ? curOption.cash_point > cp
                      : curOption[spendingResKey] > resources[spendingResKey]
                  }
                  className={`${
                    styles.cyberFarmWarehouseSocialStoreModal__listItem
                  } ${
                    selectedOptionKey === key
                      ? styles.cyberFarmWarehouseSocialStoreModal__listItem_active
                      : ""
                  }`}
                  key={index}
                >
                  <div
                    className={
                      styles.cyberFarmWarehouseSocialStoreModal__listItemInner
                    }
                  >
                    <ImageWebp
                      src={spendingProductDetails.src}
                      alt="product"
                      srcSet={spendingProductDetails.srcSet}
                      className={
                        styles.cyberFarmWarehouseSocialStoreModal__listItemImg
                      }
                      pictureClass={
                        styles.cyberFarmWarehouseSocialStoreModal__listItemPicture
                      }
                    />
                    <span
                      className={
                        styles.cyberFarmWarehouseSocialStoreModal__text
                      }
                    >
                      -{curOption[spendingResKey]}{" "}
                      {spendingProductDetails.name[language]} {toText[language]}{" "}
                      {curOption.reward[rewardResKey]}{" "}
                      {rewardProductDetails.twistedName[language]}
                    </span>
                    <ImageWebp
                      src={rewardProductDetails.src}
                      alt="product"
                      srcSet={rewardProductDetails.srcSet}
                      className={
                        styles.cyberFarmWarehouseSocialStoreModal__listItemImg
                      }
                      pictureClass={
                        styles.cyberFarmWarehouseSocialStoreModal__listItemPicture
                      }
                    />
                  </div>
                </button>
              );
            })}
        </div>
        <button
          disabled={!selectedOptionKey || !!availableIn}
          onClick={onSubmit}
          className={styles.cyberFarmWarehouseSocialStoreModal__confirmBtn}
        >
          <div
            className={
              styles.cyberFarmWarehouseSocialStoreModal__confirmBtnInner
            }
          >
            <span>{confirmButtonText[language]}</span>
            <ConfirmIcon />
          </div>
        </button>
        {!!availableIn && (
          <Timer availableIn={availableIn} language={language} />
        )}
      </div>
      <Tooltip show={showTooltip} text={exchangeCompleteText[language]} />
    </ModalWithAdd>
  );
};

export default CyberFarmWarehouseSocialStoreModal;
