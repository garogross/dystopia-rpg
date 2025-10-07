export interface IFarmUserRating {
  user_id: number;
  name: string;
  rank: number;
  structures_value: number;
}

export interface IFarmUserStructuresRankRating extends IFarmUserRating {
  fields: number;
  farms: number;
  factories: number;
  farm_upgrade_levels: number;
  factory_upgrade_levels: number;
}
export interface IFarmUserWealthRankRating extends IFarmUserRating {
  resources_cost: number;
  production_cost: number;
  structures_value: number;
  total_value: number;
}
