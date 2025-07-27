export interface RestoreAPResponse {
  status: "ok";
  action_points_added: number;
  action_points_current: number;
  cash_point_left?: number;
}
