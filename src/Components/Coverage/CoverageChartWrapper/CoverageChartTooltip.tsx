import { Fragment } from "react";

import { COVERAGE_STATUS, OPERATOR_NAME_MAP } from "../coverage.constants";
import { TCoverageStatusKeys } from "../../../types/TCoverageStatusKeys";

import { Paper, Stack, Typography } from "@mui/material";

function CoverageChartTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return <></>;

  const { signal_value, signal_level } = payload[0].payload;
  const coverageStatus = COVERAGE_STATUS[String(signal_level) as TCoverageStatusKeys];

  return <> {
    coverageStatus ? <Fragment key={`${signal_level} ${signal_value}`}>
      <Paper sx={{ p: 1, "& tspan": { direction: "rtl !important" } }}>
        <Typography sx={{ fontWeight: "500", fontSize: "0.8rem" }}>{OPERATOR_NAME_MAP[label]}</Typography>
        <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
          <Typography
            sx={{ width: "10px", height: "10px", backgroundColor: coverageStatus.color }}></Typography>
          <Typography sx={{ fontSize: "0.75rem" }}>{coverageStatus.signalText}(شدت سیگنال
            : {isNaN(+signal_value) ? "0" : (new Intl.NumberFormat("fa", { useGrouping: false })).format(signal_value - 200)})</Typography>

        </Stack>
      </Paper>
    </Fragment> : <></>
  }</>;
}

export default CoverageChartTooltip;