import React, { useEffect, useState } from "react";
import CyberFarmWrapperWithList from "../../CyberFarmWrapperWithList/CyberFarmWrapperWithList";
import { IWarehouseProduct } from "../../../../models/IWarehouseProduct";
import { SocialStoreIcon } from "../../../layout/icons/CyberFarm/CyberFarmWarehousePage";
import styles from "./CyberFarmWarehouse.module.scss";
import CyberFarmWarehouseProductInfo from "../CyberFarmWarehouseProductInfo/CyberFarmWarehouseProductInfo";
import CyberFarmWarehouseSocialStoreModal from "../CyberFarmWarehouseSocialStoreModal/CyberFarmWarehouseSocialStoreModal";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { products } from "../../../../constants/cyberfarm/products";
import { CyberFarmProductType } from "../../../../types/CyberFarmProductType";
import { getStorage } from "../../../../store/slices/cyberFarm/resourcesSlice";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  cpImage,
  cpImageWebp,
  tonImage,
  tonImageWebp,
} from "../../../../assets/imageMaps";
import { DotsLine } from "../../../layout/icons/RPGGame/Common";
import { ECyberfarmTutorialActions } from "../../../../constants/cyberfarm/tutorial";
import CloneFixedElementProvider from "../../../../providers/CloneFixedElementProvider";

const {
  titleText,
  emptyText,
  socialStoreButtonText,
  farmEstimatedValueText,
  sellForText,
  buyForText,
} = TRANSLATIONS.cyberFarm.warehouse;

const CyberFarmWarehouse = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const resources = useAppSelector(
    (state) => state.cyberfarm.resources.resources
  );
  const [socialStoreShow, setSocialStoreShow] = useState(false);
  const [infoShow, setInfoShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const totalEstimatedCostInTon = useAppSelector(
    (state) => state.cyberfarm.resources.totalEstimatedCostInTon
  );
  const totalEstimatedCostInCp = useAppSelector(
    (state) => state.cyberfarm.resources.totalEstimatedCostInCp
  );
  const data: IWarehouseProduct[] = Object.entries(products).map(
    ([key, res]) => ({
      id: key,
      product: key as CyberFarmProductType,
      type: res.type,
      count: resources[key as CyberFarmProductType],
    })
  );
  const selectedItem = data.find((item) => item.id === selectedItemId);

  useEffect(() => {
    dispatch(getStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      className={`${styles.cyberFarmWarehouse} fullheight cyberFarmContainer`}
    >
      <div className={styles.cyberFarmWarehouse__main}>
        <CyberFarmWrapperWithList
          title={titleText[language]}
          data={data}
          emptyText={emptyText[language]}
          isWarehouse
          onSellItem={(item) => {
            setSelectedItemId(item.id);
            setInfoShow(true);
          }}
          subTitleBlock={
            <div className={styles.cyberFarmWarehouse__subtitleBlock}>
              <span>
                {farmEstimatedValueText[language]}{" "}
                {+totalEstimatedCostInCp.toFixed()}
              </span>
              <ImageWebp
                className={styles.cyberFarmWarehouse__subtitleBlockImg}
                srcSet={cpImage}
                src={cpImageWebp}
                alt={"cp"}
              />
              <span>{`(~${+totalEstimatedCostInTon.toFixed(2)}`}</span>
              <ImageWebp
                className={styles.cyberFarmWarehouse__subtitleBlockImg}
                srcSet={tonImage}
                src={tonImageWebp}
                alt={"ton"}
              />
              <span>{")"}</span>
            </div>
          }
          sorts={[
            {
              header: (
                <div className={styles.cyberFarmWarehouse__sortHeader}>
                  <div className={styles.cyberFarmWarehouse__sortHeaderDotline}>
                    <DotsLine />
                  </div>
                  <h5 className={styles.cyberFarmWarehouse__sortHeaderTitle}>
                    <span>{sellForText[language]}</span>
                    <ImageWebp
                      srcSet={tonImageWebp}
                      src={tonImage}
                      alt={"ton"}
                      className={styles.cyberFarmWarehouse__sortHeaderImg}
                    />
                  </h5>
                  <div className={styles.cyberFarmWarehouse__sortHeaderDotline}>
                    <DotsLine />
                  </div>
                </div>
              ),
              filterBy: (item) => !!products[item.product].forSale,
            },
            {
              header: (
                <div className={styles.cyberFarmWarehouse__sortHeader}>
                  <div className={styles.cyberFarmWarehouse__sortHeaderDotline}>
                    <DotsLine />
                  </div>
                  <h5 className={styles.cyberFarmWarehouse__sortHeaderTitle}>
                    <span>{buyForText[language]}</span>
                    <ImageWebp
                      srcSet={cpImageWebp}
                      src={cpImage}
                      alt={"cp"}
                      className={styles.cyberFarmWarehouse__sortHeaderImg}
                    />
                  </h5>
                  <div className={styles.cyberFarmWarehouse__sortHeaderDotline}>
                    <DotsLine />
                  </div>
                </div>
              ),
              filterBy: (item) => !products[item.product].forSale,
            },
          ]}
        />
        {selectedItem && (
          <CyberFarmWarehouseProductInfo
            show={infoShow}
            item={selectedItem}
            onClose={() => setInfoShow(false)}
          />
        )}
      </div>
      <button
        id={ECyberfarmTutorialActions.openSocialStore}
        onClick={() => setSocialStoreShow(true)}
        className={styles.cyberFarmWarehouse__socialStoreBtn}
      >
        <div className={styles.cyberFarmWarehouse__socialStorebtnInner}>
          <SocialStoreIcon />
          <span>{socialStoreButtonText[language]}</span>
        </div>
      </button>
      <CyberFarmWarehouseSocialStoreModal
        show={socialStoreShow}
        onClose={() => setSocialStoreShow(false)}
      />
      <CloneFixedElementProvider
        id={ECyberfarmTutorialActions.openSocialStore}
        onClick={() => setSocialStoreShow(true)}
      />
    </main>
  );
};

export default CyberFarmWarehouse;
