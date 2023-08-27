import { IService } from "./IService";
import { IOperator } from "./IOperator";
import { IMetadata } from "./IMetadata";
import { TGeneration } from "../types/TGeneration";
import { IProvince } from "./IProvince";
import { TTab } from "../types/TTab";

export interface IAppSlice {
  service: null | IService,
  operator: null | IOperator,
  metadata: null | IMetadata,
  generation: undefined | TGeneration,
  province?: IProvince,
  currentTab: TTab,
  editMode: boolean
}
