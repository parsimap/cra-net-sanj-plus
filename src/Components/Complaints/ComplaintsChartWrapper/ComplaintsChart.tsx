import { Skeleton, Stack } from "@mui/material";

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import ComplaintsChartTick from "./ComplaintsChartTick";
import ComplaintsChartTooltip from "./ComplaintsChartTooltip";

import { IComplaintsChartProps } from "../../../interfaces/IComplaintsChartProps";
import IGetBaseResult, { IOperator } from "../../../interfaces/IGetBaseResult";

/**
 * uses the operator info object to find the short name(brand name) of the current operator
 */
function getOperatorShortName(operatorInfo: IGetBaseResult | undefined, operatorId: number) {
  if (!operatorInfo) return;
  return operatorInfo.ResultObject.Operators.find((op: IOperator) => +op.Id === operatorId)?.BrandName;
}


function ComplaintsChart({ chartData, isLoading, operatorInfo, hasSubjectId }: IComplaintsChartProps) {
  return <>   {
    !isLoading && hasSubjectId ?
      <Stack sx={{ p: 1 }} justifyContent={"center"} direction={"row"}>
        <BarChart width={380} height={250} data={chartData} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey={"operatorId"} interval={0} minTickGap={1}
                 tick={({ x, y, payload }) => <ComplaintsChartTick x={x} y={y}
                                                                   operatorName={getOperatorShortName(operatorInfo, payload.value)} />} />
          <YAxis />
          <Tooltip content={({ active, payload, label }) => <ComplaintsChartTooltip active={active} payload={payload}
                                                                                    operatorName={getOperatorShortName(operatorInfo, label)} />}
          />
          <Legend content={() => <></>} />
          <Bar dataKey="countComplaint" fill={"#00bcd4"}></Bar>
        </BarChart>
      </Stack> : <Skeleton sx={{ p: 1 }} variant={"rounded"} height={266} animation={"pulse"} />
  }
  </>;
}

export default ComplaintsChart;