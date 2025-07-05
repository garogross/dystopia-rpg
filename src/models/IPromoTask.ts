export interface IPromoTask {
  id: number;
  name: string;
  description: string;
  reward: number;
  target_url: string;
  subscription?: boolean;
}
