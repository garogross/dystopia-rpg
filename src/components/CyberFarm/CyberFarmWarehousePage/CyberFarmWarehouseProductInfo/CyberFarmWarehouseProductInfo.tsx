import React, { useState } from "react";

import styles from "./CyberFarmWarehouseProductInfo.module.scss";
import { IWarehouseProduct } from "../../../../models/IWarehouseProduct";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import { products } from "../../../../constants/cyberfarm/products";
import { Walleticon } from "../../../layout/icons/Common";
import HeaderBtn from "../../../layout/HeaderBtn/HeaderBtn";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { useAppSelector } from "../../../../hooks/redux";

interface Props {
  show: boolean;
  item: IWarehouseProduct;
  onClose: () => void;
}

const CyberFarmWarehouseProductInfo: React.FC<Props> = ({
  show,
  item,
  onClose,
}) => {
    const language = useAppSelector(state => state.ui.language)

  const [counter, setCounter] = useState(1);
  const price = 0.000137;
  const product = products[item.product];

  const onCalculate = (type: "minus" | "plus") => {
    setCounter((prev) => {
      if (type === "minus") {
        return Math.max(0, prev - 1);
      } else {
        return Math.min(item.count, prev + 1);
      }
    });
  };

  return (
    <TransitionProvider
      inProp={show}
      style={TransitionStyleTypes.height}
      height={130}
      className={styles.cyberFarmWarehouseProductInfo}
    >
        <div
      className={styles.cyberFarmWarehouseProductInfo__wrapper}
        
        >
            
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
              У вас: {item.count} шт.
            </p>
            <p className={styles.cyberFarmWarehouseProductInfo__text}>
              Цена: {price} TON
            </p>
          </div>
          <div className={styles.cyberFarmWarehouseProductInfo__calculator}>
            <button
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
            <div
              className={
                styles.cyberFarmWarehouseProductInfo__calculatorCounter
              }
            >
              {counter}
            </div>
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
      <div className={styles.cyberFarmWarehouseProductInfo__footer}>
        <p className={styles.cyberFarmWarehouseProductInfo__text}>
          Вы получите: {price * counter} TON
        </p>
        <button className={styles.cyberFarmWarehouseProductInfo__sellBtn}>
          <div className={styles.cyberFarmWarehouseProductInfo__sellBtnInner}>
            Продать
            <Walleticon />
          </div>
        </button>
      </div>

      </div>
    </TransitionProvider>
  );
};

export default CyberFarmWarehouseProductInfo;
