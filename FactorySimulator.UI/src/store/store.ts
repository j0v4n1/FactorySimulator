import { configureStore } from "@reduxjs/toolkit";
import constructionsSlice from "./slices/constructions-slice.ts";
import equipmentsSlice from "./slices/equipments-slice.ts";
import corporationSlice from "./slices/corporation-slice.ts";

export const store = configureStore({
  reducer: { constructionsSlice, equipmentsSlice, corporationSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
