import { Skeleton, Stack } from "@mui/material";

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import CoverageChartRegionalTick from "./CoverageChartRegionalTick";
import CoverageChartRegionalTooltip from "./CoverageChartRegionalTooltip";
import CoverageChartRegionalLegend from "./CoverageChartRegionalLegend";

import { ICoverageChartRegionalProps } from "../../../interfaces/ICoverageChartRegionalProps";

function CoverageChartRegional({ regionalChartInfo, isLoading }: ICoverageChartRegionalProps) {
  return <>
    {!isLoading ?
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <BarChart width={380} height={250} data={regionalChartInfo} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey={"title"} interval={0} minTickGap={1} tick={<CoverageChartRegionalTick />} />
          <YAxis hide={true} />
          <Tooltip content={({ active, payload, label }) => <CoverageChartRegionalTooltip active={active} label={label}
                                                                                          payload={payload} />} />
          <Legend content={(props) => <CoverageChartRegionalLegend payload={props.payload as any[]} />} />
          <Bar dataKey="noCoverage" stackId="a" fill={"#000000"}></Bar>
          <Bar dataKey="poorCoverage" stackId="a" fill={"#FF0000"}></Bar>
          <Bar dataKey="mediumCoverage" stackId="a" fill={"#FFC300"}></Bar>
          <Bar dataKey="goodCoverage" stackId="a" fill={"#008000"}></Bar>
        </BarChart>
      </Stack>
      : <Skeleton variant={"rounded"} height={250} animation={"pulse"} />}
  </>;
}

export default CoverageChartRegional;