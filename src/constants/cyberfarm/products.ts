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

export const products = {
    [EFactoryProducts.Metal]: {
        src: metalImage,
        srcSet: metalImageWebp,
        name: "Металл",
        type: "factory"
    },
    [EFactoryProducts.BioGel]: {
        src: bioGelImage,
        srcSet: bioGelImageWebp,
        name: "Биогель",
        type: "factory"
    },
    [EFactoryProducts.EdibleBrick]: {
        src: edibleBrickImage,
        srcSet: edibleBrickImageWebp,
        name: "Съед. брикет",
        type: "factory"
    },
    [EFactoryProducts.Energy]: {
        src: energyImage,
        srcSet: energyImageWebp,
        name: "Энергия",
        type: "factory"
    },
    [EFactoryProducts.EnergyCore]: {
        src: energyCoreImage,
        srcSet: energyCoreImageWebp,
        name: "Энергоядро",
        type: "factory"
    },
    [EFactoryProducts.OrganicMeat]: {
        src: organicMeatImage,
        srcSet: organicMeatImageWebp,
        name: "Орг. мясо",
        type: "factory"
    },
    [EFactoryProducts.Plasma]: {
        src: plasmaImage,
        srcSet: plasmaImageWebp,
        name: "Плазма",
        type: "factory"
    },
    [EFactoryProducts.RepairKit]: {
        src: repairKitImage,
        srcSet: repairKitImageWebp,
        name: "Ремкомплект",
        type: "factory"
    },
    // plants
    [EPlants.MetalCactus]: {
        src: metalCactusImage,
        srcSet: metalCactusImageWebp,
        name: "Металокактусы",
        type: "plant"
    },
    [EPlants.PlasmaMushroom]: {
        src: plasmaMushroomImage,
        srcSet: plasmaMushroomImageWebp,
        name: "Плазмогрибы",
        type: "plant"
    },
    [EPlants.BioBacteria]: {
        src: bioBacteriaImage,
        srcSet: bioBacteriaImageWebp,
        name: "Биобактерии",
        type: "plant"
    },
}