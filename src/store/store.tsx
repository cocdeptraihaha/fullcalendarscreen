import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice";
import formReducer from "./formSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
