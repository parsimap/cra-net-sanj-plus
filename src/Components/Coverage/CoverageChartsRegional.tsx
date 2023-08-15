import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { QueryStatus } from "@reduxjs/toolkit/query";

import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import ChartIcon from "@mui/icons-material/BarChartRounded";

import TitleWithIcon from "../TitleWithIcon";

import { useDriveTestAggDataQuery } from "../../features/craApiSlice";
import { RootState } from "../../app/store";


import { QUALITY_MAP } from "./coverage.constants";
import { IRegionInfo } from "../../interfaces/IRegionInfo";


import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import { getOperatorCode } from "../../common/getOperatorCode";

function CoverageChartsRegional() {
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
    if (regionsInfo) {
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
    }
  }, [info]);


  return <>
    <TitleWithIcon text={"وضعیت پوشش اپراتور انتخابی در منطقه"} Icon={ChartIcon} textProps={{
      sx: {
        fontSize: "0.9rem",
        fontWeight: 800
      }
    }} />
    {info.status === QueryStatus.fulfilled ?
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <BarChart width={380} height={250} data={regionalChartInfo} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey={"title"} interval={0} minTickGap={1} tick={({ x, y, payload }) => {
            return (
              <g transform={`translate(${x},${y})`}>
                <text x={20} y={0} dy={16} textAnchor="end" fill="#666" fontSize={"0.7rem"}>
                  {payload.value}
                </text>
              </g>
            );
          }} />
          <YAxis hide={true} />
          <Tooltip  content={({ active, payload, label }) => {
            if (!active) return <></>;
            return <Paper sx={{ p: 1 }}>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 500 }}>{label}</Typography>
              {
                payload?.map(({ color, name, value }) => {
                  return <Fragment key={`${value} ${name}`}>
                    <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                      <Typography sx={{ width: "5px", height: "5px", backgroundColor: color }}></Typography>
                      <Typography sx={{
                        fontSize: "0.75rem",
                        fontWeight: 300
                      }}>{QUALITY_MAP[name as string]} (%{value})</Typography>
                    </Stack>
                  </Fragment>;
                })
              }
            </Paper>;
          }}
          />
          <Legend content={(props) => {
            const info = props.payload;
            return <Box>
              <Stack
                sx={{ mt: 1 }}
                direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                {
                  info?.map(({ color, value }) => {
                    return <Stack key={color} direction={"row"} alignItems={"center"} justifyContent={"center"}
                                  sx={{ width: "65px" }}>
                      <Typography sx={{ fontSize: "0.6rem" }}>{QUALITY_MAP[value]}</Typography>
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
          <Bar dataKey="noCoverage" stackId="a" fill={"#000000"}></Bar>
          <Bar dataKey="poorCoverage" stackId="a" fill={"#FF0000"}></Bar>
          <Bar dataKey="mediumCoverage" stackId="a" fill={"#FFC300"}></Bar>
          <Bar dataKey="goodCoverage" stackId="a" fill={"#008000"}></Bar>
        </BarChart>
      </Stack>
      : <Skeleton variant={"rounded"} height={250} animation={"pulse"} />}
  </>;
}

export default CoverageChartsRegional;