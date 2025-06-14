import React, { useEffect, useState } from "react";

import styles from "./CyberFarmWarehouseProductInfo.module.scss";
import { IWarehouseProduct } from "../../../../models/IWarehouseProduct";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { products } from "../../../../constants/cyberfarm/products";
import { Walleticon } from "../../../layout/icons/Common";
import HeaderBtn from "../../../layout/HeaderBtn/HeaderBtn";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { buyProduct } from "../../../../store/slices/cyberFarm/resourcesSlice";
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
  priceText,
  youWillGetText,
  youWillSpendText,
  buyButtonText,
  sellButtonText,
  piecesText,
  successText,
} = TRANSLATIONS.cyberFarm.warehouse.productInfo;

const CyberFarmWarehouseProductInfo: React.FC<Props> = ({
  show,
  item,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const productCosts = useAppSelector(
    (state) => state.cyberfarm.resources.productCosts
  );
  const cp = useAppSelector((state) => state.profile.stats.cp);
  const { show: showTooltip, openTooltip } = useTooltip();
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [counter, setCounter] = useState(1);
  const [inputValue, setInputValue] = useState(counter.toString());
  const product = products[item.product];

  const cost = productCosts[item.product];
  const totalCost = productCosts[item.product] * counter;
  const isForSale = !!product.forSale;
  const price = 0.5;

  const onChangeCount = (value: number) => {
    setInputValue(value.toString());
    setCounter(value);
  };

  useEffect(() => {
    setCounter(1);
    setErrored(false);
  }, [item]);

  const onCalculate = (type: "minus" | "plus") => {
    let value = counter;
    if (type === "minus") {
      value = Math.max(1, value - 1);
    } else {
      value = isForSale ? Math.min(item.count, value + 1) : value + 1;
    }
    onChangeCount(value);
  };

  const onBuy = async () => {
    try {
      setErrored(false);
      setLoading(true);
      await dispatch(
        buyProduct({ amount: counter, product: item.product })
      ).unwrap();
      openTooltip();
    } catch (error) {
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };
  const onSell = async () => {
    try {
      setErrored(false);
      setLoading(true);
      // sell logic
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
              <p className={styles.cyberFarmWarehouseProductInfo__text}>
                {priceText[language]} {cost} {isForSale ? "TON" : "CP"}
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
                  if(!inputValue) setInputValue(counter.toString())
                }}
                onFocus={() => setInputValue("")}
                onChange={(e) => onChangeCount(+e.target.value)}
                min={1}
              />

              <button
                disabled={isForSale && item.count < counter}
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
          <p
            className={`${styles.cyberFarmWarehouseProductInfo__text} ${
              !isForSale && cp < totalCost
                ? styles.cyberFarmWarehouseProductInfo__text_invalid
                : ""
            }`}
          >
            {isForSale
              ? `${youWillGetText[language]} ${price * counter} TON`
              : `${youWillSpendText[language]} ${+totalCost.toFixed(2)} CP`}
          </p>
          <button
            onClick={isForSale ? onSell : onBuy}
            disabled={isForSale ? !item.count : cp < totalCost}
            className={styles.cyberFarmWarehouseProductInfo__sellBtn}
          >
            <div className={styles.cyberFarmWarehouseProductInfo__sellBtnInner}>
              {isForSale ? sellButtonText[language] : buyButtonText[language]}
              <Walleticon />
            </div>
          </button>
        </div>
        <LoadingOverlay loading={loading} />
      </div>
      <Tooltip show={showTooltip} text={successText[language]} />
    </TransitionProvider>
  );
};

export default CyberFarmWarehouseProductInfo;
