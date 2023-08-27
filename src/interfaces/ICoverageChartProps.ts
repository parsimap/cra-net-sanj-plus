import { IExtendedOperatorCoverageReport } from "./IExtendedOperatorCoverageReport";

export interface ICoverageChartProps{
  isLoading:boolean,
  currentCoordinateHasValue:boolean,
  coverageChartInfo:  IExtendedOperatorCoverageReport[]
}