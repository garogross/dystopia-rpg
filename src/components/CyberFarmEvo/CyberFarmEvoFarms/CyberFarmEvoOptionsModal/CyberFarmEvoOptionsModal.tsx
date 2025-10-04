import React, { useEffect, useState } from "react";

import styles from "./CyberFarmEvoOptionsModal.module.scss";
import ModalWithAdd from "../../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { products } from "../../../../constants/cyberfarm/products";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { produceSlot } from "../../../../store/slices/cyberFarm/slotsSlice";
import { CyberFarmProductType } from "../../../../types/CyberFarmProductType";
import { getProducMissingText } from "../../../../utils/getProducMissingText";
import { FarmMissingResourcesType } from "../../../../types/FarmMissingResourcesType";
import { EFarmSlotTypes } from "../../../../constants/cyberfarm/EFarmSlotTypes";
import { useTooltip } from "../../../../hooks/useTooltip";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { BuyIcon } from "../../../layout/icons/CyberFarm/CyberFarmOptionsModal";
import {
  buyResourceDeflict,
  getProductionEstimate,
  getProductPrices,
  getResourcesDeflict,
} from "../../../../store/slices/cyberFarm/resourcesSlice";
import { ConfirmIcon } from "../../../layout/icons/Common";
import MainBtn from "../../../layout/MainBtn/MainBtn";
import { cpImage, cpImageWebp } from "../../../../assets/imageMaps";

interface Props {
  show: boolean;
  onClose: () => void;
  type: EFarmSlotTypes;
  slotId: string;
  level?: number;
}

const {
  successText,
  plantSuccessText,
  notEnoughResourcesText,
  missingResourcesCostText,
  buyAllButtonText,
  confirmButtonText,
  productionText,
  requiredText,
  youHaveText,
} = TRANSLATIONS.cyberFarm.optionsModal;
const { evoTitleText, evoPlantTitleText } =
  TRANSLATIONS.cyberfarmEvo.optionsModal;

const CyberFarmEvoOptionsModal: React.FC<Props> = ({
  show,
  onClose,
  type,
  slotId,
  level,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { show: showTooltip, openTooltip } = useTooltip();

  const resourceDeficit = useAppSelector(
    (state) => state.cyberfarm.resources.resourceDeficit
  );
  const productsSettings = useAppSelector(
    (state) => state.cyberfarm.resources.productsSettings
  );
  const productionEstimate = useAppSelector(
    (state) => state.cyberfarm.resources.productionEstimate
  );
  const resources = useAppSelector(
    (state) => state.cyberfarm.resources.resources
  );
  const upgradeLevels = useAppSelector(
    (state) => state.cyberfarm.slots.upgradeLevels
  );
  const curLevel = upgradeLevels?.[(level || "")?.toString()];
  const cp = useAppSelector((state) => state.profile.stats.cp);

  const productType = type === EFarmSlotTypes.FACTORY ? "factory" : "plant";

  const data = Object.entries(products).filter(
    ([_, product]) => product.type === productType
  );

  const [selectedResource, setSelectedResource] =
    useState<CyberFarmProductType | null>(data[0][0] as CyberFarmProductType);
  const displayingData =
    type !== EFarmSlotTypes.FACTORY
      ? data.filter((item) => item[0] !== selectedResource)
      : data;

  const curProduct = selectedResource ? products[selectedResource] : null;
  const totalPricyByCp =
    selectedResource && resourceDeficit
      ? resourceDeficit[type]?.[selectedResource]?.total_price || 0
      : 0;

  const curEstimate =
    selectedResource && productionEstimate
      ? productionEstimate[selectedResource]
      : null;
  const curProductSettings =
    selectedResource && productsSettings
      ? productsSettings[selectedResource]
      : null;

  const fetchProductInfo = async () => {
    setLoading(true);
    try {
      await Promise.all([
        dispatch(getResourcesDeflict()),
        dispatch(getProductionEstimate()),
        dispatch(getProductPrices()),
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!show) {
      setErrorText("");
      setErrored(false);
    } else {
      fetchProductInfo();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const onProduce = async () => {
    if (!selectedResource) return;
    try {
      setLoading(true);
      setErrored(false);
      if (isUnavailableForProduce) {
        await dispatch(
          buyResourceDeflict({
            product: selectedResource,
            slot_type: type,
          })
        ).unwrap();
      }
      await dispatch(
        produceSlot({
          id: slotId,
          product: selectedResource,
          type,
          payment_method: isUnavailableForProduce ? "cash_point" : "metal",
        })
      ).unwrap();
      await openTooltip();
      onClose();
    } catch (error: any) {
      if (error?.message?.missing) {
        const missingText = getProducMissingText(
          error?.message?.missing as FarmMissingResourcesType,
          language
        );
        setErrorText(missingText);
      } else {
        setErrorText("");
      }
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };

  const inputResources = curProductSettings?.production?.[type]?.requirements
    ? Object.entries(curProductSettings.production[type].requirements).map(
        ([k, value]) => {
          const key = k as CyberFarmProductType;
          return {
            key,
            name: products[key].name[language],
            required: value,
            available: resources[key],
            isInsufficient: resources[key] < value,
          };
        }
      )
    : [];

  const isUnavailableForProduce = inputResources.some(
    (item) => item.isInsufficient
  );

  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title={
        (type === EFarmSlotTypes.FACTORY ? evoTitleText : evoPlantTitleText)[
          language
        ]
      }
      loading={loading}
      errored={errored}
      errorText={errorText}
      evoMode
    >
      <div className={styles.cyberFarmEvoOptionsModal}>
        <div
          className={`${styles.cyberFarmEvoOptionsModal__resourcesList} ${
            type === EFarmSlotTypes.FACTORY
              ? styles.cyberFarmEvoOptionsModal__resourcesList_factory
              : ""
          }`}
        >
          {displayingData.map((res) => (
            <>
              <button
                key={res[0]}
                onClick={() =>
                  setSelectedResource(res[0] as CyberFarmProductType)
                }
                className={`${styles.cyberFarmEvoOptionsModal__resourceItem} ${
                  res[0] === selectedResource
                    ? styles.cyberFarmEvoOptionsModal__resourceItem_active
                    : ""
                }`}
              >
                <div
                  className={styles.cyberFarmEvoOptionsModal__resourceItemInner}
                >
                  <ImageWebp
                    src={res[1].evo.src}
                    srcSet={res[1].evo.srcSet}
                    alt={res[1].name[language]}
                    className={styles.cyberFarmEvoOptionsModal__resourceImg}
                  />
                  <span
                    className={
                      styles.cyberFarmEvoOptionsModal__resourceNameText
                    }
                  >
                    {res[1].name[language]}
                  </span>
                </div>
              </button>
            </>
          ))}
        </div>
        <TransitionProvider
          inProp={!!(selectedResource && curEstimate)}
          style={TransitionStyleTypes.height}
          height={650}
          className={styles.cyberFarmEvoOptionsModal__info}
        >
          <div className={styles.cyberFarmEvoOptionsModal__infoHeader}>
            {curProduct && (
              <ImageWebp
                src={curProduct.evo.src}
                srcSet={curProduct.evo.srcSet}
                alt={curProduct.name[language]}
                className={styles.cyberFarmEvoOptionsModal__resourceImg}
              />
            )}
            <h4 className={styles.cyberFarmEvoOptionsModal__infoTitle}>
              {curProduct?.name[language]}
            </h4>
          </div>
          <div className={styles.cyberFarmEvoOptionsModal__titleBlock}>
            <div className={styles.cyberFarmEvoOptionsModal__titleLine} />

            <span className={styles.cyberFarmEvoOptionsModal__infoText}>
              {productionText[language]}{" "}
              {curEstimate
                ? curEstimate[type]?.final_production + (curLevel?.bonus || 0)
                : 0}
            </span>
            <div className={styles.cyberFarmEvoOptionsModal__titleLine} />
          </div>
          <div className={styles.cyberFarmEvoOptionsModal__titleBlock}>
            <div className={styles.cyberFarmEvoOptionsModal__titleLine} />

            <span className={styles.cyberFarmEvoOptionsModal__infoText}>
              {requiredText[language]}
            </span>
            <div className={styles.cyberFarmEvoOptionsModal__titleLine} />
          </div>

          <div className={styles.cyberFarmEvoOptionsModal__infoTable}>
            {inputResources &&
              inputResources.map((resource) => {
                return (
                  <div
                    className={styles.cyberFarmEvoOptionsModal__infoTableCol}
                    key={resource.key}
                  >
                    <div
                      className={styles.cyberFarmEvoOptionsModal__infoTableRow}
                    >
                      <span
                        className={styles.cyberFarmEvoOptionsModal__infoText}
                      >
                        {resource.name}
                      </span>
                      <div
                        className={`${styles.cyberFarmEvoOptionsModal__titleLine} ${styles.cyberFarmEvoOptionsModal__titleLine_dashed}`}
                      />

                      <span
                        className={styles.cyberFarmEvoOptionsModal__infoText}
                      >
                        {resource.required}{" "}
                        {resource.isInsufficient ? (
                          <span className="redText">
                            ({youHaveText[language]} {resource.available})
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
          <TransitionProvider
            inProp={isUnavailableForProduce}
            style={TransitionStyleTypes.height}
            height={20}
            className={styles.cyberFarmEvoOptionsModal__notEnoghResText}
          >
            {notEnoughResourcesText[language]}
          </TransitionProvider>
          <TransitionProvider
            inProp={isUnavailableForProduce}
            style={TransitionStyleTypes.height}
            height={26}
            className={styles.cyberFarmEvoOptionsModal__missingResCost}
          >
            <span
              className={styles.cyberFarmEvoOptionsModal__missingResCostText}
            >
              {missingResourcesCostText[language]}:{" "}
              {totalPricyByCp ? +totalPricyByCp.toFixed(4) : 0}
            </span>
            <ImageWebp
              src={cpImage}
              srcSet={cpImageWebp}
              alt="cp"
              className={styles.cyberFarmEvoOptionsModal__cpImage}
            />
          </TransitionProvider>
          <MainBtn
            onClick={onProduce}
            disabled={
              !selectedResource ||
              (isUnavailableForProduce && totalPricyByCp > cp)
            }
            innerClass={styles.cyberFarmEvoOptionsModal__acceptBtnInner}
            className={styles.cyberFarmEvoOptionsModal__acceptBtn}
          >
            {isUnavailableForProduce ? <BuyIcon /> : <ConfirmIcon />}
            <span>
              {isUnavailableForProduce
                ? buyAllButtonText[language]
                : confirmButtonText[language]}
            </span>
          </MainBtn>
        </TransitionProvider>
      </div>
      <Tooltip
        show={showTooltip}
        text={
          (type === EFarmSlotTypes.FACTORY ? successText : plantSuccessText)[
            language
          ]
        }
      />
    </ModalWithAdd>
  );
};

export default CyberFarmEvoOptionsModal;
