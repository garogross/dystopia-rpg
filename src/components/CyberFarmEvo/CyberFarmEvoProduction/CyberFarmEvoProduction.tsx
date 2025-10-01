import React, { useEffect, useState } from "react";
import HeaderWithBackButton from "../../layout/HeaderWithBackButton/HeaderWithBackButton";
import { DotsLine } from "../../layout/icons/RPGGame/Common";
import {
  DeflictBottomArrow,
  DeflictCenterArrow,
  DeflictTopArrow,
  DropDownArrowIcon,
  FactoriesIcon,
  FarmsIcon,
  FieldsIcon,
  ProductionBranchicon,
} from "../../layout/icons/CyberFarmEvo/Production";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  getProductionEstimate,
  getResourcesDeflict,
} from "../../../store/slices/cyberFarm/resourcesSlice";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import { products } from "../../../constants/cyberfarm/products";

import styles from "./CyberFarmEvoProduction.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

const tabs = [
  {
    key: EFarmSlotTypes.FIELDS,
    name: "Поля",
    icon: <FieldsIcon />,
  },
  {
    key: EFarmSlotTypes.FARM,
    name: "Фермы",
    icon: <FarmsIcon />,
  },
  {
    key: EFarmSlotTypes.FACTORY,
    name: "Заводы",
    icon: <FactoriesIcon />,
  },
];

const BOX_PER_COL = 2;

const CyberFarmEvoProduction = () => {
  const dispatch = useAppDispatch();
  const resourceDeflict = useAppSelector(
    (state) => state.cyberfarm.resources.resourceDeficit
  );
  const productionEstimate = useAppSelector(
    (state) => state.cyberfarm.resources.productionEstimate
  );
  const language = useAppSelector((state) => state.ui.language);
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [selectedProduct, setSelectedProduct] =
    useState<CyberFarmProductType | null>(null);
  const curDeflict = resourceDeflict?.[activeTab];
  const data = curDeflict && Object.entries(curDeflict);

  useEffect(() => {
    dispatch(getResourcesDeflict());
    dispatch(getProductionEstimate());
  }, [dispatch]);

  return (
    <div className={`container ${styles.cyberFarmEvoProduction}`}>
      <HeaderWithBackButton withDotlines title="Справка" />
      <div className={styles.cyberFarmEvoProduction__main}>
        <div className={styles.cyberFarmEvoProduction__mainInner}>
          <div className={styles.cyberFarmEvoProduction__headerBlock}>
            <div className={styles.cyberFarmEvoProduction__dotsline}>
              <DotsLine />
            </div>
            <div className={styles.cyberFarmEvoProduction__headerMain}>
              <span>Ветва производства</span>
              <ProductionBranchicon />
            </div>
            <div className={styles.cyberFarmEvoProduction__dotsline}>
              <DotsLine />
            </div>
          </div>
          <div className={styles.cyberFarmEvoProduction__tabbar}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`${styles.cyberFarmEvoProduction__tabBtn} ${
                  tab.key === activeTab
                    ? styles.cyberFarmEvoProduction__tabBtn_active
                    : ""
                }`}
              >
                <span className={styles.cyberFarmEvoProduction__tabBtnInner}>
                  {tab.name} {tab.icon}
                </span>
              </button>
            ))}
          </div>
          <div className={styles.cyberFarmEvoProduction__list}>
            {data &&
              data.map(([key, deflict]) => {
                const product = key as CyberFarmProductType;
                const productInfo = products[product];
                const requiredResources = Object.entries(deflict).filter(
                  ([key]) => key !== "total_price"
                );

                const finalProduction =
                  productionEstimate?.[product]?.[activeTab]
                    ?.final_production || 0;
                return (
                  <div
                    key={product}
                    className={styles.cyberFarmEvoProduction__listItem}
                  >
                    <div
                      key={product}
                      className={styles.cyberFarmEvoProduction__listItemInner}
                    >
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className={styles.cyberFarmEvoProduction__dropdownBtn}
                      >
                        <ImageWebp
                          className={`${
                            styles.cyberFarmEvoProduction__dropdownBtnImg
                          } ${
                            selectedProduct === product
                              ? styles.cyberFarmEvoProduction__dropdownBtnImg_hidden
                              : ""
                          }`}
                          pictureClass={
                            styles.cyberFarmEvoProduction__dropdownBtnPicture
                          }
                          src={productInfo.evo.src}
                          alt={productInfo.name[language]}
                          srcSet={productInfo.evo.srcSet}
                        />
                        <span
                          className={
                            styles.cyberFarmEvoProduction__dropdownBtnTitleTxt
                          }
                        >
                          {productInfo.name[language]}
                        </span>
                        <DropDownArrowIcon
                          rotated={selectedProduct !== product}
                        />
                      </button>
                      <TransitionProvider
                        className={
                          styles.cyberFarmEvoProduction__listItemDropdownContent
                        }
                        style={TransitionStyleTypes.height}
                        height={200}
                        inProp={selectedProduct === product}
                      >
                        <div
                          className={
                            styles.cyberFarmEvoProduction__listItemDropdownContentInner
                          }
                        >
                          <div
                            className={
                              styles.cyberFarmEvoProduction__listItemDropdownCol
                            }
                          >
                            <div
                              className={
                                styles.cyberFarmEvoProduction__listItemDropdownProductBox
                              }
                            >
                              <ImageWebp
                                src={productInfo.evo.src}
                                alt={productInfo.name[language]}
                                srcSet={productInfo.evo.srcSet}
                                className={
                                  styles.cyberFarmEvoProduction__listItemDropdownProductBoxImg
                                }
                                pictureClass={
                                  styles.cyberFarmEvoProduction__listItemDropdownProductBoxPicture
                                }
                              />
                              <span
                                className={
                                  styles.cyberFarmEvoProduction__listItemDropdownProductBoxCountText
                                }
                              >
                                {finalProduction}
                              </span>
                            </div>
                          </div>
                          {Array.from({
                            length: Math.ceil(requiredResources.length / 2),
                          }).map((_, colIndex) => {
                            const colData = requiredResources.slice(
                              colIndex * BOX_PER_COL,
                              colIndex * BOX_PER_COL + BOX_PER_COL
                            ) as [CyberFarmProductType, number][];

                            return (
                              <div
                                key={colIndex}
                                className={`${
                                  styles.cyberFarmEvoProduction__listItemDropdownCol
                                } ${
                                  styles[
                                    `cyberFarmEvoProduction__listItemDropdownCol_${
                                      colIndex + 1
                                    }`
                                  ]
                                }`}
                              >
                                {colData.map(([key, count], index) => {
                                  let arrowIcon = <DeflictCenterArrow />;
                                  let arrowIconClassnamePrefix:
                                    | "center"
                                    | "top"
                                    | "bottom" = "center";
                                  if (!colIndex && colData.length > 1) {
                                    if (index) {
                                      arrowIconClassnamePrefix = "bottom";
                                      arrowIcon = <DeflictBottomArrow />;
                                    } else {
                                      arrowIconClassnamePrefix = "top";
                                      arrowIcon = <DeflictTopArrow />;
                                    }
                                  }
                                  return (
                                    <div
                                      key={key}
                                      className={
                                        styles.cyberFarmEvoProduction__listItemDropdownProductBox
                                      }
                                    >
                                      <ImageWebp
                                        src={products[key].evo.src}
                                        alt={products[key].name[language]}
                                        srcSet={products[key].evo.srcSet}
                                        className={
                                          styles.cyberFarmEvoProduction__listItemDropdownProductBoxImg
                                        }
                                        pictureClass={
                                          styles.cyberFarmEvoProduction__listItemDropdownProductBoxPicture
                                        }
                                      />
                                      <span
                                        className={
                                          styles.cyberFarmEvoProduction__listItemDropdownProductBoxCountText
                                        }
                                      >
                                        {count}
                                      </span>
                                      <div
                                        className={`${
                                          styles.cyberFarmEvoProduction__listItemDropdownProductBoxArrowIcon
                                        } ${
                                          styles[
                                            `cyberFarmEvoProduction__listItemDropdownProductBoxArrowIcon_${arrowIconClassnamePrefix}`
                                          ]
                                        }`}
                                      >
                                        {arrowIcon}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </TransitionProvider>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberFarmEvoProduction;
