import {
  bioGelImage,
  bioGelImageWebp,
  edibleBrickImage,
  edibleBrickImageWebp,
  energyImage,
  energyImageWebp,
  energyCoreImage,
  energyCoreImageWebp,
  metalImage,
  metalImageWebp,
  organicMeatImage,
  organicMeatImageWebp,
  plasmaImage,
  plasmaImageWebp,
  repairKitImage,
  repairKitImageWebp,
  bioBacteriaImage,
  bioBacteriaImageWebp,
  metalCactusImage,
  metalCactusImageWebp,
  plasmaMushroomImage,
  plasmaMushroomImageWebp,
} from "../../assets/imageMaps";
import { EPlants } from "./EPlants";
import { TRANSLATIONS } from "../TRANSLATIONS";
import { EFactoryProducts } from "./EFactoryProducts";

const {
  metal,
  bioGel,
  edibleBrick,
  energy,
  energyCore,
  organicMeat,
  plasma,
  repairKit,
  metalCactus,
  plasmaMushroom,
  bioBacteria,
} = TRANSLATIONS.cyberFarm.products;

export const products = {
  [EFactoryProducts.Metal]: {
    src: metalImage,
    srcSet: metalImageWebp,
    name: metal,
    type: "factory",
  },
  [EFactoryProducts.BioGel]: {
    src: bioGelImage,
    srcSet: bioGelImageWebp,
    name: bioGel,
    type: "factory",
  },
  [EFactoryProducts.EdibleBrick]: {
    src: edibleBrickImage,
    srcSet: edibleBrickImageWebp,
    name: edibleBrick,
    type: "factory",
  },
  [EFactoryProducts.Energy]: {
    src: energyImage,
    srcSet: energyImageWebp,
    name: energy,
    type: "factory",
  },
  [EFactoryProducts.EnergyCore]: {
    src: energyCoreImage,
    srcSet: energyCoreImageWebp,
    name: energyCore,
    type: "factory",
  },
  [EFactoryProducts.OrganicMeat]: {
    src: organicMeatImage,
    srcSet: organicMeatImageWebp,
    name: organicMeat,
    type: "factory",
  },
  [EFactoryProducts.Plasma]: {
    src: plasmaImage,
    srcSet: plasmaImageWebp,
    name: plasma,
    type: "factory",
  },
  [EFactoryProducts.RepairKit]: {
    src: repairKitImage,
    srcSet: repairKitImageWebp,
    name: repairKit,
    type: "factory",
  },
  // plants
  [EPlants.MetalCactus]: {
    src: metalCactusImage,
    srcSet: metalCactusImageWebp,
    name: metalCactus,
    type: "plant",
  },
  [EPlants.PlasmaMushroom]: {
    src: plasmaMushroomImage,
    srcSet: plasmaMushroomImageWebp,
    name: plasmaMushroom,
    type: "plant",
  },
  [EPlants.BioBacteria]: {
    src: bioBacteriaImage,
    srcSet: bioBacteriaImageWebp,
    name: bioBacteria,
    type: "plant",
  },
};
