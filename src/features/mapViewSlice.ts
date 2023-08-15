import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureCollection } from "geojson";
import { IMapViewSlice } from "../interfaces/IMapViewSlice";
import { ICoordinates } from "../interfaces/ICoordinates";



const initialState: IMapViewSlice = {
  complaintGeoJson: {
    type: "FeatureCollection",
    features: []
  },
  userLocationCoordinates: { lng: 51.4468, lat: 35.7395 },
  mapZoom: 15
};

const mapViewSlice = createSlice({
  name: "map-view",
  initialState,
  reducers: {
    complaintGeoJsonChanged(state, action: PayloadAction<FeatureCollection>) {
      state.complaintGeoJson = action.payload;
    },
    userLocationCoordinatesChanged: (state, action: PayloadAction<ICoordinates>) => {
      state.userLocationCoordinates = action.payload;
    },
    mapZoomChanged: (state, action: PayloadAction<number>) => {
      return { ...state, mapZoom: action.payload };
    }
  }
});

export const {
  complaintGeoJsonChanged,
  userLocationCoordinatesChanged,
  mapZoomChanged
} = mapViewSlice.actions;
export default mapViewSlice.reducer;