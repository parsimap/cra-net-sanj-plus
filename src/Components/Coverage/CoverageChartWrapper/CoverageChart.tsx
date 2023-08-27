import { Skeleton, Stack, Typography } from "@mui/material";
import ErrorRounded from "@mui/icons-material/ErrorRounded";

import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from "recharts";
import CoverageChartTick from "./CoverageChartTick";
import CoverageChartTooltip from "./CoverageChartTooltip";
import CoverageChartLegend from "./CoverageChartLegend";

import { getCoverageColor } from "../coverage.util";

import { ICoverageChartProps } from "../../../interfaces/ICoverageChartProps";

function CoverageChart({ coverageChartInfo, isLoading, currentCoordinateHasValue }: ICoverageChartProps) {
  return <>
    {!isLoading ?
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{ minHeight: "250px" }}>
        {currentCoordinateHasValue ? <BarChart width={380} height={250} data={coverageChartInfo} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
            <CartesianGrid strokeDasharray="1" />
            <YAxis domain={[0, 200]} hide={true} />
            <XAxis dataKey={"name"} interval={0} minTickGap={1} tick={<CoverageChartTick />} />
            <Tooltip content={<CoverageChartTooltip />} />
            <Legend content={<CoverageChartLegend />} />
            <Bar dataKey="signal_value">
              {
                coverageChartInfo.map(({ signal_level, name }, index) => {
                  return <Cell key={`${name} ${index}`} fill={getCoverageColor(signal_level)} />;
                })
              }
            </Bar>
          </BarChart> :
          <Stack alignItems={"center"}>
            <ErrorRounded sx={{
              fontSize: "4rem"
            }} />
            <Typography sx={{ textAlign: "center" }}>با انتخاب نزدیکترین معبر دارای اندازه‌گیری، مقایسه بین اپراتوری را
              مشاهده کنید.</Typography>
          </Stack>
        }
      </Stack>
      : <Skeleton variant={"rounded"} height={250} animation={"pulse"} />
    }
  </>;
}

export default CoverageChart;