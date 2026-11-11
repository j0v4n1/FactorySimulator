import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

type Equipment = {
  id: string;
  code: string;
  name: string;
  description: string;
  powerConsumption: number;
  unitCost: number;
  productionPerSecond: number;
  reducedProductionPerSecond: number;
};

export const fetchEquipments = createAsyncThunk<Equipment[]>(
  "equipments/fetchEquipments",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch("http://localhost:5188/api/equipments");

    const equipments = await response.json();

    return equipments;
  },
);

type EquipmentsStatus = "idle" | "loading" | "succeeded" | "failed";

type EquipmentsState = {
  equipments: Equipment[];
  status: EquipmentsStatus;
};

const initialState: EquipmentsState = {
  equipments: [],
  status: "idle",
};

const equipmentSlice = createSlice({
  name: "equipments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchEquipments.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(
      fetchEquipments.fulfilled,
      (state, action: PayloadAction<Equipment[]>) => {
        state.status = "succeeded";
        state.equipments = action.payload;
      },
    );

    builder.addCase(fetchEquipments.rejected, (state) => {
      state.status = "failed";
    });
  },

  reducers: {},
});

export default equipmentSlice.reducer;
