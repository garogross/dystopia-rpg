import React, { useState } from "react";
import { EFactoryProducts } from "../../../../constants/cyberfarm/EFactoryProducts";
import { EPlants } from "../../../../constants/EPlants";
import { IFarmField } from "../../../../models/IFarmField";
import CyberFarmWrapperWithList from "../../CyberFarmWrapperWithList/CyberFarmWrapperWithList";
import CyberFarmFieldsBuyModal from "../CyberFarmFieldsBuyModal/CyberFarmFieldsBuyModal";
import CyberFarmFieldsBuildModal from "../CyberFarmFieldsBuildModal/CyberFarmFieldsBuildModal";
import CyberFarmFieldsBuildOptionsModal from "../CyberFarmFieldsBuildOptionsModal/CyberFarmFieldsBuildOptionsModal";

const fields: IFarmField[] = [
  {
    id: "1",
    type: "field",
  },
  {
    id: "2",
    type: "farm",
    plant: EPlants.PlasmaMushroom,
    process: {
      startDate: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      endDate: new Date(Date.now() - 10).toISOString(), // 2 hours from now
    },
  },
  {
    id: "3",
    type: "factory",
    factoryProduct: EFactoryProducts.Metal,
    process: {
      startDate: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
      endDate: new Date(Date.now() + 1800000).toISOString(), // 30 mins from now
    },
  },
  {
    id: "4",
    type: "field",
    blocked: true,
  },
  {
    id: "5",
    type: "farm",
    blocked: true,
  },
  {
    id: "6",
    type: "factory",
    blocked: true,
  },
  {
    id: "7",
    type: "field",
    plant: EPlants.BioBacteria,
    process: {
      startDate: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
      endDate: new Date(Date.now() + 5400000).toISOString(), // 1.5 hours from now
    },
  },
  {
    id: "8",
    type: "factory",
    factoryProduct: EFactoryProducts.Plasma,
    process: {
      startDate: new Date(Date.now() - 900000).toISOString(), // 15 mins ago
      endDate: new Date(Date.now() + 900000).toISOString(), // 15 mins from now
    },
  },
  {
    id: "9",
    type: "farm",
    plant: EPlants.MetalCactus,
    process: {
      startDate: new Date(Date.now() - 2700000).toISOString(), // 45 mins ago
      endDate: new Date(Date.now() + 2700000).toISOString(), // 45 mins from now
    },
  },
  {
    id: "10",
    type: "factory",
    factoryProduct: EFactoryProducts.EnergyCore,
    process: {
      startDate: new Date(Date.now() - 1200000).toISOString(), // 20 mins ago
      endDate: new Date(Date.now() + 1200000).toISOString(), // 20 mins from now
    },
  },
  {
    id: "11",
    type: "field",
    blocked: true,
  },
  {
    id: "12",
    type: "farm",
    blocked: true,
  },
  {
    id: "13",
    type: "factory",
    factoryProduct: EFactoryProducts.Energy,
    process: {
      startDate: new Date(Date.now() - 2400000).toISOString(), // 40 mins ago
      endDate: new Date(Date.now() + 2400000).toISOString(), // 40 mins from now
    },
  },
  {
    id: "14",
    type: "farm",
    plant: EPlants.PlasmaMushroom,
    process: {
      startDate: new Date(Date.now() - 4800000).toISOString(), // 1.2 hours ago
      endDate: new Date(Date.now() + 4800000).toISOString(), // 1.2 hours from now
    },
  },
  {
    id: "15",
    type: "factory",
    factoryProduct: EFactoryProducts.RepairKit,
    process: {
      startDate: new Date(Date.now() - 300000).toISOString(), // 5 mins ago
      endDate: new Date(Date.now() + 300000).toISOString(), // 5 mins from now
    },
  },
  {
    id: "16",
    type: "field",
    blocked: true,
  },
];

const CyberFarmFields = () => {
  const [buyModalOpened, setBuyModalOpened] = useState(false);
  const [buildModalOpened, setBuildModalOpened] = useState(false);
  const [plantOptionsModalOpened, setPlantOptionsModalOpened] = useState(false);
  const [buildOptionsModalOpened, setBuildOptionsModalOpened] = useState(false);

  return (
    <main className="cyberFarmContainer fullheight">
      <CyberFarmWrapperWithList
        title={"Поля"}
        data={fields}
        onBuyItem={() => setBuyModalOpened(true)}
        onBuildItem={() => setBuildModalOpened(true)}
        onCloseOptionsModal={() => setBuildOptionsModalOpened(false)}
        optionsModalOpenedArg={plantOptionsModalOpened}
        productsType={"plant"}
      />
      ;
      <CyberFarmFieldsBuyModal
        show={buyModalOpened}
        onClose={() => setBuyModalOpened(false)}
      />
      <CyberFarmFieldsBuildModal
        show={buildModalOpened}
        onClose={() => setBuildModalOpened(false)}
        onBuild={() => setBuildOptionsModalOpened(true)}
        onPlant={() => setPlantOptionsModalOpened(true)}
      />
      <CyberFarmFieldsBuildOptionsModal
        show={buildOptionsModalOpened}
        onClose={() => setBuildOptionsModalOpened(false)}
      />
    </main>
  );
};

export default CyberFarmFields;
