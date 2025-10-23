export interface GetWithdrawRatesResponse {
  generated_at: string;
  rates: {
    cp_usdt_price_usd_per_cp: number;
    ton_usd_rate_usd_per_ton: number;
  };
  rates_per_1000cp: {
    usdt: number;
    ton: number;
  };
  commissions: {
    commission_usdt_abs: number;
    commission_ton_abs: number;
  };
}
