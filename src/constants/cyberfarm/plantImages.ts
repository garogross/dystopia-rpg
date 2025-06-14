import { EPlants } from "./EPlants";
import {
  algaeImage,
  algaeImageWebp,
  algaeInFarmImage,
  algaeInFarmImageWebp,
  algaeOnFieldImage,
  algaeOnFieldImageWebp,
  bioBacteriaImage,
  bioBacteriaImageWebp,
  bioBacteriaInFarmImage,
  bioBacteriaInFarmImageWebp,
  bioBacteriaOnFieldImage,
  bioBacteriaOnFieldImageWebp,
  insectsImage,
  insectsImageWebp,
  insectsInFarmImage,
  insectsInFarmImageWebp,
  insectsOnFieldImage,
  insectsOnFieldImageWebp,
  metalCactusImage,
  metalCactusImageWebp,
  metalCactusInFarmImage,
  metalCactusInFarmImageWebp,
  metalCactusOnFieldImage,
  metalCactusOnFieldImageWebp,
  plasmaMushroomImage,
  plasmaMushroomImageWebp,
  plasmaMushroomInFarmImage,
  plasmaMushroomInFarmImageWebp,
  plasmaMushroomOnFieldImage,
  plasmaMushroomOnFieldImageWebp,
} from "../../assets/imageMaps";

export const plantImages = {
  [EPlants.BioBacteria]: {
    main: {
      src: bioBacteriaImage,
      srcSet: bioBacteriaImageWebp,
    },
    onField: {
      src: bioBacteriaOnFieldImage,
      srcSet: bioBacteriaOnFieldImageWebp,
    },
    inFarm: {
      src: bioBacteriaInFarmImage,
      srcSet: bioBacteriaInFarmImageWebp,
    },
  },
  [EPlants.MetalCactus]: {
    main: {
      src: metalCactusImage,
      srcSet: metalCactusImageWebp,
    },
    onField: {
      src: metalCactusOnFieldImage,
      srcSet: metalCactusOnFieldImageWebp,
    },
    inFarm: {
      src: metalCactusInFarmImage,
      srcSet: metalCactusInFarmImageWebp,
    },
  },
  [EPlants.PlasmaMushroom]: {
    main: {
      src: plasmaMushroomImage,
      srcSet: plasmaMushroomImageWebp,
    },
    onField: {
      src: plasmaMushroomOnFieldImage,
      srcSet: plasmaMushroomOnFieldImageWebp,
    },
    inFarm: {
      src: plasmaMushroomInFarmImage,
      srcSet: plasmaMushroomInFarmImageWebp,
    },
  },
  [EPlants.Algae]: {
    main: {
      src: algaeImage,
      srcSet: algaeImageWebp,
    },
    onField: {
      src: algaeOnFieldImage,
      srcSet: algaeOnFieldImageWebp,
    },
    inFarm: {
      src: algaeInFarmImage,
      srcSet: algaeInFarmImageWebp,
    },
  },
  [EPlants.ModifiedInsects]: {
    main: {
      src: insectsImage,
      srcSet: insectsImageWebp,
    },
    onField: {
      src: insectsOnFieldImage,
      srcSet: insectsOnFieldImageWebp,
    },
    inFarm: {
      src: insectsInFarmImage,
      srcSet: insectsInFarmImageWebp,
    },
  },
};
