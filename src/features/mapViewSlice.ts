import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureCollection } from "geojson";


interface IState {
  complaintGeoJson: FeatureCollection;
}


const initialState: IState = {
  complaintGeoJson: {
    type: "FeatureCollection",
    features: []
  }
};

const mapViewSlice = createSlice({
  name: "map-view",
  initialState,
  reducers: {
    complaintGeoJsonChanged(state, action: PayloadAction<FeatureCollection>) {
      state.complaintGeoJson = action.payload;
    }
  }
});

export const {
  complaintGeoJsonChanged
} = mapViewSlice.actions;
export default mapViewSlice.reducer;