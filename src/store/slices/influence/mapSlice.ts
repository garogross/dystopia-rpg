import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IHex } from "../../../models/Influence/IHex";
import {
  AttackHexResponse,
  GetMapResponse,
} from "../../../models/api/Influence/Map";
import { fetchRequest } from "../../tools/fetchTools";
import { RootState } from "../../store";

export interface MapState {
  mapId: number | null;
  radius: number;
  hexes: IHex[];
}

const initialState: MapState = {
  mapId: null,
  radius: 0,
  hexes: [],
};

const getMapUrl = "/influence/map/";
export const getMap = createAsyncThunk<GetMapResponse, { id: string }>(
  "activity/getMap",
  async (payload, { rejectWithValue }) => {
    try {
      const resData = await fetchRequest<GetMapResponse>(
        `${getMapUrl}?map_id=${payload.id}`
      );

      return resData;
    } catch (error: any) {
      console.error("error", error);
      return rejectWithValue(error);
    }
  }
);
const attackHexUrl = "/influence/attack_hex/";
export const attackHex = createAsyncThunk<
  AttackHexResponse & {
    x: number;
    y: number;
    z: number;
    tgId: string | number;
  },
  {
    mapId: number;
    x: number;
    y: number;
    z: number;
  }
>("activity/attackHex", async (payload, { rejectWithValue, getState }) => {
  try {
    const resData = await fetchRequest<AttackHexResponse>(
      attackHexUrl,
      "POST",
      {
        map_id: payload.mapId,
        x: payload.x,
        y: payload.y,
        z: payload.z,
      }
    );
    const tgId = (getState() as RootState).profile.tgId;
    return { ...resData, x: payload.x, y: payload.y, z: payload.z, tgId };
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

export const mapSlice = createSlice({
  name: "mapSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMap.fulfilled, (state, action) => {
      state.radius = action.payload.radius;
      state.hexes = action.payload.hexes;
      state.mapId = action.payload.map_id;
    });
    builder.addCase(attackHex.fulfilled, (state, { payload }) => {
      if (payload.captured) {
        const updatedHexIndex = state.hexes.findIndex(
          (hex) =>
            hex.x === payload.x && hex.y === payload.y && hex.z === payload.z
        );
        if (updatedHexIndex !== -1) {
          state.hexes = state.hexes.with(updatedHexIndex, {
            ...state.hexes[updatedHexIndex],
            owner_id: +payload.tgId,
          });
        }
      }
    });
  },
});

// export const {  } = mapSlice.actions;

export default mapSlice.reducer;
