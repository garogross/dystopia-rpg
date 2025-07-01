export interface ClaimTadsRewardResponse {
  status: string;
  telegram_id: number;
  task_id: string;
  task_type: "task";
  reward: number;
}
