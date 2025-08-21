import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormState = {
  open: boolean;
  eventData: any | null; // store selected event data
};

const initialState: FormState = {
  open: false,
  eventData: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    openForm: (state, action: PayloadAction<any | null>) => {
      state.open = true;
      state.eventData = action.payload; // Pass event data for editing, or null for new appointment
    },
    closeForm: (state) => {
      state.open = false;
      state.eventData = null; // Clear event data when closing
    },
  },
});

export const { openForm, closeForm } = formSlice.actions;
export default formSlice.reducer;
