export interface WithdrawCPResponse {
  status: string;
  amount_cp: number;
  currency: "usdt" | "ton";
  payout: number;
  payout_usd: number;
  cp_usdt_price: number;
  ton_usd_rate: number;
  address: string;
}
