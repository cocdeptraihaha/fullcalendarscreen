import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice";
import formReducer from "./formSlice";
import settingsReducer from "./settingsSlice";
import headerReducer from "./headerSlice"
import contactsReducer from "./contactsSlice"

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    form: formReducer,
    settings: settingsReducer,
    header: headerReducer,
    contacts:contactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
