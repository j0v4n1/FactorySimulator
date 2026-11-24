import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Deposit, GameData, Recipe, WarehouseType } from "../types.ts";
import api from "../../utils/api.ts";
import type { AxiosResponse } from "axios";

export const fetchGameData = createAsyncThunk(
  "game/fetchGameData",
  async () => {
    const response: AxiosResponse<GameData> = await api.get(
      "http://localhost:5188/api/game",
    );
    return response.data;
  },
);

type GameStatus = "idle" | "loading" | "succeeded" | "failed";

type GameState = {
  recipes: Recipe[];
  warehouses: WarehouseType[];
  deposits: Deposit[];
  status: GameStatus;
};

const initialState: GameState = {
  recipes: [],
  warehouses: [],
  deposits: [],
  status: "idle",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGameData.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(
      fetchGameData.fulfilled,
      (state, action: PayloadAction<GameData>) => {
        state.status = "succeeded";
        state.recipes = action.payload.recipes;
        state.warehouses = action.payload.warehouses;
        state.deposits = action.payload.deposits;
      },
    );

    builder.addCase(fetchGameData.rejected, (state) => {
      state.status = "failed";
    });
  },

  reducers: {
    rentDepositAction: (
      state,
      action: PayloadAction<{ id: string; isLeased: boolean }>,
    ) => {
      let index = 0;
      state.deposits.forEach((el, indexEl) => {
        if (el.id === action.payload.id) {
          index = indexEl;
          return;
        }
      });
      state.deposits[index].isLeased = action.payload.isLeased;
    },
    addDepositEnterpriseId: (
      state,
      action: PayloadAction<{ depositId: string; enterpriseId: string }>,
    ) => {
      const deposit = state.deposits.find(
        (d) => d.id === action.payload.depositId,
      );
      if (deposit) {
        deposit.enterpriseId = action.payload.enterpriseId;
      }
    },
  },
});
export const { rentDepositAction, addDepositEnterpriseId } = gameSlice.actions;
export default gameSlice.reducer;
