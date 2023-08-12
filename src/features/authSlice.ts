import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IState = {
  token: string;
};

const initialState: IState = {
  token: "",
};

const appSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    tokenChanged(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { tokenChanged } = appSlice.actions;
export default appSlice.reducer;
