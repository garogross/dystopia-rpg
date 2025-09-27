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
  bioGelEvoImage,
  bioGelEvoWebpImage,
  edibleBrickEvoImage,
  edibleBrickEvoWebpImage,
  energyCoreEvoImage,
  energyCoreEvoWebpImage,
  energyEvoImage,
  energyEvoWebpImage,
  metalEvoImage,
  metalEvoWebpImage,
  organicMeatEvoImage,
  organicMeatEvoWebpImage,
  plasmaEvoImage,
  plasmaEvoWebpImage,
  repairKitEvoImage,
  repairKitEvoWebpImage,
  bioBacteriaEvoImage,
  bioBacteriaEvoWebpImage,
  insectsEvoPlantImage,
  insectsEvoPlantWebpImage,
  metalCactusEvoPlantImage,
  metalCactusEvoPlantWebpImage,
  plasmaMushroomEvoImage,
  plasmaMushroomEvoWebpImage,
  algaeEvoImage,
  algaeEvoWebpImage,
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
    evo: {
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
    evo: {
      src: metalEvoImage,
      srcSet: metalEvoWebpImage,
    },
    name: metal,
    twistedName: metalTwisted,
    type: "factory",
  },
  [EFactoryProducts.BioGel]: {
    src: bioGelImage,
    srcSet: bioGelImageWebp,
    evo: {
      src: bioGelEvoImage,
      srcSet: bioGelEvoWebpImage,
    },
    name: bioGel,
    twistedName: bioGelTwisted,
    type: "factory",
    forSale: true,
  },
  [EFactoryProducts.EdibleBrick]: {
    src: edibleBrickImage,
    srcSet: edibleBrickImageWebp,
    evo: {
      src: edibleBrickEvoImage,
      srcSet: edibleBrickEvoWebpImage,
    },
    name: edibleBrick,
    twistedName: edibleBrickTwisted,
    type: "factory",
    forSale: true,
  },
  [EFactoryProducts.Energy]: {
    src: energyImage,
    srcSet: energyImageWebp,
    evo: {
      src: energyEvoImage,
      srcSet: energyEvoWebpImage,
    },
    name: energy,
    twistedName: energyTwisted,
    type: "factory",
  },
  [EFactoryProducts.EnergyCore]: {
    src: energyCoreImage,
    srcSet: energyCoreImageWebp,
    evo: {
      src: energyCoreEvoImage,
      srcSet: energyCoreEvoWebpImage,
    },
    name: energyCore,
    twistedName: energyCoreTwisted,
    type: "factory",
  },
  [EFactoryProducts.OrganicMeat]: {
    src: organicMeatImage,
    srcSet: organicMeatImageWebp,
    evo: {
      src: organicMeatEvoImage,
      srcSet: organicMeatEvoWebpImage,
    },
    name: organicMeat,
    twistedName: organicMeatTwisted,
    type: "factory",
    forSale: true,
  },
  [EFactoryProducts.Plasma]: {
    src: plasmaImage,
    srcSet: plasmaImageWebp,
    evo: {
      src: plasmaEvoImage,
      srcSet: plasmaEvoWebpImage,
    },
    name: plasma,
    twistedName: plasmaTwisted,
    type: "factory",
  },
  [EFactoryProducts.RepairKit]: {
    src: repairKitImage,
    srcSet: repairKitImageWebp,
    evo: {
      src: repairKitEvoImage,
      srcSet: repairKitEvoWebpImage,
    },
    name: repairKit,
    twistedName: repairKitTwisted,
    type: "factory",
  },
  // plants
  [EPlants.MetalCactus]: {
    src: metalCactusImage,
    srcSet: metalCactusImageWebp,
    evo: {
      src: metalCactusEvoPlantImage,
      srcSet: metalCactusEvoPlantWebpImage,
    },
    name: metalCactus,
    twistedName: metalCactusTwisted,
    type: "plant",
  },
  [EPlants.PlasmaMushroom]: {
    src: plasmaMushroomImage,
    srcSet: plasmaMushroomImageWebp,
    evo: {
      src: plasmaMushroomEvoImage,
      srcSet: plasmaMushroomEvoWebpImage,
    },
    name: plasmaMushroom,
    twistedName: plasmaMushroomTwisted,
    type: "plant",
  },
  [EPlants.BioBacteria]: {
    src: bioBacteriaImage,
    srcSet: bioBacteriaImageWebp,
    evo: {
      src: bioBacteriaEvoImage,
      srcSet: bioBacteriaEvoWebpImage,
    },
    name: bioBacteria,
    twistedName: bioBacteriaTwisted,
    type: "plant",
  },
  [EPlants.Algae]: {
    src: algaeImage,
    srcSet: algaeImageWebp,
    evo: {
      src: algaeEvoImage,
      srcSet: algaeEvoWebpImage,
    },
    name: algae,
    twistedName: algaeTwisted,
    type: "plant",
  },
  [EPlants.ModifiedInsects]: {
    src: insectsImage,
    srcSet: insectsImageWebp,
    evo: {
      src: insectsEvoPlantImage,
      srcSet: insectsEvoPlantWebpImage,
    },
    name: modifiedInsects,
    twistedName: modifiedInsectsTwisted,
    type: "plant",
  },
};
