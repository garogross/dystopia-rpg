import { EPlants } from "./EPlants";
import {
  algaeImage,
  algaeImageWebp,
  bioBacteriaImage,
  bioBacteriaImageWebp,
  evoAlgaeInFarmImage,
  evoAlgaeInFarmWebpImage,
  evoAlgaeOnFieldImage,
  evoAlgaeOnFieldWebpImage,
  evoBioBacteriaInFarmImage,
  evoBioBacteriaInFarmWebpImage,
  evoBioBacteriaOnFieldImage,
  evoBioBacteriaOnFieldWebpImage,
  evoInsectsOnFieldImage,
  evoInsectsOnFieldWebpImage,
  evoMetalCactusInFarmImage,
  evoMetalCactusInFarmWebpImage,
  evoMetalCactusOnFieldImage,
  evoMetalCactusOnFieldWebpImage,
  evoPlasmaMushroomInFarmImage,
  evoPlasmaMushroomInFarmWebpImage,
  evoPlasmaMushroomOnFieldImage,
  evoPlasmaMushroomOnFieldWebpImage,
  insectsImage,
  insectsImageWebp,
  insectsInFarmImage,
  insectsInFarmImageWebp,
  metalCactusImage,
  metalCactusImageWebp,
  plasmaMushroomImage,
  plasmaMushroomImageWebp,
} from "../../assets/imageMaps";

export const evoPlantImages = {
  [EPlants.BioBacteria]: {
    main: {
      src: bioBacteriaImage,
      srcSet: bioBacteriaImageWebp,
    },
    onField: {
      src: evoBioBacteriaOnFieldImage,
      srcSet: evoBioBacteriaOnFieldWebpImage,
    },
    inFarm: {
      src: evoBioBacteriaInFarmImage,
      srcSet: evoBioBacteriaInFarmWebpImage,
    },
  },
  [EPlants.MetalCactus]: {
    main: {
      src: metalCactusImage,
      srcSet: metalCactusImageWebp,
    },
    onField: {
      src: evoMetalCactusOnFieldImage,
      srcSet: evoMetalCactusOnFieldWebpImage,
    },
    inFarm: {
      src: evoMetalCactusInFarmImage,
      srcSet: evoMetalCactusInFarmWebpImage,
    },
  },
  [EPlants.PlasmaMushroom]: {
    main: {
      src: plasmaMushroomImage,
      srcSet: plasmaMushroomImageWebp,
    },
    onField: {
      src: evoPlasmaMushroomOnFieldImage,
      srcSet: evoPlasmaMushroomOnFieldWebpImage,
    },
    inFarm: {
      src: evoPlasmaMushroomInFarmImage,
      srcSet: evoPlasmaMushroomInFarmWebpImage,
    },
  },
  [EPlants.Algae]: {
    main: {
      src: algaeImage,
      srcSet: algaeImageWebp,
    },
    onField: {
      src: evoAlgaeOnFieldImage,
      srcSet: evoAlgaeOnFieldWebpImage,
    },
    inFarm: {
      src: evoAlgaeInFarmImage,
      srcSet: evoAlgaeInFarmWebpImage,
    },
  },
  [EPlants.ModifiedInsects]: {
    main: {
      src: insectsImage,
      srcSet: insectsImageWebp,
    },
    onField: {
      src: evoInsectsOnFieldImage,
      srcSet: evoInsectsOnFieldWebpImage,
    },
    inFarm: {
      src: insectsInFarmImage,
      srcSet: insectsInFarmImageWebp,
    },
  },
};
