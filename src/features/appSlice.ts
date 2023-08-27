import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProvince } from "../interfaces/IProvince";
import { IAppSlice } from "../interfaces/IAppSlice";
import { IService } from "../interfaces/IService";
import { IOperator } from "../interfaces/IOperator";
import { IMetadata } from "../interfaces/IMetadata";
import { TGeneration } from "../types/TGeneration";
import { TTab } from "../types/TTab";


const initialState: IAppSlice = {
  service: null,
  operator: null,
  metadata: null,
  generation: undefined,
  province: undefined,
  currentTab: "Quality",
  editMode: false
};

const appSlice = createSlice({
  name: "app_slice",
  initialState,
  reducers: {
    userServiceChanged: (state, action: PayloadAction<IService>) => {
      return { ...state, service: { ...action.payload } };
    },
    userOperatorChanged: (state, action: PayloadAction<IOperator>) => {
      return { ...state, operator: { ...action.payload } };
    },
    metadataChanged: (state, action: PayloadAction<IMetadata>) => {
      return { ...state, metadata: action.payload };
    },
    generationChanged: (state, action: PayloadAction<TGeneration | undefined>) => {
      state.generation = action.payload;
    },
    provinceChanged: (state, action: PayloadAction<IProvince>) => {
      state.province = action.payload;
    },
    currentTabChanged: (state, action: PayloadAction<TTab>) => {
      state.currentTab = action.payload;
    },
    editModeChanged: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    }
  }
});

export const {
  userServiceChanged,
  userOperatorChanged,
  metadataChanged,
  generationChanged,
  provinceChanged,
  currentTabChanged,
  editModeChanged
} = appSlice.actions;
export default appSlice.reducer;