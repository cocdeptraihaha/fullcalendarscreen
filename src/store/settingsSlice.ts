import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingsState = {
  open: boolean;
  visibleContacts: string[]; // Array of contact IDs to show on calendar
  isLoaded: boolean;
};

const initialState: SettingsState = {
  open: false,
  visibleContacts: [], // Empty means show all
  isLoaded: false,
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
        state.visibleContacts = state.visibleContacts.filter(
          (id) => id !== contactId
        );
      } else {
        state.visibleContacts.push(contactId);
      }
    },
    loadSettings: (
      state,
      action: PayloadAction<{ visibleContacts: any[] }>
    ) => {
      state.visibleContacts = action.payload.visibleContacts;
      state.isLoaded = true;
    },
  },
});

export const {
  openSettings,
  closeSettings,
  setVisibleContacts,
  toggleContactVisibility,
  loadSettings,
} = settingsSlice.actions;
export default settingsSlice.reducer;
