import { ELanguages } from "../constants/ELanguages";
import { ELSProps } from "../constants/ELSProps";

export interface LsData {
  [ELSProps.token]: string;
  [ELSProps.language]: ELanguages;
  [ELSProps.videoAdViewTimestamps]: number;
  [ELSProps.adsgramLastClickDate]: number;
  [ELSProps.hideTraffyContainerUntil]: number;
}
