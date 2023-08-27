import { NavigateFunction } from "react-router-dom";


import { IService } from "./IService";
import { IOperator } from "./IOperator";
import { ITabInfo } from "./ITabInfo";
import { TSetState } from "../types/TSetState";

export interface IDrawerProps {
  service: IService | null;
  operator: IOperator | null;
  tabs: ITabInfo[];
  areaInfo: any; // TODO: set areainfo type in createApi slice
  navigate: NavigateFunction;
}