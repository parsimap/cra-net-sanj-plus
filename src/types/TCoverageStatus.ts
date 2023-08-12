import { TCoverageStatusKeys } from "./TCoverageStatusKeys";
import { ICoverageStatusValues } from "../interfaces/ICoverageStatusValues";

export type TCoverageStatus = {
  [key in TCoverageStatusKeys]: ICoverageStatusValues
}