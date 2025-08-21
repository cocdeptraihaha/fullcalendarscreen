import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
  view: string;
}

const initialState: CalendarState = {
  view: "dayGridMonth", // default calendar view
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<string>) => {
      // Update the current FullCalendar view (e.g., dayGridMonth, timeGridWeek)
      state.view = action.payload;
    },
  },
});

export const { setView } = calendarSlice.actions;
export default calendarSlice.reducer;
