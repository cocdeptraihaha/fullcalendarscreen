import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice";
import formReducer from "./formSlice";
import settingsReducer from "./settingsSlice";
import headerReducer from "./headerSlice"

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    form: formReducer,
    settings: settingsReducer,
    header: headerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
