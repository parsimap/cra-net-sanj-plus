import { IService } from "./IService";
import { IOperator } from "./IOperator";

export interface IMetadata {
  services: IService[],
  operators: IOperator[]
}