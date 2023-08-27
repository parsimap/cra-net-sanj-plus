import { Paper, Typography } from "@mui/material";

export function ComplaintsChartTooltip({ active, payload, operatorName }: any) {
  if (!active) return <></>;
  return <>
    <Paper sx={{ p: 2, "& tspan": { direction: "rtl !important" } }}>
      <Typography sx={{ fontWeight: "500" }}>{operatorName}</Typography>
      <Typography>مقدار شاخص: {payload && payload[0] ? payload[0].value : ""}</Typography>
    </Paper>
  </>;
}

export default ComplaintsChartTooltip;