import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingsState = {
  open: boolean;
  visibleContacts: string[]; // Array of contact IDs to show on calendar
};

const initialState: SettingsState = {
  open: false,
  visibleContacts: [], // Empty means show all
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    openSettings: (state) => {
      state.open = true;
    },
    closeSettings: (state) => {
      state.open = false;
    },
    setVisibleContacts: (state, action: PayloadAction<string[]>) => {
      state.visibleContacts = action.payload;
    },
    toggleContactVisibility: (state, action: PayloadAction<string>) => {
      const contactId = action.payload;
      if (state.visibleContacts.includes(contactId)) {
        state.visibleContacts = state.visibleContacts.filter(id => id !== contactId);
      } else {
        state.visibleContacts.push(contactId);
      }
    },
  },
});

export const { openSettings, closeSettings, setVisibleContacts, toggleContactVisibility } = settingsSlice.actions;
export default settingsSlice.reducer;