export interface ReceiveMailRewardResponse {
  status: string;
  mail_id: string;
  reward_given?: {
    cp?: number;
  };
}
