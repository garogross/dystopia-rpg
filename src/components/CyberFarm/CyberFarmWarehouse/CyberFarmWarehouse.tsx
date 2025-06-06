import React from "react";
import CyberFarmWrapperWithList from "../CyberFarmWrapperWithList/CyberFarmWrapperWithList";
import { IWarehouseProduct } from "../../../models/IWarehouseProduct";
import { EFactoryProducts } from "../../../constants/cyberfarm/EFactoryProducts";
import { EPlants } from "../../../constants/EPlants";
import { SocialStoreIcon } from "../../layout/icons/CyberFarm/CyberFarmWarehousePage";
import styles from "./CyberFarmWarehouse.module.scss"

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

const CyberFarmWarehouse = () => {
  return (
    <main className={`${styles.cyberFarmWarehouse} cyberFarmContainer`}>
      <div className={styles.cyberFarmWarehouse__main}>
        <CyberFarmWrapperWithList
          title={"Склад"}
          data={warehouseProducts}
          isWarehouse
        />
      </div>
      <button className={styles.cyberFarmWarehouse__socialStoreBtn}>
        <div className={styles.cyberFarmWarehouse__socialStorebtnInner}>
          <SocialStoreIcon/>
          <span>Социальный магазин</span>
        </div>
      </button>
    </main>
  );
};

export default CyberFarmWarehouse;
