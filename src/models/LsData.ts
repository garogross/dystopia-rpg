import { ELSProps } from "../constants/ELSProps";

export interface LsData {
  [ELSProps.token]: string;
  videoAdViewTimestamps: number;
  adsgramLastClickDate: number;
  hideTraffyContainerUntil: number;
}
