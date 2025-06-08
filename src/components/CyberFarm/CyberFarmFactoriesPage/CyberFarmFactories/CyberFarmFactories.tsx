import React from "react";
import { EFactoryProducts } from "../../../../constants/cyberfarm/EFactoryProducts";
import { IFarmField } from "../../../../models/IFarmField";
import CyberFarmWrapperWithList from "../../CyberFarmWrapperWithList/CyberFarmWrapperWithList";

const factories: IFarmField[] = [
  {
    id: "1",
    type: "factory",
  },
  {
    id: "2",
    type: "factory",
    factoryProduct: EFactoryProducts.Plasma,
    process: {
      startDate: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      endDate: new Date(Date.now() - 10).toISOString(), // 2 hours from now
    },
  },
  {
    id: "3",
    type: "factory",
    factoryProduct: EFactoryProducts.EnergyCore,
    process: {
      startDate: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
      endDate: new Date(Date.now() + 1800000).toISOString(), // 30 mins from now
    },
  },
  {
    id: "4",
    type: "factory",
    blocked: true,
  },
  {
    id: "5",
    type: "factory",
    factoryProduct: EFactoryProducts.RepairKit,
    process: {
      startDate: new Date(Date.now() - 300000).toISOString(), // 5 mins ago
      endDate: new Date(Date.now() + 300000).toISOString(), // 5 mins from now
    },
  },
];

const CyberFarmFactories = () => {
  return (
    <main className="cyberFarmContainer fullheight">
      <CyberFarmWrapperWithList
        title={"Заводы"}
        data={factories}
        productsType={"factory"}
      />
    </main>
  );
};

export default CyberFarmFactories;
