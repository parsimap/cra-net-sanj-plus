import { FeatureCollection } from "geojson";
import { ICoordinates } from "./ICoordinates";

export interface IMapViewSlice {
  complaintGeoJson: FeatureCollection;
  userLocationCoordinates: ICoordinates,
  mapZoom: number
}