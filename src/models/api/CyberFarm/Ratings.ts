import {
  IFarmUserStructuresRankRating,
  IFarmUserWealthRankRating,
} from "../../CyberFarm/IFarmUserRating";

export interface GetRatingsListResponse {
  generated_at: string;
  structures_rank: {
    total: number;
    items: IFarmUserStructuresRankRating[];
  };
  wealth_rank: {
    total: number;
    items: IFarmUserWealthRankRating[];
  };
}
