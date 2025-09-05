import React, { useEffect, useState } from "react";

import styles from "./CyberFarmWarehouseProductInfo.module.scss";
import { IWarehouseProduct } from "../../../../models/IWarehouseProduct";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { products } from "../../../../constants/cyberfarm/products";
import HeaderBtn from "../../../layout/HeaderBtn/HeaderBtn";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { exchange } from "../../../../store/slices/cyberFarm/resourcesSlice";
import LoadingOverlay from "../../../layout/LoadingOverlay/LoadingOverlay";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import { useTooltip } from "../../../../hooks/useTooltip";

interface Props {
  show: boolean;
  item: IWarehouseProduct;
  onClose: () => void;
}

const { somethingWentWrong } = TRANSLATIONS.errors;
const {
  youHaveText,
  buyButtonText,
  sellButtonText,
  piecesText,
  successText,
  exchangeSuccessText,
} = TRANSLATIONS.cyberFarm.warehouse.productInfo;

const CyberFarmWarehouseProductInfo: React.FC<Props> = ({
  show,
  item,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const productPrices = useAppSelector(
    (state) => state.cyberfarm.resources.productPrices
  );

  const cp = useAppSelector((state) => state.profile.stats.cp);
  const { show: showTooltip, openTooltip } = useTooltip();
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [counter, setCounter] = useState(1);
  const [tooltipText, setTooltipText] = useState(successText);
  const [inputValue, setInputValue] = useState(counter.toString());
  const product = products[item.product];

  const totalCostOnBuy = productPrices[item.product].price_buy * counter;
  const totalCostonSell = productPrices[item.product].price_sell * counter;

  const onChangeCount = (value: number) => {
    setInputValue(value.toString());
    setCounter(value);
  };

  useEffect(() => {
    setCounter(1);
    setErrored(false);
  }, [item.id]);

  const onCalculate = (type: "minus" | "plus") => {
    let value = counter;
    if (type === "minus") {
      value = Math.max(1, value - 1);
    } else {
      value = value + 1;
    }
    onChangeCount(value);
  };

  const onShop = async (isSell?: boolean) => {
    try {
      setErrored(false);
      setLoading(true);
      await dispatch(
        exchange({
          amount: counter,
          product: item.product,
          operation: isSell ? "sell" : "buy",
        })
      ).unwrap();
      setTooltipText(isSell ? exchangeSuccessText : successText);
      openTooltip();
    } catch (error) {
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TransitionProvider
      inProp={show}
      style={TransitionStyleTypes.height}
      height={150}
      className={styles.cyberFarmWarehouseProductInfo}
    >
      <div className={styles.cyberFarmWarehouseProductInfo__wrapper}>
        <HeaderBtn
          onClick={onClose}
          type={"close"}
          className={styles.cyberFarmWarehouseProductInfo_closeBtn}
        />
        <div className={styles.cyberFarmWarehouseProductInfo__main}>
          <ImageWebp
            src={product.src}
            alt={product.name[language]}
            className={styles.cyberFarmWarehouseProductInfo__mainImg}
            srcSet={product.srcSet}
          />
          <div className={styles.cyberFarmWarehouseProductInfo__infoTexts}>
            <p className={styles.cyberFarmWarehouseProductInfo__text}>
              {product.name[language]}
            </p>
            <div className={styles.cyberFarmWarehouseProductInfo__textCol}>
              <p className={styles.cyberFarmWarehouseProductInfo__text}>
                {youHaveText[language]} {item.count} {piecesText[language]}
              </p>
            </div>
            <div className={styles.cyberFarmWarehouseProductInfo__calculator}>
              <button
                disabled={counter <= 1}
                onClick={() => onCalculate("minus")}
                className={`${styles.cyberFarmWarehouseProductInfo__calculatorBtn} ${styles.cyberFarmWarehouseProductInfo__calculatorBtn_minus}`}
              >
                <span
                  className={
                    styles.cyberFarmWarehouseProductInfo__calculatorBtnInner
                  }
                >
                  -
                </span>
              </button>
              <input
                type="number"
                className={
                  styles.cyberFarmWarehouseProductInfo__calculatorCounter
                }
                value={inputValue}
                onBlur={() => {
                  if (!inputValue) setInputValue(counter.toString());
                }}
                onFocus={() => setInputValue("")}
                onChange={(e) => onChangeCount(+e.target.value)}
                min={1}
              />

              <button
                onClick={() => onCalculate("plus")}
                className={`${styles.cyberFarmWarehouseProductInfo__calculatorBtn} ${styles.cyberFarmWarehouseProductInfo__calculatorBtn_plus}`}
              >
                <span
                  className={
                    styles.cyberFarmWarehouseProductInfo__calculatorBtnInner
                  }
                >
                  +
                </span>
              </button>
            </div>
          </div>
        </div>
        <p
          className={`${styles.cyberFarmWarehouseProductInfo__error} ${
            errored ? styles.cyberFarmWarehouseProductInfo__error_active : ""
          }`}
        >
          {somethingWentWrong[language]}
        </p>
        <div className={styles.cyberFarmWarehouseProductInfo__footer}>
          <button
            onClick={() => onShop(true)}
            disabled={!item.count || item.count < counter}
            className={styles.cyberFarmWarehouseProductInfo__sellBtn}
          >
            <div className={styles.cyberFarmWarehouseProductInfo__sellBtnInner}>
              {sellButtonText[language]} {+totalCostonSell.toFixed(4)}
            </div>
          </button>
          <button
            onClick={() => onShop()}
            disabled={cp < totalCostOnBuy}
            className={styles.cyberFarmWarehouseProductInfo__sellBtn}
          >
            <div className={styles.cyberFarmWarehouseProductInfo__sellBtnInner}>
              {buyButtonText[language]} {+totalCostOnBuy.toFixed(4)}
            </div>
          </button>
        </div>
        <LoadingOverlay loading={loading} />
      </div>
      <Tooltip show={showTooltip} text={tooltipText[language]} />
    </TransitionProvider>
  );
};

export default CyberFarmWarehouseProductInfo;
