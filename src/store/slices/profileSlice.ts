import { createSlice } from "@reduxjs/toolkit";
// import { fetchRequest } from "../tools/fetchTools";
import { fetchRequest } from "../tools/fetchTools";
import { AuthUserResponse } from "../../models/api/AuthUserResponse";
import { getLSItem, setLSItem } from "../../helpers/localStorage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EStats } from "../../constants/EStats";
import { GetAccountDetailsResponse } from "../../models/api/GetAccountDetailsResponse";
import { AppDispatch } from "../store";
import { AppGameMode } from "../../types/AppGameMode";
import { ELSProps } from "../../constants/ELSProps";
import { initCyberFarm } from "./cyberFarm/cyberfarmSlice";
import { buySlot, getCyberFarmSlots, speedUp } from "./cyberFarm/slotsSlice";
import {
  buyResourceDeflict,
  getCyberFarmResources,
  exchange,
} from "./cyberFarm/resourcesSlice";
import { claimDailyReward, initDailyReward } from "./cyberFarm/activitySlice";
import { initSocialShop } from "./cyberFarm/socialShopSlice";
import {
  claimAdReward,
  getAdRewardSettings,
  getPromoTaskReward,
  getRewardTaddy,
  verifyGigaHash,
} from "./tasksSlice";
import { initAchievments } from "./cyberFarm/achievmentsSlice";
import { WithdrawCPResponse } from "../../models/api/WithdrawCPResponse";
import { convertReferals } from "./refferencesSlice";
import { finsihTutorial, initTutorial } from "./cyberFarm/tutorialSlice";
import { initInfluence, restoreAP } from "./influence/influenceSlice";
import { initSettings } from "./influence/settingsSlice";
import { initMap } from "./influence/mapSlice";
import { initMail, receiveMailReward } from "./influence/mailSlice";
import { EAdSlots } from "../../constants/EAdSlots";
import { GetWithdrawRatesResponse } from "../../models/api/GetWithdrawRatesResponse";
// import {AppDispatch, RootState} from "../store";

// endpoints

export interface ProfileState {
  id: string;
  tgId: string | number;
  token: string;
  username: string;
  avatar?: string;
  stats: {
    [key in EStats]: number;
  };
  accountDetailsReceived: boolean;
  tonWithdrawCommission: number;
  usdtWithdrawCommission: number;
  tonWithdrawPoolAmount: number;
  usdtWithdrawPoolAmount: number;
}

const initUserData =
  process.env.NODE_ENV === "development"
    ? {
        token: process.env.REACT_APP_TEST_TOKEN || "",
        username: process.env.REACT_APP_TEST_USERNAME || "",
        tgId: process.env.REACT_APP_TEST_TG_ID || "",
      }
    : {
        token: "",
        username: "",
        tgId: "",
      };

const initialState: ProfileState = {
  id: "",
  ...initUserData,
  avatar: "",
  stats: {
    [EStats.kredit]: 0,
    [EStats.darkMatter]: 0,
    [EStats.token]: 0,
    [EStats.lp]: 0,
    [EStats.cp]: 0,
    [EStats.ton]: 0,
  },
  accountDetailsReceived: false,
  tonWithdrawCommission: 0,
  usdtWithdrawCommission: 0,
  tonWithdrawPoolAmount: 0,
  usdtWithdrawPoolAmount: 0,
};
const authUserUrl = "/auth";

export const authUser = createAsyncThunk<AuthUserResponse, string>(
  "profile/authUser",
  async (payload, { rejectWithValue }) => {
    try {
      const resData = await fetchRequest<AuthUserResponse>(
        authUserUrl,
        "POST",
        {
          initData: payload,
        }
      );

      if (resData.token) {
        setLSItem(ELSProps.token, resData.token);
      }
      return resData;
    } catch (error: any) {
      console.error("error", error);
      return rejectWithValue(error);
    }
  }
);

const getAccountDetailsUrl = "/account/";

export const getAccountDetails =
  (avatar?: string, username?: string, mode?: AppGameMode) =>
  async (dispatch: AppDispatch) => {
    const resData = await fetchRequest<GetAccountDetailsResponse>(
      `${getAccountDetailsUrl}${mode ? `?mode=${mode}` : ""}`
    );

    dispatch(getAdRewardSettings());
    dispatch(
      setUser({
        id: resData.user?.id_tgrm,
        tgId: resData.user?.id_tgrm,
        avatar,
        username,
      })
    );

    const pools = resData?.game_settings_new?.pools;
    dispatch(
      receiveAccountDetails({
        tonWithdrawCommission: pools?.ton_pool?.comission_ton || 0,
        usdtWithdrawCommission: pools?.usdt_pool?.comission_usdt || 0,
        tonWithdrawPoolAmount: pools?.ton_pool?.amount || 0,
        usdtWithdrawPoolAmount: pools?.usdt_pool?.amount || 0,
      })
    );
    dispatch(
      updateStats({
        [EStats.cp]: resData.user?.profile?.cash_point || 0,
        [EStats.ton]: resData.ton_cyber_farm?.ton || 0,
      })
    );
    // update dailyReward
    const day_number =
      resData?.claim_daily_login?.day_number ||
      resData.settings?.claim_daily_login?.day_number;
    const reward_available =
      resData?.claim_daily_login?.reward_available ||
      resData.settings?.claim_daily_login?.reward_available;
    const rewards_by_day =
      resData?.claim_daily_login?.rewards_by_day ||
      resData.settings?.claim_daily_login?.rewards_by_day;

    dispatch(
      initDailyReward({
        dailyRewardAvailable: reward_available,
        dailyRewardAvailableDay: day_number,
        rewardsByDay: Object.values(rewards_by_day),
        lastClaimedDate:
          resData?.ton_cyber_farm?.timers?.daily_login_claimed || null,
      })
    );

    if (resData.ton_cyber_farm && resData.mode === "ton_cyber_farm") {
      dispatch(initCyberFarm());
      // store slots

      dispatch(
        getCyberFarmSlots({
          slots: resData.ton_cyber_farm.slots,
          slotCosts: resData.game_settings?.slot_costs,
        })
      );

      // store resources
      if (resData.game_settings) {
        dispatch(
          getCyberFarmResources({
            resources: resData.ton_cyber_farm.resources,
            resourceDeficit: resData?.resource_deficit,
            productsSettings:
              resData?.game_settings_new?.ton_cyber_farm_products,
          })
        );
      }
      if (resData.social_shop)
        if (resData.social_shop) {
          // social shop
          dispatch(
            initSocialShop({
              socialShop: resData.social_shop,
              availableIn:
                resData.ton_cyber_farm.timers?.social_shop?.cooldown_until_ts ||
                null,
            })
          );
        }
      // cyberfarm achievments
      dispatch(
        initAchievments({
          achievments: resData.ton_cyber_farm.achievements,
          achievmentSettings: resData.game_settings?.achievements_settings,
        })
      );

      // cyberfarm tutorial
      const isTutorialFinished =
        resData.ton_cyber_farm.ton_cyber_farm_tutorial_finished;
      dispatch(
        initTutorial({
          tutorialInProgress: isTutorialFinished ? !isTutorialFinished : true,
        })
      );
    }

    if (resData.mode === "influence") {
      dispatch(
        initInfluence({
          actionPoints: resData.user?.action_points_current || 0,
          influencePoints: resData.user?.influence_points || 0,
          lastRestoreActionPointsTs:
            resData.user?.timers.last_restore_action_points_ts,
        })
      );
      const action_point_restore = resData.settings?.action_point_restore;
      const attack_enemy_hex_without_building =
        resData.settings?.attack_enemy_hex_without_building;
      const attack_neutral_hex = resData.settings?.attack_neutral_hex;
      dispatch(
        initSettings({
          actionPointRestore: {
            amount: action_point_restore?.amount || 0,
            intervalMinutes: action_point_restore?.interval_minutes || 0,
          },
          attackNeutralHex: {
            actionPointsCost: attack_neutral_hex?.action_points_cost,
            influencePointsReward: attack_neutral_hex?.influence_points_reward,
          },
          attackEnemyHexWithoutBuilding: {
            actionPointsCost:
              attack_enemy_hex_without_building?.action_points_cost,
            influencePointsReward:
              attack_enemy_hex_without_building?.influence_points_reward,
          },
          actionPointMax: resData.user?.action_points_max || 0,
          actionPointMaxPerTurn:
            resData.settings?.max_action_points_per_turn || 0,
        })
      );

      const mapId = resData.active_maps?.[0]?.map_id || null;
      dispatch(
        initMap({
          nextAttackTs: resData.user?.next_attack_ts || 0,
          mapId,
          hexesCaptured: mapId ? resData.hexes_captured?.[mapId] || 0 : 0,
          mapRewardsInfo: resData.map_rewards_info || {},
          sessionFinishDate: resData.active_maps?.[0]?.finished_at,
        })
      );
      dispatch(
        initMail({
          mails: resData.user?.mail || [],
        })
      );
    }

    // tasks
    dispatch(
      getRewardTaddy(resData?.game_settings_new?.reward_taddy?.exchange || 0)
    );

    return resData;
  };

export const authorizeUser =
  (initData: string, avatar?: string, username?: string, mode?: AppGameMode) =>
  async (dispatch: AppDispatch) => {
    // for test in dev mode
    if (process.env.NODE_ENV === "development") {
      const testToken = process.env.REACT_APP_TEST_TOKEN;
      if (!testToken) return;
      setLSItem(ELSProps.token, process.env.REACT_APP_TEST_TOKEN);
    }
    // /////
    const locStoreToken = await getLSItem(ELSProps.token);

    if (!locStoreToken) {
      await dispatch(authUser(initData));
    }

    try {
      const res = await dispatch(getAccountDetails(avatar, username, mode));

      return res.mode;
    } catch (error: any) {
      if (error?.status === 401) {
        // in case invalid token
        await dispatch(authUser(initData));
      }

      if (
        error?.message?.error &&
        error.message.error?.startsWith("Нет запомненного выбора")
      ) {
        return "";
      }
    }
  };

const withdrawCPUrl = "/ton_cyber_farm/withdraw_cp/";
export const withdrawCP = createAsyncThunk<
  WithdrawCPResponse,
  { amount: number; address: string; currency: "usdt" | "ton"; memo?: string }
>("profile/withdrawCP", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<WithdrawCPResponse>(
      withdrawCPUrl,
      "POST",
      {
        amount: payload.amount,
        address: payload.address,
        currency: payload.currency,
        memo: payload.memo,
      }
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});
const getWithdrawRatesUrl = "/ton_cyber_farm/withdraw_rates/";
export const getWithdrawRates = createAsyncThunk<
  GetWithdrawRatesResponse,
  undefined
>("profile/getWithdrawRates", async (_, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<GetWithdrawRatesResponse>(
      getWithdrawRatesUrl
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.id = payload.id;
      state.tgId = payload.tgId;
      state.avatar = payload.avatar;
      state.username = payload.username || state.username;
    },
    updateStats(state, { payload }) {
      state.stats = { ...state.stats, ...payload };
    },
    receiveAccountDetails(state, { payload }) {
      state.accountDetailsReceived = true;
      state.tonWithdrawCommission = payload.tonWithdrawCommission;
      state.usdtWithdrawCommission = payload.usdtWithdrawCommission;
      state.usdtWithdrawPoolAmount = payload.usdtWithdrawPoolAmount;
      state.tonWithdrawPoolAmount = payload.tonWithdrawPoolAmount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.user.username;
      state.tgId = payload.user.id_tgrm;
    });
    builder.addCase(withdrawCP.fulfilled, (state, { payload }) => {
      state.stats.cp = state.stats.cp - payload.amount_cp;
    });

    // referals
    builder.addCase(convertReferals.fulfilled, (state, action) => {
      state.stats.cp = action.payload.cash_point;
    });

    // cyberfarm

    builder.addCase(buyResourceDeflict.fulfilled, (state, { payload }) => {
      state.stats.cp = payload.cash_point_left;
    });
    builder.addCase(buySlot.fulfilled, (state, { payload }) => {
      if (payload.cost?.cash_point) {
        state.stats.cp = state.stats.cp - payload.cost?.cash_point;
      }
    });

    builder.addCase(claimDailyReward.fulfilled, (state, { payload }) => {
      state.stats.cp = payload.cash_point;
    });
    builder.addCase(speedUp.fulfilled, (state, { payload }) => {
      state.stats.cp = payload.cash_point_left;
    });
    builder.addCase(exchange.fulfilled, (state, { payload }) => {
      if (payload.cash_point_left) {
        state.stats.cp = payload.cash_point_left;
      }
    });

    builder.addCase(finsihTutorial.fulfilled, (state, { payload }) => {
      if (payload.cash_point) {
        state.stats.cp = payload.cash_point;
      }
    });

    // tasks
    builder.addCase(claimAdReward.fulfilled, (state, { payload }) => {
      const slotsWithoutReward = [
        EAdSlots.MiniGamesSessionSlot,
        // EAdSlots.CollectFarmProductionSlot,
      ];
      if (
        +payload.reward &&
        payload.status === "ok" &&
        !payload.bonus_distribution &&
        payload.game_action !== "farm_collect_ready" &&
        !slotsWithoutReward.includes(payload.slot_id as EAdSlots)
      ) {
        state.stats.cp += +payload.reward;
      }
    });
    builder.addCase(getPromoTaskReward.fulfilled, (state, { payload }) => {
      if (+payload.reward && payload.status === "ok") {
        state.stats.cp += +payload.reward;
      }
    });

    builder.addCase(verifyGigaHash.fulfilled, (state, { payload }) => {
      if (payload.success && payload.confirmationHash) {
        state.stats.cp += +payload.amount;
      }
    });

    // influence
    builder.addCase(restoreAP.fulfilled, (state, { payload }) => {
      if (payload.cash_point_left) state.stats.cp = payload.cash_point_left;
    });
    builder.addCase(receiveMailReward.fulfilled, (state, { payload }) => {
      if (payload.reward_given?.cp) state.stats.cp += payload.reward_given.cp;
    });
  },
});

export const { setUser, updateStats, receiveAccountDetails } =
  profileSlice.actions;

export default profileSlice.reducer;
