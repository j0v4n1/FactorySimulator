import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Enterprise } from "../types.ts";

export const fetchCorporationData = createAsyncThunk<number>(
  "corporation/fetchCorporationData",
  async () => {
    const response = await fetch("http://localhost:5188/api/corporation");

    return await response.json();
  },
);

type CorporationStatus = "idle" | "loading" | "succeeded" | "failed";

type CorporationState = {
  balance: number;
  enterprises: Enterprise[];
  status: CorporationStatus;
};

const initialState: CorporationState = {
  balance: 0,
  enterprises: [],
  status: "idle",
};

const corporationSlice = createSlice({
  name: "corporation",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCorporationData.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(
      fetchCorporationData.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.status = "succeeded";
        state.balance = action.payload;
      },
    );

    builder.addCase(fetchCorporationData.rejected, (state) => {
      state.status = "failed";
    });
  },

  reducers: {
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    addEnterprise: (state, action: PayloadAction<Enterprise>) => {
      state.enterprises.push(action.payload);
    },
  },
});
export const { updateBalance, addEnterprise } = corporationSlice.actions;
export default corporationSlice.reducer;
