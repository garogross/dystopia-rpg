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
  moduleAccelerationImage,
  moduleAutonomyImage,
  moduleProductionImage,
  moduleProductionImageWebp,
  moduleAutonomyImageWebp,
  chip1Image,
  chip1ImageWebp,
  chip2Image,
  chip2ImageWebp,
  chip3Image,
  chip3ImageWebp,
  randomChipImage,
  randomChipImageWebp,
} from "../../assets/imageMaps";
import { EPlants } from "./EPlants";
import { TRANSLATIONS } from "../TRANSLATIONS";
import { EFactoryProducts } from "./EFactoryProducts";
import { TranslationItemType } from "../../types/TranslationItemType";
import { EModuleProducts } from "./EModuleProducts";
import { EChipProducts } from "./EChipProducts";

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
  productionModule,
  accelerationModule,
  autonomyModule,
  chip1,
  chip1Twisted,
  chip2,
  chip2Twisted,
  chip3,
  chip3Twisted,
  chipText,
} = TRANSLATIONS.cyberFarm.products;

export const products: {
  [key in
    | EFactoryProducts
    | EPlants
    | EModuleProducts
    | EChipProducts
    | "chips"]: {
    src: string;
    srcSet: string;
    evo: {
      src: string;
      srcSet: string;
    };
    name: TranslationItemType;
    twistedName: TranslationItemType;
    type: "factory" | "plant" | "chips" | "modules";
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
  [EModuleProducts.Production]: {
    src: moduleProductionImage,
    srcSet: moduleProductionImageWebp,
    evo: {
      src: moduleProductionImage,
      srcSet: moduleProductionImageWebp,
    },
    name: productionModule,
    twistedName: productionModule,
    type: "modules",
  },
  [EModuleProducts.Autonomy]: {
    src: moduleAutonomyImage,
    srcSet: moduleAutonomyImageWebp,
    evo: {
      src: moduleAutonomyImage,
      srcSet: moduleAutonomyImageWebp,
    },
    name: autonomyModule,
    twistedName: autonomyModule,
    type: "modules",
  },
  [EModuleProducts.Acceleration]: {
    src: moduleAccelerationImage,
    srcSet: moduleAccelerationImage,
    evo: {
      src: moduleAccelerationImage,
      srcSet: moduleAccelerationImage,
    },
    name: accelerationModule,
    twistedName: accelerationModule,
    type: "modules",
  },

  [EChipProducts.Chip1]: {
    src: chip1Image,
    srcSet: chip1ImageWebp,
    evo: {
      src: chip1Image,
      srcSet: chip1ImageWebp,
    },
    name: chip1,
    twistedName: chip1Twisted,
    type: "chips",
  },
  [EChipProducts.Chip2]: {
    src: chip2Image,
    srcSet: chip2ImageWebp,
    evo: {
      src: chip2Image,
      srcSet: chip2ImageWebp,
    },
    name: chip2,
    twistedName: chip2Twisted,
    type: "chips",
  },
  [EChipProducts.Chip3]: {
    src: chip3Image,
    srcSet: chip3ImageWebp,
    evo: {
      src: chip3Image,
      srcSet: chip3ImageWebp,
    },
    name: chip3,
    twistedName: chip3Twisted,
    type: "chips",
  },
  chips: {
    src: randomChipImage,
    srcSet: randomChipImageWebp,
    evo: {
      src: randomChipImage,
      srcSet: randomChipImageWebp,
    },
    name: chipText,
    twistedName: chipText,
    type: "chips",
  },
};
