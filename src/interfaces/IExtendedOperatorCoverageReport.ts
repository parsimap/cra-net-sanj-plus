import { ICraDriveTestResult } from "./ICraDriveTestResult";

/**
 * we need the `IExtendedOperatorCoverageReport` interface since we may want to modify the `signal_value` property
 */
export interface IExtendedOperatorCoverageReport extends Omit<ICraDriveTestResult, "signal_value"> {
  signal_value: number;
}
