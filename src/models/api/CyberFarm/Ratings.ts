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
  my_rank: {
    structures: {
      total: number;
      user_id: number;
      rank: number;
      structures_value: number;
      fields: number;
      farms: number;
      factories: number;
      farm_upgrade_levels: number;
      factory_upgrade_levels: number;
    };
    wealth: {
      total: number;
      user_id: number;
      rank: number;
      total_value: number;
      resources_cost: number;
      production_cost: number;
      unsorted_products_cost: number;
      structures_value: number;
    };
  };
}
