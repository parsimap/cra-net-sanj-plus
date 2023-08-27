import { IProvince } from "./IProvince";
import { IOperator } from "./IOperator";

export interface IUseComplaintsGeoJsonProp {
  province?: IProvince,
  operator?: IOperator | null
}