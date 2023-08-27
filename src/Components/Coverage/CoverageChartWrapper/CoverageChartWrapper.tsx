import { useMemo } from "react";

import { useAllCraDriveTests } from "../../../hooks/useAllCraDriveTests";

import { IExtendedOperatorCoverageReport } from "../../../interfaces/IExtendedOperatorCoverageReport";

import CoverageChart from "./CoverageChart";
import CoverageChartTitle from "./CoverageChartTitle";


function CoverageChartWrapper() {


  const { isLoading, result } = useAllCraDriveTests({ negateSignalValues: true });

  function getData() {

    function getOperatorsWithValue(result: IExtendedOperatorCoverageReport[]): IExtendedOperatorCoverageReport[] {
      return result.filter(item => item.has_value && isFinite(item.signal_value));
    }

    function reverseSignalValueOrder(result: IExtendedOperatorCoverageReport[]): IExtendedOperatorCoverageReport[] {
      return result.map(item => ({ ...item, signal_value: 200 - item.signal_value }));
    }

    const resultWithValues = getOperatorsWithValue(result);
    const newCoverageChartInfo = reverseSignalValueOrder(resultWithValues);

    return newCoverageChartInfo;
  }


  const coverageChartInfo = useMemo(getData, [result]);
  const currentCoordinateHasValue = coverageChartInfo.some(item => item.has_value);

  return <>
    <CoverageChartTitle />
    <CoverageChart isLoading={isLoading} currentCoordinateHasValue={currentCoordinateHasValue}
                   coverageChartInfo={coverageChartInfo} />
  </>;
}

export default CoverageChartWrapper;