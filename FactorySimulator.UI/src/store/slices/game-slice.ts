import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { GameData, Recipe } from "../types.ts";
import api from "../../utils/api.ts";
import type { AxiosResponse } from "axios";

export const fetchGameData = createAsyncThunk(
  "game/fetchGameData",
  async () => {
    const response: AxiosResponse<GameData> = await api.get(
      "http://localhost:5188/api/game",
    );

    console.log(response.data);

    return response.data;
  },
);

type GameStatus = "idle" | "loading" | "succeeded" | "failed";

type GameState = {
  recipes: Recipe[];
  status: GameStatus;
};

const initialState: GameState = {
  recipes: [],
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
      },
    );

    builder.addCase(fetchGameData.rejected, (state) => {
      state.status = "failed";
    });
  },

  reducers: {},
});
export default gameSlice.reducer;
