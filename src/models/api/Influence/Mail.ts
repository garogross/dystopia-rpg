export interface ReceiveMailRewardResponse {
  status: string;
  mail_id: string;
  deleted?: boolean;
  read_all?: boolean;
  reward_given?: {
    cp?: number;
  };
}
