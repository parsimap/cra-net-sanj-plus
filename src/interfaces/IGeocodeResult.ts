import IGeocodePlace from "./IGeocodePlace";

export default interface IGeocodeResult {
  status_code: number;
  result: IGeocodePlace[];
}
