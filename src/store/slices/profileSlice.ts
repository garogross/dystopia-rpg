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
  buyProduct,
  buyResourceDeflict,
  getCyberFarmResources,
  sellProduct,
} from "./cyberFarm/resourcesSlice";
import { claimDailyReward, initDailyReward } from "./cyberFarm/activitySlice";
import { exchange, initSocialShop } from "./cyberFarm/socialShopSlice";
import {
  claimAdsgramReward,
  claimBarzhaReward,
  claimOnclickaReward,
  claimTaddyReward,
  claimTadsReward,
  claimTraffyReward,
  claimVideoReward,
  claimWallgramReward,
  getPromoTaskReward,
  getRewardTaddy,
  verifyGigaHash,
} from "./tasksSlice";
import { initAchievments } from "./cyberFarm/achievmentsSlice";
import { WithdrawTonResponse } from "../../models/api/WithdrawTonResponse";
import { convertReferals } from "./refferencesSlice";
import { finsihTutorial, initTutorial } from "./cyberFarm/tutorialSlice";
import { initInfluence, restoreAP } from "./influence/influenceSlice";
import { initSettings } from "./influence/settingsSlice";
import { initMap } from "./influence/mapSlice";
import { initMail } from "./influence/mailSlice";
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

    dispatch(
      setUser({
        id: resData.user?.id_tgrm,
        tgId: resData.user?.id_tgrm,
        avatar,
        username,
      })
    );

    dispatch(
      receiveAccountDetails({
        tonWithdrawCommission:
          resData.game_settings?.ton_withdraw_commission || 0,
      })
    );
    dispatch(
      updateStats({
        [EStats.cp]: resData.user?.profile?.cash_point || 0,
        [EStats.ton]: resData.ton_cyber_farm?.ton || 0,
      })
    );
    if (resData.ton_cyber_farm) {
      // update dailyReward
      const { day_number, reward_available, rewards_by_day } =
        resData.claim_daily_login;
      dispatch(
        initDailyReward({
          dailyRewardAvailable: reward_available,
          dailyRewardAvailableDay: day_number,
          rewardsByDay: Object.values(rewards_by_day),
          lastClaimedDate:
            resData.ton_cyber_farm.timers?.daily_login_claimed || null,
        })
      );
      // store slots

      const speedCosts = Object.entries(
        resData.game_settings?.production_settings || {}
      ).reduce(
        (acc, [type, settings]) => ({
          ...acc,
          [type]: settings.speedup_bonus,
        }),
        {}
      );

      dispatch(
        getCyberFarmSlots({
          slots: resData.ton_cyber_farm.slots,
          slotCosts: resData.game_settings?.slot_costs,
          speedUpCosts: speedCosts,
        })
      );

      // store resources
      if (resData.game_settings) {
        dispatch(
          getCyberFarmResources({
            resources: resData.ton_cyber_farm.resources,
            productCosts: resData.game_settings.base_costs,
            productionChains: resData.game_settings.production_chains,
            resourceTonmailValue: resData.ton_cyber_farm.resource_ton_value,
            resourceDeficit: resData?.resource_deficit,
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
      const tutorialActoion = resData.metrics.ton_cyber_farm_metrics.tutorial;
      const dataset = resData.user?.profile?.dataset;
      dispatch(
        initTutorial({
          tutorialInProgress:
            dataset && "tutorial_finished_rewarded" in dataset
              ? !dataset.tutorial_finished_rewarded
              : true,
          tutorialProgressAction: tutorialActoion?.length
            ? tutorialActoion[tutorialActoion.length - 1]
            : null,
        })
      );
    }

    if (mode === "influence") {
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

      if (res.ton_cyber_farm) {
        dispatch(initCyberFarm());
      }

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

const withdrawTonUrl = "/withdraw_ton/";
export const withdrawTon = createAsyncThunk<
  WithdrawTonResponse,
  { amount: number; address: string }
>("profile/withdrawTon", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<WithdrawTonResponse>(
      withdrawTonUrl,
      "POST",
      {
        amount: payload.amount,
        address: payload.address,
      }
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
      state.username = payload.username;
    },
    updateStats(state, { payload }) {
      state.stats = { ...state.stats, ...payload };
    },
    receiveAccountDetails(state, { payload }) {
      state.accountDetailsReceived = true;
      state.tonWithdrawCommission = payload.tonWithdrawCommission;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.user.username;
      state.tgId = payload.user.id_tgrm;
    });
    builder.addCase(withdrawTon.fulfilled, (state, { payload }) => {
      state.stats.ton = state.stats.ton - payload.amount;
    });

    // referals
    builder.addCase(convertReferals.fulfilled, (state, action) => {
      state.stats.cp = action.payload.cash_point;
    });

    // cyberfarm
    builder.addCase(buyProduct.fulfilled, (state, { payload }) => {
      state.stats.cp = payload.cash_point_left;
    });
    builder.addCase(sellProduct.fulfilled, (state, { payload }) => {
      state.stats.ton = payload.ton_total;
    });
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
      if (payload.reward.cash_point) {
        state.stats.cp += payload.reward.cash_point;
      }
    });

    builder.addCase(finsihTutorial.fulfilled, (state, { payload }) => {
      if (payload.cash_point) {
        state.stats.cp = payload.cash_point;
      }
    });

    // tasks
    builder.addCase(getPromoTaskReward.fulfilled, (state, { payload }) => {
      if (+payload.reward && payload.status === "ok") {
        state.stats.cp += +payload.reward;
      }
    });
    builder.addCase(claimBarzhaReward.fulfilled, (state, { payload }) => {
      if (+payload.reward) {
        state.stats.cp += +payload.reward;
      }
    });
    builder.addCase(claimTraffyReward.fulfilled, (state, { payload }) => {
      if (+payload.reward) {
        state.stats.cp += +payload.reward;
      }
    });
    builder.addCase(claimWallgramReward.fulfilled, (state, { payload }) => {
      if (+payload.reward) {
        state.stats.cp += +payload.reward;
      }
    });
    builder.addCase(claimTaddyReward.fulfilled, (state, { payload }) => {
      if (+payload.reward) {
        state.stats.cp += +payload.reward;
      }
    });
    builder.addCase(claimAdsgramReward.fulfilled, (state, { payload }) => {
      if (+payload.reward) {
        state.stats.cp += +payload.reward;
      }
    });
    builder.addCase(claimOnclickaReward.fulfilled, (state, { payload }) => {
      if (+payload.reward) {
        state.stats.cp += +payload.reward;
      }
    });
    builder.addCase(claimTadsReward.fulfilled, (state, { payload }) => {
      if (+payload.reward) {
        state.stats.cp += +payload.reward;
      }
    });
    builder.addCase(claimVideoReward.fulfilled, (state, { payload }) => {
      if (+payload.reward) {
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
  },
});

export const { setUser, updateStats, receiveAccountDetails } =
  profileSlice.actions;

export default profileSlice.reducer;
