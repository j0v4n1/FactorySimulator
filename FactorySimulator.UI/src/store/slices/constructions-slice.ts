import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios, { type AxiosResponse } from "axios";

type Construction = {
  id: string;
  code: string;
  name: string;
  description: string;
  constructionCost: number;
  imageKey: string;
  allowedEquipment: {
    equipmentCode: string;
    minCount: number;
    maxCount: number;
  };
  minEmployees: number;
  maxEmployees: number;
};

export const fetchConstructions = createAsyncThunk<Construction[]>(
  "constructions/fetchConstructions",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const response: AxiosResponse<Construction[]> = await axios.get(
      "http://localhost:5188/api/constructions",
    );
    return response.data;
  },
);

type ConstructionsStatus = "idle" | "loading" | "succeeded" | "failed";

type ConstructionsState = {
  constructions: Construction[];
  status: ConstructionsStatus;
};

const initialState: ConstructionsState = {
  constructions: [],
  status: "idle",
};

const constructionSlice = createSlice({
  name: "constructions",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchConstructions.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(
      fetchConstructions.fulfilled,
      (state, action: PayloadAction<Construction[]>) => {
        state.status = "succeeded";
        state.constructions = action.payload;
      },
    );

    builder.addCase(fetchConstructions.rejected, (state) => {
      state.status = "failed";
    });
  },

  reducers: {},
});

export default constructionSlice.reducer;
