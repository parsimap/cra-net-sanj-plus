import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useGetBaseDataQuery } from "../../features/fttxApiSlice";
import { useComplaintCountRankQuery, useComplaintRankQuery } from "../../features/craHostServiceApiSlice";
import { RootState } from "../../app/store";


import { Paper, Skeleton, Stack, Tab, Tabs, Typography } from "@mui/material";
import ChartIcon from "@mui/icons-material/BarChartRounded";
import Topic from "@mui/icons-material/ForumRounded";

import TitleWithIcon from "../TitleWithIcon";


import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import { IComplaintsChartsWrapperProps } from "../../interfaces/IComplaintsChartsWrapperProps";
import { IOperator } from "../../interfaces/IGetBaseResult";


/**
 * uses the operator info object to find the short name(brand name) of the current operator
 * TODO: ask about the drawback
 */
function getOperatorShortName(operatorInfo: any, operatorId: number) {
  const data = operatorInfo.data;
  if (!data) return;
  return data.ResultObject.Operators.find((op: IOperator) => +op.Id === operatorId)?.BrandName;
}


function ComplaintsChartsWrapper({ dataInfo, queryProps, subjectIDs, title }: IComplaintsChartsWrapperProps) {
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


  /**
   * this functionality should be replaced with an API call
   */
  // function getOperatorName(operatorId: number) {
  //   const operator = metadata!.operators.find(item => item.id === operatorId);
  //   const operatorName = operator ? operator.name : "";
  //   return OPERATOR_MAP[operatorName];
  // }

  return <>
    <Paper elevation={4}>
      <Typography sx={{ p: 0.5 }} component={"div"}>
        <TitleWithIcon
          text={title}
          Icon={ChartIcon}
          textProps={{ sx: { fontSize: "0.9rem", fontWeight: 800 } }}
        />
      </Typography>
      <Tabs
        sx={{
          mb: 2
        }}
        variant={"fullWidth"}
        textColor="inherit"
        indicatorColor="primary"
        value={subjectId}
        onChange={(_, v) => {
          setSubjectId(v);
        }}
      >
        {
          subjectIDs.map((item, index) => {
            return <Tab key={item} value={item}
                        label={
                          <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Typography><Topic sx={{ fontSize: "1.1rem" }} /></Typography>
                            <Typography sx={{ fontSize: "0.75rem" }}>موضوع {index + 1}</Typography>
                          </Stack>
                        } />;
          })
        }
      </Tabs>
      {data.status === "fulfilled" && !!subjectId ? <Stack sx={{ p: 1 }} justifyContent={"center"} direction={"row"}>
        <BarChart width={380} height={250} data={data.data} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey={"operatorId"} interval={0} minTickGap={1} tick={({ x, y, payload }) => {
            return (
              <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)" fontSize={"0.7rem"}>
                  {getOperatorShortName(operatorInfo, payload.value)}
                </text>
              </g>
            );
          }} />
          <YAxis />
          <Tooltip content={({ active, payload, label }) => {
            if (!active) return <></>;
            return <>
              <Paper sx={{ p: 2, "& tspan": { direction: "rtl !important" } }}>
                <Typography sx={{ fontWeight: "500" }}>{getOperatorShortName(operatorInfo, label)}</Typography>
                <Typography>مقدار شاخص: {payload && payload[0] ? payload[0].value : ""}</Typography>
              </Paper>
            </>;
          }}
          />
          <Legend content={() => <></>} />
          <Bar dataKey="countComplaint" fill={"#00bcd4"}></Bar>
        </BarChart>
      </Stack> : <Skeleton sx={{ p: 1 }} variant={"rounded"} height={266} animation={"pulse"} />}
    </Paper>
  </>;
}

export default ComplaintsChartsWrapper;