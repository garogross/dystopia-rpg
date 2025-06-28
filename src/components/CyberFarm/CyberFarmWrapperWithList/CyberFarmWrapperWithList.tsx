import React, { ReactNode, useEffect, useState } from "react";

import styles from "./CyberFarmWrapperWithList.module.scss";
import { HeaderWings } from "../../layout/icons/RPGGame/Common";
import { IFarmField } from "../../../models/CyberFarm/IFarmField";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  cyberFarmEmptyFieldImage,
  cyberFarmEmptyFieldImageWebp,
  cyberFarmFactoryImage,
  cyberFarmFactoryImageWebp,
  cyberFarmFarmImage,
  cyberFarmFarmImageWebp,
} from "../../../assets/imageMaps";
import { plantImages } from "../../../constants/cyberfarm/plantImages";
import { IWarehouseProduct } from "../../../models/IWarehouseProduct";
import { products } from "../../../constants/cyberfarm/products";
import { Blockedicon } from "../../layout/icons/CyberFarm/CyberFarmWrapperWithList";
import { useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import CyberFarmProcessModal from "../CyberFarmProcessModal/CyberFarmProcessModal";
import CyberFarmOptionsModal from "../CyberFarmOptionsModal/CyberFarmOptionsModal";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import CyberFarmWrapperWithListItemProgress from "./CyberFarmWrapperWithListItemProgress/CyberFarmWrapperWithListItemProgress";
import CloneFixedElementProvider from "../../../providers/CloneFixedElementProvider";
import { ECyberfarmTutorialActions } from "../../../constants/cyberfarm/tutorial";

interface Props<T extends IFarmField | IWarehouseProduct> {
  title: string;
  emptyText: string;
  data: T[];
  isWarehouse?: boolean;
  onSellItem?: (item: T) => void;
  onBuyItem?: (item: T) => void;
  onBuildItem?: (item: T) => void;
  onCloseOptionsModal?: () => void;
  optionsModalOpenedArg?: boolean;
  producingSlotIdArg?: string | null;
  productsType?: EFarmSlotTypes;
  subTitleBlock?: ReactNode;
  sorts?: { header: ReactNode; filterBy: (item: T) => boolean }[];
}
const CyberFarmWrapperWithList = <T extends IFarmField | IWarehouseProduct>({
  title,
  emptyText,
  data,
  isWarehouse,
  onSellItem,
  onBuildItem,
  onBuyItem,
  optionsModalOpenedArg,
  producingSlotIdArg,
  onCloseOptionsModal,
  productsType,
  subTitleBlock,
  sorts,
}: Props<T>) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [progressModalOpened, setProgressModalOpened] = useState(false);
  const [activeProgresModalItemId, setActiveProgresModalItemId] = useState<
    IFarmField["id"] | null
  >(null);
  const [optionsModalOpened, setOptionsModalOpened] = useState(false);
  const [producingSlotId, setProducingSlotId] = useState<string | null>(null);

  const activeProgresModalItem = data.find(
    (field) => field.id === activeProgresModalItemId
  );

  const firstInProgressFieldIndex = data.findIndex(
    (item) =>
      "idArg" in item &&
      item.idArg === ECyberfarmTutorialActions.openProgressModal
  );

  useEffect(() => {
    if (optionsModalOpenedArg) setOptionsModalOpened(true);
  }, [optionsModalOpenedArg]);

  useEffect(() => {
    if (producingSlotIdArg) setProducingSlotId(producingSlotIdArg);
  }, [producingSlotIdArg]);

  useEffect(() => {
    if (!optionsModalOpened) onCloseOptionsModal?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsModalOpened]);

  const onClickItem = (field: T) => {
    if ("count" in field) {
      onSellItem?.(field);
    } else {
      if (field.blocked) onBuyItem?.(field);
      else if (field.process) {
        setActiveProgresModalItemId(field.id);
        setProgressModalOpened(true);
      } else {
        if (onBuildItem) onBuildItem?.(field);
        else {
          setProducingSlotId(field.id);
          setOptionsModalOpened(true);
        }
      }
    }
  };

  const renderData = (data: T[]) => (
    <div
      className={`${styles.cyberFarmWrapperWithList__main} ${
        isWarehouse ? styles.cyberFarmWrapperWithList__main_warehouse : ""
      }`}
    >
      {data.map((field) => {
        let curImage = {
          src: cyberFarmEmptyFieldImage,
          srcSet: cyberFarmEmptyFieldImageWebp,
        };

        if ("count" in field) {
          // check if IWarehouseProduct
          curImage = products[field.product];
        } else if (field.type === "factory") {
          curImage = {
            src: cyberFarmFactoryImage,
            srcSet: cyberFarmFactoryImageWebp,
          };
        } else if (field.plant) {
          curImage =
            plantImages[field.plant][
              field.type === "farm" ? "inFarm" : "onField"
            ];
        } else if (field.type === "farm" && !field.plant) {
          curImage = {
            src: cyberFarmFarmImage,
            srcSet: cyberFarmFarmImageWebp,
          };
        }

        return (
          <div
            key={field.id}
            id={"idArg" in field ? field.idArg : undefined}
            className={styles.cyberFarmWrapperWithList__item}
            onClick={() => onClickItem(field)}
          >
            <ImageWebp
              src={curImage.src}
              alt={field.type}
              className={styles.cyberFarmWrapperWithList__itemImg}
              pictureClass={styles.cyberFarmWrapperWithList__itemPicture}
              srcSet={curImage.srcSet}
            />
            {"count" in field ? (
              <span className={styles.cyberFarmWrapperWithList__itemCount}>
                {field.count}
              </span>
            ) : (
              <>
                {field.process && (
                  <CyberFarmWrapperWithListItemProgress
                    process={field.process}
                  />
                )}
                {field.blocked && (
                  <div
                    className={
                      styles.cyberFarmWrapperWithList__itemBlockOverlay
                    }
                  >
                    <Blockedicon />
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section className={styles.cyberFarmWrapperWithList}>
      <div className={styles.cyberFarmWrapperWithList__header}>
        <TransitionProvider
          className={styles.cyberFarmWrapperWithList__headerWings}
          style={TransitionStyleTypes.opacity}
          inProp={gameInited}
        >
          <HeaderWings />
        </TransitionProvider>
        <h2
          className={`${gameInited ? "typeAnimation" : ""} ${
            styles.cyberFarmWrapperWithList__titleText
          }`}
        >
          {title}
        </h2>
      </div>
      {subTitleBlock}
      {data.length ? (
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.bottom}
          className={styles.cyberFarmWrapperWithList__wrapper}
        >
          {sorts
            ? sorts.map((sort) => (
                <div className={styles.cyberFarmWrapperWithList__sortWrapper}>
                  {sort.header}
                  {renderData(data.filter((item) => sort.filterBy(item)))}
                </div>
              ))
            : renderData(data)}
        </TransitionProvider>
      ) : (
        <p className={styles.cyberFarmWrapperWithList__emptyText}>
          {emptyText}
        </p>
      )}
      {activeProgresModalItem && !("count" in activeProgresModalItem) && (
        <CyberFarmProcessModal
          show={progressModalOpened}
          onClose={() => setProgressModalOpened(false)}
          item={activeProgresModalItem as IFarmField}
        />
      )}
      {productsType && producingSlotId && (
        <CyberFarmOptionsModal
          show={optionsModalOpened}
          onClose={() => setOptionsModalOpened(false)}
          type={productsType}
          slotId={producingSlotId}
        />
      )}
      {firstInProgressFieldIndex !== -1 && (
        <CloneFixedElementProvider
          id={ECyberfarmTutorialActions.openProgressModal}
          onClick={() => onClickItem(data[firstInProgressFieldIndex])}
        />
      )}
    </section>
  );
};

export default CyberFarmWrapperWithList;
