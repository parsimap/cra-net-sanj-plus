import { Skeleton, Stack } from "@mui/material";

import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from "recharts";

import { IQualityChartProps } from "../../../interfaces/IQualityChartProps";

import { getQualityColor } from "../quality.util";

import QualityChartTick from "./QualityChartTick";
import QualityChartTooltip from "./QualityChartTooltip";
import QualityChartLegend from "./QualityChartLegend";


function QualityChart({ chartData, isLoading }: IQualityChartProps) {
  return <> {!isLoading ?
    <Stack sx={{ mb: 2 }} justifyContent={"center"} direction={"row"}>
      <BarChart width={380} height={250} data={chartData} margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>
        <CartesianGrid strokeDasharray="1" />
        <XAxis dataKey={"name"} interval={0} minTickGap={1} tick={<QualityChartTick />} />
        <YAxis />
        <Tooltip content={<QualityChartTooltip />} />
        <Legend content={<QualityChartLegend />} />
        <Bar dataKey="score">
          {
            chartData.map(({ rank, ranking }, index) => {
              return (
                <Cell key={`${index} ${ranking}`} fill={getQualityColor(+rank)} />
              );
            })
          }
        </Bar>
      </BarChart>
    </Stack>
    : <Skeleton variant={"rounded"} height={266} animation={"pulse"} />
  }</>;
}

export default QualityChart;