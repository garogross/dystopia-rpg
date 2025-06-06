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
} from "../../assets/imageMaps"
import { EPlants } from "../EPlants"
import { EFactoryProducts } from "./EFactoryProducts"

export const productImages = {
    [EFactoryProducts.Metal]: {
        src: metalImage,
        srcSet: metalImageWebp,
    },
    [EFactoryProducts.BioGel]: {
        src: bioGelImage,
        srcSet: bioGelImageWebp,
    },
    [EFactoryProducts.EdibleBrick]: {
        src: edibleBrickImage,
        srcSet: edibleBrickImageWebp,
    },
    [EFactoryProducts.Energy]: {
        src: energyImage,
        srcSet: energyImageWebp,
    },
    [EFactoryProducts.EnergyCore]: {
        src: energyCoreImage,
        srcSet: energyCoreImageWebp,
    },
    [EFactoryProducts.OrganicMeat]: {
        src: organicMeatImage,
        srcSet: organicMeatImageWebp,
    },
    [EFactoryProducts.Plasma]: {
        src: plasmaImage,
        srcSet: plasmaImageWebp,
    },
    [EFactoryProducts.RepairKit]: {
        src: repairKitImage,
        srcSet: repairKitImageWebp,
    },
    // plants
    [EPlants.BioBacteria]: {
        src: bioBacteriaImage,
        srcSet: bioBacteriaImageWebp,
    },
    [EPlants.MetalCactus]: {
        src: metalCactusImage,
        srcSet: metalCactusImageWebp,
    },
    [EPlants.PlasmaMushroom]: {
        src: plasmaMushroomImage,
        srcSet: plasmaMushroomImageWebp,
    },
}