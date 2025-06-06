import { EFactoryProducts } from "../constants/cyberfarm/EFactoryProducts";
import { EPlants } from "../constants/EPlants";


export interface IFarmField {
    id: string,
    type: "field" | "farm" | "factory",
    blocked?: boolean
    plant?: EPlants,
    factoryProduct?: EFactoryProducts,
    process?: {
        startDate: string,
        endDate: string,
    }
}