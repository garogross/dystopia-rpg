import React, { useEffect, useState } from "react";

import styles from "./CyberFarmOptionsModal.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";

import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { products } from "../../../constants/cyberfarm/products";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { produceSlot } from "../../../store/slices/cyberFarm/slotsSlice";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import { getProducMissingText } from "../../../utils/getProducMissingText";
import { FarmMissingResourcesType } from "../../../types/FarmMissingResourcesType";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { useTooltip } from "../../../hooks/useTooltip";
import Tooltip from "../../layout/Tooltip/Tooltip";
import { DotsLine } from "../../layout/icons/RPGGame/Common";
import { cpImage, cpImageWebp } from "../../../assets/imageMaps";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import {
  ConfirmIcon,
  BuyIcon,
} from "../../layout/icons/CyberFarm/CyberFarmOptionsModal";
import {
  buyResourceDeflict,
  getResourcesDeflict,
} from "../../../store/slices/cyberFarm/resourcesSlice";
import { EPlants } from "../../../constants/cyberfarm/EPlants";
import { ECyberfarmTutorialActions } from "../../../constants/cyberfarm/tutorial";
import CloneFixedElementProvider from "../../../providers/CloneFixedElementProvider";

interface Props {
  show: boolean;
  onClose: () => void;
  type: EFarmSlotTypes;
  slotId: string;
}

const {
  titleText,
  plantTitleText,

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

const CyberFarmOptionsModal: React.FC<Props> = ({
  show,
  onClose,
  type,
  slotId,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const tutorialInProgress = useAppSelector(
    (state) => state.cyberfarm.tutorial.tutorialInProgress
  );

  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { show: showTooltip, openTooltip } = useTooltip();
  const productionChains = useAppSelector(
    (state) => state.cyberfarm.resources.productionChains
  );
  const resourceDeficit = useAppSelector(
    (state) => state.cyberfarm.resources.resourceDeficit
  );
  const resources = useAppSelector(
    (state) => state.cyberfarm.resources.resources
  );
  const cp = useAppSelector((state) => state.profile.stats.cp);
  const [selectedResource, setSelectedResource] =
    useState<CyberFarmProductType | null>(null);

  const curChain =
    selectedResource && productionChains
      ? productionChains[type][selectedResource]
      : null;
  const curProduct = selectedResource ? products[selectedResource] : null;
  const totalPricyByCp =
    selectedResource && resourceDeficit
      ? resourceDeficit[type]?.[selectedResource]?.total_price || 0
      : 0;
  useEffect(() => {
    if (!show) {
      setErrorText("");
      setErrored(false);
    } else {
      dispatch(getResourcesDeflict());
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
            tutorial: tutorialInProgress,
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

  const productType = type === EFarmSlotTypes.FACTORY ? "factory" : "plant";

  const data = Object.entries(products).filter(
    ([_, product]) => product.type === productType
  );

  const col1 = data.slice(0, Math.ceil(data.length / 2));
  const col2 = data.slice(Math.ceil(data.length / 2));

  const inputResources = curChain?.input
    ? Object.entries(curChain.input).map(([k, value]) => {
        const key = k as CyberFarmProductType;
        return {
          key,
          name: products[key].name[language],
          required: value,
          available: resources[key],
          isInsufficient: resources[key] < value,
        };
      })
    : [];

  const isUnavailableForProduce = inputResources.some(
    (item) => item.isInsufficient
  );

  return (
    <ModalWithAdd
      show={show}
      onClose={onClose}
      title={
        (type === EFarmSlotTypes.FACTORY ? titleText : plantTitleText)[language]
      }
      loading={loading}
      errored={errored}
      errorText={errorText}
    >
      <div className={styles.cyberFarmOptionsModal}>
        <div className={styles.cyberFarmOptionsModal__resourcesList}>
          {[col1, col2].map((col, colIndex) => (
            <div key={colIndex} className={styles.cyberFarmOptionsModal_col}>
              {col
                .filter(([_, product]) => product.type === productType)
                .map(([key, product]) => (
                  <button
                    id={
                      key === EPlants.MetalCactus
                        ? ECyberfarmTutorialActions.selectProduceRes
                        : undefined
                    }
                    className={`${styles.cyberFarmOptionsModal__btn} ${
                      type !== EFarmSlotTypes.FACTORY
                        ? styles.cyberFarmOptionsModal__btn_plant
                        : ""
                    } ${
                      selectedResource === key
                        ? styles.cyberFarmOptionsModal__btn_active
                        : ""
                    }`}
                    key={product.name[language]}
                    onClick={() =>
                      setSelectedResource(key as CyberFarmProductType)
                    }
                  >
                    <div className={styles.cyberFarmOptionsModal__btnInner}>
                      <ImageWebp
                        srcSet={product.srcSet}
                        src={product.src}
                        alt={product.name[language]}
                        pictureClass={styles.cyberFarmOptionsModal__picture}
                        className={styles.cyberFarmOptionsModal__btnImg}
                      />
                      <span>{product.name[language]}</span>
                    </div>
                  </button>
                ))}
            </div>
          ))}
        </div>
        <TransitionProvider
          inProp={!!curChain}
          style={TransitionStyleTypes.height}
          height={600}
          className={styles.cyberFarmOptionsModal__info}
        >
          <div className={styles.cyberFarmOptionsModal__infoHeader}>
            <div className={styles.cyberFarmOptionsModal__infoDotline}>
              <DotsLine />
            </div>
            <h4 className={styles.cyberFarmOptionsModal__infoTitle}>
              {curProduct?.name[language]}
            </h4>
            <div className={styles.cyberFarmOptionsModal__infoDotline}>
              <DotsLine />
            </div>
          </div>
          <div className={styles.cyberFarmOptionsModal__production}>
            <span className={styles.cyberFarmOptionsModal__infoText}>
              {productionText[language]}
            </span>
            <span className={styles.cyberFarmOptionsModal__infoText}>
              {curChain?.output}
            </span>
          </div>
          <div className={styles.cyberFarmOptionsModal__infoHeader}>
            <div className={styles.cyberFarmOptionsModal__infoDotline}>
              <DotsLine />
            </div>
            <h4 className={styles.cyberFarmOptionsModal__infoTitle}>
              {requiredText[language]}
            </h4>
            <div className={styles.cyberFarmOptionsModal__infoDotline}>
              <DotsLine />
            </div>
          </div>
          <table className={styles.cyberFarmOptionsModal__infoTable}>
            <tbody>
              {inputResources.map((resource) => (
                <tr key={resource.key}>
                  <td className={styles.cyberFarmOptionsModal__infoTableRow}>
                    <span className={styles.cyberFarmOptionsModal__infoText}>
                      {resource.name}
                    </span>
                  </td>
                  <td className={styles.cyberFarmOptionsModal__infoTableRow}>
                    <span className={styles.cyberFarmOptionsModal__infoText}>
                      {resource.isInsufficient ? (
                        <span className="redText">
                          ({youHaveText[language]}:{resource.available})
                        </span>
                      ) : (
                        ""
                      )}{" "}
                      {resource.required}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TransitionProvider>
        <TransitionProvider
          inProp={isUnavailableForProduce}
          style={TransitionStyleTypes.height}
          height={20}
          className={styles.cyberFarmOptionsModal__notEnoghResText}
        >
          {notEnoughResourcesText[language]}
        </TransitionProvider>
        <TransitionProvider
          inProp={isUnavailableForProduce}
          style={TransitionStyleTypes.height}
          height={26}
          className={styles.cyberFarmOptionsModal__missingResCost}
        >
          <span className={styles.cyberFarmOptionsModal__missingResCostText}>
            {missingResourcesCostText[language]}:{" "}
            {totalPricyByCp ? +totalPricyByCp.toFixed(2) : 0}
          </span>
          <ImageWebp
            src={cpImage}
            srcSet={cpImageWebp}
            alt="cp"
            className={styles.cyberFarmOptionsModal__cpImage}
          />
        </TransitionProvider>
        <button
          onClick={onProduce}
          id={ECyberfarmTutorialActions.produceRes}
          disabled={
            !tutorialInProgress &&
            (!selectedResource ||
              (isUnavailableForProduce && totalPricyByCp > cp))
          }
          className={styles.cyberFarmOptionsModal__acceptBtn}
        >
          <div className={styles.cyberFarmOptionsModal__acceptBtnInner}>
            {isUnavailableForProduce ? <BuyIcon /> : <ConfirmIcon />}
            <span>
              {isUnavailableForProduce
                ? buyAllButtonText[language]
                : confirmButtonText[language]}
            </span>
          </div>
        </button>
      </div>
      <Tooltip
        show={showTooltip}
        text={
          (type === EFarmSlotTypes.FACTORY ? successText : plantSuccessText)[
            language
          ]
        }
      />
      <CloneFixedElementProvider
        id={ECyberfarmTutorialActions.selectProduceRes}
        onClick={() => setSelectedResource(EPlants.MetalCactus)}
      />
      {selectedResource && (
        <CloneFixedElementProvider
          id={ECyberfarmTutorialActions.produceRes}
          onClick={onProduce}
        />
      )}
    </ModalWithAdd>
  );
};

export default CyberFarmOptionsModal;
