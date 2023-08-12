import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProvince } from "../interfaces/IProvince";
import { IAppSlice } from "../interfaces/IAppSlice";
import { ICoordinates } from "../interfaces/ICoordinates";
import { IService } from "../interfaces/IService";
import { IOperator } from "../interfaces/IOperator";
import { IMetadata } from "../interfaces/IMetadata";
import { TGeneration } from "../types/TGeneration";


const initialState: IAppSlice = {
  userLocationCoordinates: { lng: 51.4468, lat: 35.7395 },
  service: null,
  mapZoom: 15,
  operator: null,
  metadata: null,
  generation: undefined,
  province: undefined
};

const appSlice = createSlice({
  name: "app_slice",
  initialState,
  reducers: {
    userLocationCoordinatesChanged: (state, action: PayloadAction<ICoordinates>) => {
      return { ...state, userLocationCoordinates: action.payload };
    },
    userServiceChanged: (state, action: PayloadAction<IService>) => {
      return { ...state, service: { ...action.payload } };
    },
    userOperatorChanged: (state, action: PayloadAction<IOperator>) => {
      return { ...state, operator: { ...action.payload } };
    },
    mapZoomChanged: (state, action: PayloadAction<number>) => {
      return { ...state, mapZoom: action.payload };
    },
    metadataChanged: (state, action: PayloadAction<IMetadata>) => {
      return { ...state, metadata: action.payload };
    },
    generationChanged: (state, action: PayloadAction<TGeneration | undefined>) => {
      state.generation = action.payload;
    },
    provinceChanged: (state, action: PayloadAction<IProvince>) => {
      state.province = action.payload;
    }
  }
});

export const {
  userLocationCoordinatesChanged,
  userServiceChanged,
  mapZoomChanged,
  userOperatorChanged,
  metadataChanged,
  generationChanged,
  provinceChanged
} = appSlice.actions;
export const reducers = appSlice.reducer;