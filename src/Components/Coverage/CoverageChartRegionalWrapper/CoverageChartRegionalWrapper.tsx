import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { QueryStatus } from "@reduxjs/toolkit/query";


import { useDriveTestAggDataQuery } from "../../../features/craApiSlice";
import { RootState } from "../../../app/store";

import { IRegionInfo } from "../../../interfaces/IRegionInfo";
import { getOperatorCode } from "../../../common/getOperatorCode";

import CoverageChartRegional from "./CoverageChartRegional";
import CoverageChartRegionalTitle from "./CoverageChartRegionalTitle";


function CoverageChartRegionalWrapper() {
  const token = useSelector((state: RootState) => state.auth.token);
  const {
    operator, generation
  } = useSelector((state: RootState) => state.app);
  const { userLocationCoordinates: { lng, lat } } = useSelector((state: RootState) => state.mapView);

  const info = useDriveTestAggDataQuery({
    lat,
    lng,
    apiKey: token,
    lat_1: lat + 0.000001,
    lng_1: lng + 0.000001,
    operatorCode: getOperatorCode(operator!.id, generation!)
  });


  /**
   * holds the modified version of `info` fetched from network to show as chart
   */
  const [regionalChartInfo, setRegionalChartInfo] = useState<IRegionInfo[]>([]);


  /**
   * we should modify the fetched data in a way that we can use it. this effect transforms the `info` object with raw data to array of objects with usable values for recharts.
   */
  useEffect(() => {
    const regionsInfo = info.data ? info.data.result : null;
    if (!regionsInfo) return;

    const coverageRegionalArr = regionsInfo.slice(1);
    const tempRegionalChartInfo: IRegionInfo[] = [];

    for (const { data, title } of coverageRegionalArr) {
      const sum = data.reduce((a, b) => a + b);
      const fractions = data.map(number => Math.floor((number / sum) * 100));
      tempRegionalChartInfo.push({
        title,
        goodCoverage: fractions[3],
        mediumCoverage: fractions[2],
        poorCoverage: fractions[1],
        noCoverage: fractions[0]
      });
    }

    setRegionalChartInfo(tempRegionalChartInfo);
  }, [info]);


  return <>
    <CoverageChartRegionalTitle />
    <CoverageChartRegional isLoading={info.status !== QueryStatus.fulfilled} regionalChartInfo={regionalChartInfo} />
  </>;
}

export default CoverageChartRegionalWrapper;