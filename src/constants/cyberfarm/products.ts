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
  algaeImage,
  algaeImageWebp,
  insectsImage,
  insectsImageWebp,
  evoPlasmaMushroomOnFieldImage,
  evoPlasmaMushroomOnFieldWebpImage,
} from "../../assets/imageMaps";
import { EPlants } from "./EPlants";
import { TRANSLATIONS } from "../TRANSLATIONS";
import { EFactoryProducts } from "./EFactoryProducts";
import { TranslationItemType } from "../../types/TranslationItemType";

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
  algae,
  modifiedInsects,
  metalTwisted,
  bioGelTwisted,
  edibleBrickTwisted,
  energyTwisted,
  energyCoreTwisted,
  organicMeatTwisted,
  plasmaTwisted,
  repairKitTwisted,
  metalCactusTwisted,
  plasmaMushroomTwisted,
  bioBacteriaTwisted,
  algaeTwisted,
  modifiedInsectsTwisted,
} = TRANSLATIONS.cyberFarm.products;

export const products: {
  [key in EFactoryProducts | EPlants]: {
    src: string;
    srcSet: string;
    evo?: {
      src: string;
      srcSet: string;
    };
    name: TranslationItemType;
    twistedName: TranslationItemType;
    type: "factory" | "plant";
    forSale?: boolean;
  };
} = {
  [EFactoryProducts.Metal]: {
    src: metalImage,
    srcSet: metalImageWebp,

    name: metal,
    twistedName: metalTwisted,
    type: "factory",
  },
  [EFactoryProducts.BioGel]: {
    src: bioGelImage,
    srcSet: bioGelImageWebp,
    name: bioGel,
    twistedName: bioGelTwisted,
    type: "factory",
    forSale: true,
  },
  [EFactoryProducts.EdibleBrick]: {
    src: edibleBrickImage,
    srcSet: edibleBrickImageWebp,
    name: edibleBrick,
    twistedName: edibleBrickTwisted,
    type: "factory",
    forSale: true,
  },
  [EFactoryProducts.Energy]: {
    src: energyImage,
    srcSet: energyImageWebp,
    name: energy,
    twistedName: energyTwisted,
    type: "factory",
  },
  [EFactoryProducts.EnergyCore]: {
    src: energyCoreImage,
    srcSet: energyCoreImageWebp,
    name: energyCore,
    twistedName: energyCoreTwisted,
    type: "factory",
  },
  [EFactoryProducts.OrganicMeat]: {
    src: organicMeatImage,
    srcSet: organicMeatImageWebp,
    name: organicMeat,
    twistedName: organicMeatTwisted,
    type: "factory",
    forSale: true,
  },
  [EFactoryProducts.Plasma]: {
    src: plasmaImage,
    srcSet: plasmaImageWebp,
    evo: {
      src: evoPlasmaMushroomOnFieldImage,
      srcSet: evoPlasmaMushroomOnFieldWebpImage,
    },
    name: plasma,
    twistedName: plasmaTwisted,
    type: "factory",
  },
  [EFactoryProducts.RepairKit]: {
    src: repairKitImage,
    srcSet: repairKitImageWebp,
    name: repairKit,
    twistedName: repairKitTwisted,
    type: "factory",
  },
  // plants
  [EPlants.MetalCactus]: {
    src: metalCactusImage,
    srcSet: metalCactusImageWebp,
    name: metalCactus,
    twistedName: metalCactusTwisted,
    type: "plant",
  },
  [EPlants.PlasmaMushroom]: {
    src: plasmaMushroomImage,
    srcSet: plasmaMushroomImageWebp,
    name: plasmaMushroom,
    twistedName: plasmaMushroomTwisted,
    type: "plant",
  },
  [EPlants.BioBacteria]: {
    src: bioBacteriaImage,
    srcSet: bioBacteriaImageWebp,
    name: bioBacteria,
    twistedName: bioBacteriaTwisted,
    type: "plant",
  },
  [EPlants.Algae]: {
    src: algaeImage,
    srcSet: algaeImageWebp,
    name: algae,
    twistedName: algaeTwisted,
    type: "plant",
  },
  [EPlants.ModifiedInsects]: {
    src: insectsImage,
    srcSet: insectsImageWebp,
    name: modifiedInsects,
    twistedName: modifiedInsectsTwisted,
    type: "plant",
  },
};
