import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactsState {
  view: string;
}

const initialState: ContactsState = {
  view: "contacts", 
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<string>) => {

      state.view = action.payload;
    },
  },
});
export const { setView } = contactsSlice.actions;
export default contactsSlice.reducer;
