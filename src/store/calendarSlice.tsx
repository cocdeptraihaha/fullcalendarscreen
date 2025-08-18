import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
  view: string;
}

const initialState: CalendarState = {
  view: "dayGridMonth", // mặc định
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
  },
});

export const { setView } = calendarSlice.actions;
export default calendarSlice.reducer;