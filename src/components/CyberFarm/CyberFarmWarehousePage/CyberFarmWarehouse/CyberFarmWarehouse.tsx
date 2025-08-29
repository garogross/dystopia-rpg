import React, { useEffect, useState } from "react";
import CyberFarmWrapperWithList from "../../CyberFarmWrapperWithList/CyberFarmWrapperWithList";
import { IWarehouseProduct } from "../../../../models/IWarehouseProduct";
import styles from "./CyberFarmWarehouse.module.scss";
import CyberFarmWarehouseProductInfo from "../CyberFarmWarehouseProductInfo/CyberFarmWarehouseProductInfo";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { products } from "../../../../constants/cyberfarm/products";
import { CyberFarmProductType } from "../../../../types/CyberFarmProductType";
import {
  getProductPrices,
  getStorage,
} from "../../../../store/slices/cyberFarm/resourcesSlice";

const { titleText, emptyText } = TRANSLATIONS.cyberFarm.warehouse;

const CyberFarmWarehouse = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const resources = useAppSelector(
    (state) => state.cyberfarm.resources.resources
  );
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

  useEffect(() => {
    dispatch(getStorage());
    dispatch(getProductPrices());
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
        />
        {selectedItem && (
          <CyberFarmWarehouseProductInfo
            show={infoShow}
            item={selectedItem}
            onClose={() => setInfoShow(false)}
          />
        )}
      </div>
    </main>
  );
};

export default CyberFarmWarehouse;
