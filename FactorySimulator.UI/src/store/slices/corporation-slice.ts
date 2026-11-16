import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CorporationData, Enterprise } from "../types.ts";
import api from "../../utils/api.ts";
import type { AxiosResponse } from "axios";

export const fetchCorporationData = createAsyncThunk(
  "corporation/fetchCorporationData",
  async () => {
    const response: AxiosResponse<CorporationData> = await api.get(
      "http://localhost:5188/api/corporation",
    );

    console.log(response.data);

    return response.data;
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
      (state, action: PayloadAction<CorporationData>) => {
        state.status = "succeeded";
        state.balance = action.payload.balance;
        state.enterprises = action.payload.enterprises;
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
