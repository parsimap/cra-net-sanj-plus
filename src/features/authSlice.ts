import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthSlice } from "../interfaces/IAuthSlice";


const initialState: IAuthSlice = {
  token: "",
  fttxToken: ""
};

const appSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    tokenChanged(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    fttxTokenChanged(state, action: PayloadAction<string>) {
      state.fttxToken = action.payload;
    }
  }
});

export const { tokenChanged, fttxTokenChanged } = appSlice.actions;
export default appSlice.reducer;
