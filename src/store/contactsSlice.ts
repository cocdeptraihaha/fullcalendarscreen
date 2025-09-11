import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactsState {
  view: string;
  open: boolean;
  contactData:any | null;
}

const initialState: ContactsState = {
  view: "contacts", 
  open: false,
  contactData:null
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
    openForm: (state, action: PayloadAction<any | null>) => {
      state.open = true;
      state.contactData = action.payload; 
    },
    closeForm: (state) => {
      state.open = false;
  },
 },
});
export const { setView } = contactsSlice.actions;
export default contactsSlice.reducer;
