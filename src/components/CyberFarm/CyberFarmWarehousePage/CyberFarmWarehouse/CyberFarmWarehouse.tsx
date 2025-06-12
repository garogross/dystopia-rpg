import React, { useState } from "react";
import CyberFarmWrapperWithList from "../../CyberFarmWrapperWithList/CyberFarmWrapperWithList";
import { IWarehouseProduct } from "../../../../models/IWarehouseProduct";
import { SocialStoreIcon } from "../../../layout/icons/CyberFarm/CyberFarmWarehousePage";
import styles from "./CyberFarmWarehouse.module.scss";
import CyberFarmWarehouseProductInfo from "../CyberFarmWarehouseProductInfo/CyberFarmWarehouseProductInfo";
import CyberFarmWarehouseSocialStoreModal from "../CyberFarmWarehouseSocialStoreModal/CyberFarmWarehouseSocialStoreModal";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";
import { products } from "../../../../constants/cyberfarm/products";
import { CyberFarmProductType } from "../../../../types/CyberFarmProductType";

const { titleText, emptyText, socialStoreButtonText } =
  TRANSLATIONS.cyberFarm.warehouse;

const CyberFarmWarehouse = () => {
  const language = useAppSelector((state) => state.ui.language);
  const resources = useAppSelector(
    (state) => state.cyberfarm.resources.resources
  );
  const [socialStoreShow, setSocialStoreShow] = useState(false);
  const [infoShow, setInfoShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const data: IWarehouseProduct[] = Object.entries(products).map(
    ([key, res]) => ({
      id: key,
      product: key as CyberFarmProductType,
      type: res.type,
      count: resources[key as CyberFarmProductType],
    })
  );

  const selectedItem = data.find((item) => item.id === selectedItemId);

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
    </main>
  );
};

export default CyberFarmWarehouse;
