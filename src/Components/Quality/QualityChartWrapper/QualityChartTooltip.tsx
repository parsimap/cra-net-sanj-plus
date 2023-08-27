import { Paper, Typography } from "@mui/material";

function QualityChartTooltip({ active, payload, label }: any) {
  if (!active || !payload) return <></>;
  const ranking = payload[0].payload.ranking;
  return <>
    <Paper sx={{ p: 2, "& tspan": { direction: "rtl !important" } }}>
      <Typography sx={{ fontWeight: "500" }}>{label}</Typography>
      <Typography>رتبه: {ranking}</Typography>
    </Paper>
  </>;
}

export default QualityChartTooltip;