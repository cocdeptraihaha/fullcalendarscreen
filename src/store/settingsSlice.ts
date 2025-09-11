import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingsState = {
  open: boolean;
  visibleStaff: string[]; // Array of staff IDs to show on calendar
  isLoaded: boolean;
};

const initialState: SettingsState = {
  open: false,
  visibleStaff: [], // Empty means show all
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
    setVisibleStaff: (state, action: PayloadAction<string[]>) => {
      state.visibleStaff = action.payload;
    },
    toggleStaffVisibility: (state, action: PayloadAction<string>) => {
      const staffId = action.payload;
      if (state.visibleStaff.includes(staffId)) {
        state.visibleStaff = state.visibleStaff.filter((id) => id !== staffId);
      } else {
        state.visibleStaff.push(staffId);
      }
    },
    loadSettings: (
      state,
      action: PayloadAction<{ visibleStaffs?: any[]; visibleContacts?: any[] }>
    ) => {
      // Accept both API shapes for backward compatibility
      const serverVisible =
        (action.payload.visibleStaffs as string[] | undefined) ??
        (action.payload.visibleContacts as string[] | undefined) ??
        [];
      state.visibleStaff = serverVisible;
      state.isLoaded = true;
    },
  },
});

export const {
  openSettings,
  closeSettings,
  setVisibleStaff,
  toggleStaffVisibility,
  loadSettings,
} = settingsSlice.actions;
export default settingsSlice.reducer;
