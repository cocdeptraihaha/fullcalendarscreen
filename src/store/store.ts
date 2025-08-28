import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice";
import formReducer from "./formSlice";
import settingsReducer from "./settingsSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    form: formReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
