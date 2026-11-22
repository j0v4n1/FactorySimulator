import { configureStore } from "@reduxjs/toolkit";
import constructionsSlice from "./slices/constructions-slice.ts";
import equipmentsSlice from "./slices/equipments-slice.ts";
import corporationSlice from "./slices/corporation-slice.ts";
import gameSlice from "./slices/game-slice.ts";
import uiSlice from "./slices/ui-slice.ts";

export const store = configureStore({
  reducer: {
    uiSlice,
    constructionsSlice,
    equipmentsSlice,
    corporationSlice,
    gameSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
