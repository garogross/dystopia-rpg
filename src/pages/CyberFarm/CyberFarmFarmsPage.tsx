import React from "react";
import CyberFarmWrapperWithList from "../../components/CyberFarm/CyberFarmWrapperWithList/CyberFarmWrapperWithList";
import { EPlants } from "../../constants/EPlants";
import { IFarmField } from "../../models/IFarmField";


const farms: IFarmField[] = [
  {
    id: "1",
    type: "farm",
    plant: EPlants.MetalCactus,
    process: {
      startDate: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      endDate: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    },
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
    type: "farm",
    plant: EPlants.BioBacteria,
    process: {
      startDate: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
      endDate: new Date(Date.now() + 1800000).toISOString(), // 30 mins from now
    },
  },
  {
    id: "4",
    type: "farm",
    blocked: true,
  },
  {
    id: "5",
    type: "farm",
    blocked: true,
  },
  {
    id: "6",
    type: "farm",
    plant: EPlants.MetalCactus,
    process: {
      startDate: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
      endDate: new Date(Date.now() + 5400000).toISOString(), // 1.5 hours from now
    },
  },
  {
    id: "7",
    type: "farm",
    plant: EPlants.PlasmaMushroom,
    process: {
      startDate: new Date(Date.now() - 900000).toISOString(), // 15 mins ago
      endDate: new Date(Date.now() + 900000).toISOString(), // 15 mins from now
    },
  },
  {
    id: "8",
    type: "farm",
    plant: EPlants.BioBacteria,
    process: {
      startDate: new Date(Date.now() - 2700000).toISOString(), // 45 mins ago
      endDate: new Date(Date.now() + 2700000).toISOString(), // 45 mins from now
    },
  },
  {
    id: "9",
    type: "farm",
    plant: EPlants.MetalCactus,
    process: {
      startDate: new Date(Date.now() - 1200000).toISOString(), // 20 mins ago
      endDate: new Date(Date.now() + 1200000).toISOString(), // 20 mins from now
    },
  },
  {
    id: "10",
    type: "farm",
    blocked: true,
  },
  {
    id: "11",
    type: "farm",
    blocked: true,
  },
  {
    id: "12",
    type: "farm",
    plant: EPlants.PlasmaMushroom,
    process: {
      startDate: new Date(Date.now() - 2400000).toISOString(), // 40 mins ago
      endDate: new Date(Date.now() + 2400000).toISOString(), // 40 mins from now
    },
  },
  {
    id: "13",
    type: "farm",
    plant: EPlants.BioBacteria,
    process: {
      startDate: new Date(Date.now() - 4800000).toISOString(), // 1.2 hours ago
      endDate: new Date(Date.now() + 4800000).toISOString(), // 1.2 hours from now
    },
  },
  {
    id: "14",
    type: "farm",
    plant: EPlants.MetalCactus,
    process: {
      startDate: new Date(Date.now() - 300000).toISOString(), // 5 mins ago
      endDate: new Date(Date.now() + 300000).toISOString(), // 5 mins from now
    },
  },
  {
    id: "15",
    type: "farm",
    blocked: true,
  },
  {
    id: "16",
    type: "farm",
    blocked: true,
  },
];


const CyberFarmFarmsPage: React.FC = () => {
  return (
    <main className="cyberFarmContainer">

      <CyberFarmWrapperWithList title={"Фермы"} data={farms}/>
    </main>
  );
};

export default CyberFarmFarmsPage;
