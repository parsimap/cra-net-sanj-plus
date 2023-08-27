import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { QueryStatus } from "@reduxjs/toolkit/query";

import { useGetBaseDataQuery } from "../../../features/fttxApiSlice";
import { useComplaintCountRankQuery, useComplaintRankQuery } from "../../../features/craHostServiceApiSlice";
import { RootState } from "../../../app/store";

import { IComplaintsChartsWrapperProps } from "../../../interfaces/IComplaintsChartsWrapperProps";

import ComplaintsChartTab from "./ComplaintsChartTab";
import ComplaintsChartTitle from "./ComplaintsChartTitle";
import ComplaintsChart from "./ComplaintsChart";

function ComplaintsChartWrapper({ dataInfo, queryProps, subjectIDs, title }: IComplaintsChartsWrapperProps) {

  /**
   * holds the current subject id which the chart is shown for
   */
  const [subjectId, setSubjectId] = useState<number>(-1);

  /**
   * TODO: ask the best practice
   */
  const fetchDataHook = dataInfo === "complaint-count-rank" ? useComplaintCountRankQuery : useComplaintRankQuery;
  const data = fetchDataHook({ ...queryProps, subjectId });

  const { fttxToken } = useSelector((state: RootState) => state.auth);
  const operatorInfo = useGetBaseDataQuery(fttxToken);


  useEffect(() => {
    setSubjectId(subjectIDs[0]);
  }, [subjectIDs]);


  return <>
    <ComplaintsChartTitle title={title} />
    <ComplaintsChartTab subjectId={subjectId} subjectIDs={subjectIDs} setSubjectId={setSubjectId} />
    <ComplaintsChart isLoading={data.status !== QueryStatus.fulfilled} hasSubjectId={!!subjectId} chartData={data.data}
                     operatorInfo={operatorInfo.data} />
  </>;
}

export default ComplaintsChartWrapper;