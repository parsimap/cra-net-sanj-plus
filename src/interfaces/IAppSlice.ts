import { ICoordinates } from "./ICoordinates";
import { IService } from "./IService";
import { IOperator } from "./IOperator";
import { IMetadata } from "./IMetadata";
import { TGeneration } from "../types/TGeneration";
import { IProvince } from "./IProvince";

export interface IAppSlice {
  userLocationCoordinates: ICoordinates,
  service: null | IService,
  operator: null | IOperator,
  mapZoom: number,
  metadata: null | IMetadata,
  generation: undefined | TGeneration,
  province?: IProvince
}
