import React, { useState } from "react";
import CyberFarmWrapperWithList from "../../CyberFarmWrapperWithList/CyberFarmWrapperWithList";
import { IWarehouseProduct } from "../../../../models/IWarehouseProduct";
import { EFactoryProducts } from "../../../../constants/cyberfarm/EFactoryProducts";
import { EPlants } from "../../../../constants/EPlants";
import { SocialStoreIcon } from "../../../layout/icons/CyberFarm/CyberFarmWarehousePage";
import styles from "./CyberFarmWarehouse.module.scss";
import CyberFarmWarehouseProductInfo from "../CyberFarmWarehouseProductInfo/CyberFarmWarehouseProductInfo";
import CyberFarmWarehouseSocialStoreModal from "../CyberFarmWarehouseSocialStoreModal/CyberFarmWarehouseSocialStoreModal";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";

const warehouseProducts: IWarehouseProduct[] = [
  {
    id: "1",
    product: EFactoryProducts.Metal,
    type: "factory",
    count: 5,
  },
  {
    id: "2",
    product: EFactoryProducts.Plasma,
    type: "factory",
    count: 3,
  },
  {
    id: "3",
    product: EFactoryProducts.EnergyCore,
    type: "factory",
    count: 2,
  },
  {
    id: "4",
    product: EPlants.MetalCactus,
    type: "plant",
    count: 4,
  },
  {
    id: "5",
    product: EPlants.PlasmaMushroom,
    type: "plant",
    count: 6,
  },
  {
    id: "6",
    product: EPlants.BioBacteria,
    type: "plant",
    count: 2,
  },
];

const {
  titleText,
socialStoreButtonText,
} = TRANSLATIONS.cyberFarm.warehouse

const CyberFarmWarehouse = () => {
    const language = useAppSelector(state => state.ui.language)

  const [socialStoreShow, setSocialStoreShow] = useState(false);
  const [infoShow, setInfoShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const selectedItem = warehouseProducts.find(
    (item) => item.id === selectedItemId
  );

  return (
    <main
      className={`${styles.cyberFarmWarehouse} fullheight cyberFarmContainer`}
    >
      <div className={styles.cyberFarmWarehouse__main}>
        <CyberFarmWrapperWithList
          title={titleText[language]}
          data={warehouseProducts}
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
