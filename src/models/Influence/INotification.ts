import { ENotificationSubtypes } from "../../constants/influence/ENotificationSubtypes";
import { ENotificationTypes } from "../../constants/influence/ENotificationTypes";

export interface INotification {
  id: string;
  type: ENotificationTypes;
  subtype: ENotificationSubtypes;
  title: string;
  description: string;
  date: number;
}
