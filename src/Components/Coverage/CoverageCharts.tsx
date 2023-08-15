import { Fragment } from "react";

import TitleWithIcon from "../TitleWithIcon";

import ChartIcon from "@mui/icons-material/BarChartRounded";
import ErrorRounded from "@mui/icons-material/ErrorRounded";
import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";

import { useAllCraDriveTests } from "../../hooks/useAllCraDriveTests";

import { COVERAGE_STATUS, legendMap, OPERATOR_NAME_MAP } from "./coverage.constants";
import { TCoverageColor } from "../../types/TCoverageColor";
import { TCoverageStatusKeys } from "../../types/TCoverageStatusKeys";

import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from "recharts";


/**
 * returns a color code based on the given metric
 * @param val the value used to map signal_value to a color
 */
function getColor(val: number): TCoverageColor {
  if (val === 1) return "#FF0000";
  else if (val === 2) return "#FFC300";
  else if (val === 3) return "#008000";
  else return "#000000";
}


function CoverageCharts() {


  const { isLoading, result } = useAllCraDriveTests({ negateSignalValues: true });


  // TODO: ask about the functions - clean up

  /**
   * uses the label (x-axis label) of operator to get its object
   * @param label the target label
   */

  function getInfoFromLabel(label: string) {
    const result = getModifiedResult().find(item => item.name === label)!;
    const signalValue = (result.signal_value - 200);
    return {
      ...result,
      signal_value: signalValue === 0 ? 0 : signalValue
    };
  }

  /**
   * if the current coordinates have no coverage, chart should not be shown; so at least one `has_value` property should be true among all operators
   */
  // TODO: transform to var
  function isCoordinateValid() {
    return result.some(item => item.has_value);
  }

  /**
   * if an operator has no valid value for signal_level, it should be filtered out
   */
  function getModifiedResult() {
    return result.filter(item => item.has_value && isFinite(item.signal_value)).map(x => ({
      ...x,
      signal_value: 200 - x.signal_value
    }));
    // return result.filter(item => item.has_value && isFinite(item.signal_value)).sort((a, b)=> a.signal_value < b.signal_value);
  }

  return <>
    <TitleWithIcon text={"مقایسه وضعیت پوشش اپراتور انتخابی با سایر اپراتورها"} Icon={ChartIcon} textProps={{
      sx: {
        fontSize: "0.9rem",
        fontWeight: 800
      }
    }} />
    {!isLoading ?
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{ minHeight: "250px" }}>
        {isCoordinateValid() ? <BarChart width={380} height={250} data={getModifiedResult()} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
            <CartesianGrid strokeDasharray="1" />
            <XAxis dataKey={"name"} interval={0} minTickGap={1} tick={({ x, y, payload }) => {
              return <g transform={`translate(${x},${y})`} key={payload.value}>
                <text x={20} y={0} dy={16} textAnchor="end" fill="#666" fontSize={"0.7rem"}>
                  {OPERATOR_NAME_MAP[payload.value]}
                </text>
              </g>;
            }} />
            <YAxis domain={[0, 200]} />{/*hide={true}*/}
            <Tooltip content={({ active, payload, label }) => {
              console.log(payload);
              // TODO: use paylaod
              if (!active) return <></>;
              const { signal_value, signal_level } = getInfoFromLabel(label) ?? {
                signal_value: "0",
                signal_level: "0"
              };
              const coverageStatus = COVERAGE_STATUS[String(signal_level) as TCoverageStatusKeys];
              return <> {
                coverageStatus ? <Fragment key={`${signal_level} ${signal_value}`}>
                  <Paper sx={{ p: 1, "& tspan": { direction: "rtl !important" } }}>
                    <Typography sx={{ fontWeight: "500", fontSize: "0.8rem" }}>{OPERATOR_NAME_MAP[label]}</Typography>
                    <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                      <Typography
                        sx={{ width: "10px", height: "10px", backgroundColor: coverageStatus.color }}></Typography>
                      <Typography sx={{ fontSize: "0.75rem" }}>{coverageStatus.signalText}(شدت سیگنال
                        : {isNaN(+signal_value) ? "0" : (new Intl.NumberFormat('fa', { useGrouping: false })).format(signal_value)})</Typography>

                    </Stack>
                  </Paper>
                </Fragment> : <></>
              }</>;
            }}
            />
            <Legend content={(props) => {
              return <Box>
                <Stack
                  sx={{ mt: 1 }}
                  direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                  {
                    [-1, 1, 2, 3].map(item => {
                      const color = getColor(item);
                      return <Stack key={color} direction={"row"} alignItems={"center"} justifyContent={"center"}
                                    sx={{ width: "65px" }}>
                        <Typography sx={{ fontSize: "0.6rem" }}>{legendMap[color]}</Typography>
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
            <Bar dataKey="signal_value">
              {
                result.map(({ signal_level, name, signal_value, has_value }, index) => {
                  return <> <Cell key={name} fill={getColor(signal_level)} /></>;
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
      : <Skeleton variant={"rounded"} height={250} animation={"pulse"} />}
  </>;
}

export default CoverageCharts;