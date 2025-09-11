import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
  section: string;
}

const initialState: HeaderState = {
  section: "Calendar", // default section view
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<string>) => {
      state.section = action.payload;
    },
  },
});

export const { setSection } = headerSlice.actions;
export default headerSlice.reducer;
