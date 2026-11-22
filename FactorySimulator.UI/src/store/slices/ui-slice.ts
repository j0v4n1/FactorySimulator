import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ModalState } from "../types.ts";

type UiState = {
  modal: ModalState;
};

const initialState: UiState = {
  modal: {
    isLoading: false,
    show: false,
    size: "sm",
    title: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<Omit<ModalState, "show" | "isLoading">>,
    ) => {
      state.modal = {
        ...action.payload,
        show: true,
        isLoading: false,
      };
    },
    closeModal: (state) => {
      state.modal.show = false;
    },
    changeStatusIsLoading: (state, action: PayloadAction<boolean>) => {
      state.modal.isLoading = action.payload;
    },
  },
});
export const { openModal, closeModal, changeStatusIsLoading } = uiSlice.actions;
export default uiSlice.reducer;
