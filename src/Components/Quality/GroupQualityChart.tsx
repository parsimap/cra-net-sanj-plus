import { useEffect, useState } from "react";

import { useRankingInfoQuery } from "../../features/craHostServiceApiSlice";


import {
  Alert,
  Box,
  buttonBaseClasses,
  Paper,
  Skeleton,
  Stack,
  Tab,
  tabClasses,
  Tabs,
  tabsClasses,
  Typography
} from "@mui/material";
import ChartIcon from "@mui/icons-material/BarChartRounded";

import { STATUS_CATEGORY_MAP } from "./quality.constants";
import { OPERATOR_MAP } from "../../common/constants";
import { IGroupQualityChartProps } from "../../interfaces/IGroupQualityChartProps";
import { IChartData } from "../../interfaces/IChartData";
import { TQualityColor } from "../../types/TQualityColor";

import TitleWithIcon from "../TitleWithIcon";

import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from "recharts";


const legendMap = {
  "#FF0000": "ضعیف",
  "#FFC300": "متوسط",
  "#008000": "خوب"
};


/**
 * returns the color for the chart cell based on the provided metric
 * @param val the value which the color is set upon
 */
function getColor(val: number): TQualityColor {
  if (val === 3) return "#FF0000";
  else if (val === 2) return "#FFC300";
  else return "#008000";
}


function GroupQualityChart({ provinceId, serviceId }: IGroupQualityChartProps) {
  /**
   * holds the current category in which the internet quality is plotted
   */
  const [category, setCategory] = useState<number>(1);

  /**
   * holds the necessary information to render the chart for the current `category`
   */
  const [chartData, setChartData] = useState<IChartData[]>([]);

  const info = useRankingInfoQuery({ serviceId, provinceId, category });

  /**
   * this effect is responsible for saving only the necessary information fetched from network in `chartData` and discarding the unused properties
   */
  useEffect(() => {
    const data = info.data;
    if (data) {
      const chartInfo: IChartData[] = [];
      for (const item of data) {
        const { emtiaz: score, operatorName: longOperatorName, ranking, rank } = item;
        const shortOperatorName = OPERATOR_MAP[longOperatorName];
        chartInfo.push({ score, name: shortOperatorName, ranking, rank });
      }
      setChartData(chartInfo);
    }
  }, [info]);

  // TODO: functions
  /**
   * returns the ranking of the given operator to show in the tooltip
   * @param name name of the target operator
   */
  function getRanking(name: string) {
    if (!name) return "";
    return chartData.find(item => item.name === name)!.ranking;
  }

  return <>
    <Paper elevation={4}>
      <Box sx={{
        [`.${tabsClasses.indicator}`]: { backgroundColor: "#43a047" },
        [`.${tabClasses.textColorInherit}`]: {
          color: "#43a047"
        },
        [`.${buttonBaseClasses.root}`]: { p: "10px 2px", minWidth: "50px" }
      }}>
        <Typography sx={{ p: 0.5 }} component={"div"}>
          <TitleWithIcon
            text={"مقایسه استانی کیفیت اینترنت اپراتور انتخابی با سایر اپراتورها"}
            Icon={ChartIcon}
            textProps={{ sx: { fontSize: "0.9rem", fontWeight: 800 } }}
          />
        </Typography>
        <Tabs
          variant={"fullWidth"}
          textColor="inherit"
          indicatorColor="primary"
          value={category}
          onChange={(_, v) => {
            setCategory(v);
          }}
          sx={{
            mb: 2
          }}
        >
          {
            Object.entries(STATUS_CATEGORY_MAP).map(([key, { shortText, Icon }], index) => {
              return <Tab key={key} value={index + 1}
                          label={
                            <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                              <Typography><Icon /></Typography>
                              <Typography sx={{ fontSize: "0.75rem" }}>{shortText}</Typography>
                            </Stack>
                          } />;
            })
          }
        </Tabs>
        {info.status === "fulfilled" ?
          <Stack sx={{ mb: 2 }} justifyContent={"center"} direction={"row"}>
            <BarChart width={380} height={250} data={chartData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
              <CartesianGrid strokeDasharray="1" />
              <XAxis dataKey={"name"} interval={0} minTickGap={1} tick={({ x, y, payload }) => {
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)" fontSize={"0.7rem"}>
                      {payload.value}
                    </text>
                  </g>
                );
              }} />
              <YAxis />
              <Tooltip content={({ active, payload, label }) => {
                if (!active) return <></>;
                return <>
                  <Paper sx={{ p: 2, "& tspan": { direction: "rtl !important" } }}>
                    <Typography sx={{ fontWeight: "500" }}>{label}</Typography>
                    <Typography>رتبه: {getRanking(label)}</Typography>
                  </Paper>
                </>;
              }}
              />
              <Legend content={() => {
                return <Box>
                  <Stack
                    sx={{ mt: 1 }}
                    direction={"row-reverse"} justifyContent={"center"} alignItems={"center"} spacing={2}>
                    {
                      [1, 2, 3].map(item => {
                        const color = getColor(item);
                        return <Stack key={color} direction={"row"} alignItems={"center"} justifyContent={"center"}
                                      sx={{ width: "60px" }}>
                          <Typography>{legendMap[color]}</Typography>
                          <Typography sx={{
                            backgroundColor: color,
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%"
                          }}></Typography>
                        </Stack>;
                      })
                    }
                  </Stack>
                </Box>;
              }} />
              <Bar dataKey="score">
                {
                  chartData.map(({ rank, ranking }, index) => {
                    return (
                      <Cell key={`${index} ${ranking}`} fill={getColor(+rank)} />
                    );
                  })
                }
              </Bar>
            </BarChart>
          </Stack>
          : <Skeleton variant={"rounded"} height={266} animation={"pulse"} />
        }
        <Alert severity={"info"} sx={{ fontSize: "0.75rem" }}>اندازه گیری کیفیت در سطح استان انجام پذیرفته
          است.</Alert>
      </Box>
    </Paper>
  </>;
}

export default GroupQualityChart;
