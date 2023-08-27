import { useEffect, useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";


import { RootState } from "../../../app/store";
import { useGetBaseDataQuery } from "../../../features/fttxApiSlice";
import { useRankingInfoQuery } from "../../../features/craHostServiceApiSlice";

import { Paper } from "@mui/material";
import { IGroupQualityChartProps } from "../../../interfaces/IGroupQualityChartProps";

import { IChartData } from "../../../interfaces/IChartData";

import QualityChart from "./QualityChart";
import QualityChartTab from "./QualityChartTab";
import QualityChartInfo from "./QualityChartInfo";
import QualityChartTitle from "./QualityChartTitle";
import { IOperator } from "../../../interfaces/IGetBaseResult";


function QualityChartWrapper({ provinceId, serviceId }: IGroupQualityChartProps) {
  /**
   * holds the current category in which the internet quality is plotted
   */
  const [category, setCategory] = useState<number>(1);

  /**
   * holds the necessary information to render the chart for the current `category`
   */
  const [chartData, setChartData] = useState<IChartData[]>([]);

  const info = useRankingInfoQuery({ serviceId, provinceId, category });

  const { fttxToken } = useSelector((state: RootState) => state.auth);
  const operatorInfo = useGetBaseDataQuery(fttxToken);

  /**
   * this effect is responsible for saving only the necessary information fetched from network in `chartData` and discarding the unused properties
   */
  useEffect(() => {

    /**
     * uses the operator info object to find the short name(brand name) of the current operator
     */
    function getOperatorShortName(operatorId: number) {
      if (!operatorInfo || !operatorInfo.data) return "";
      return operatorInfo.data.ResultObject.Operators.find((op: IOperator) => +op.Id === operatorId)?.BrandName ?? "";
    }


    const data = info.data;
    if (data) {
      const chartInfo: IChartData[] = [];
      for (const item of data) {
        const { emtiaz: score, ranking, rank, operatorId } = item;
        const shortOperatorName = getOperatorShortName(+operatorId);
        chartInfo.push({ score, name: shortOperatorName, ranking, rank });
      }
      setChartData(chartInfo);
    }
  }, [info, operatorInfo]);

  return <>
    <Paper elevation={4}>
      <QualityChartTitle />
      <QualityChartTab category={category} setCategory={setCategory} />
      <QualityChart isLoading={info.status !== QueryStatus.fulfilled} chartData={chartData} />
      <QualityChartInfo />
    </Paper>
  </>;
}

export default QualityChartWrapper;
