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
import { buyProduct, getCyberFarmResources } from "./cyberFarm/resourcesSlice";
import { claimDailyReward, initDailyReward } from "./cyberFarm/activitySlice";
import { exchange, initSocialShop } from "./cyberFarm/socialShopSlice";
// import {AppDispatch, RootState} from "../store";

// endpoints

export interface ProfileState {
  id: string;
  tgId: string | number;
  token: string;
  username: string;
  stats: {
    [key in EStats]: number;
  };
  accountDetailsReceived: boolean;
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
  stats: {
    [EStats.kredit]: 0,
    [EStats.darkMatter]: 0,
    [EStats.token]: 0,
    [EStats.lp]: 0,
    [EStats.cp]: 0,
    [EStats.ton]: 0,
  },
  accountDetailsReceived: false,
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
  (mode?: AppGameMode) => async (dispatch: AppDispatch) => {
    const resData = await fetchRequest<GetAccountDetailsResponse>(
      `${getAccountDetailsUrl}${mode ? `?mode=${mode}` : ""}`
    );

    dispatch(receiveAccountDetails());
    dispatch(
      updateStats({
        [EStats.cp]: resData.user?.profile.cash_point || 0,
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
            resourceDeficit: resData.resource_deficit,
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
    }

    return resData;
  };

export const authorizeUser =
  (initData: string, mode?: AppGameMode) => async (dispatch: AppDispatch) => {
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
      const res = await dispatch(getAccountDetails(mode));

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

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.id = payload.id;
      state.tgId = payload.tgId;
    },
    updateStats(state, { payload }) {
      state.stats = { ...state.stats, ...payload };
    },
    receiveAccountDetails(state) {
      state.accountDetailsReceived = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.user.username;
      state.tgId = payload.user.id_tgrm;
    });

    // cyberfarm
    builder.addCase(buyProduct.fulfilled, (state, { payload }) => {
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
  },
});

export const { setUser, updateStats, receiveAccountDetails } =
  profileSlice.actions;

export default profileSlice.reducer;
