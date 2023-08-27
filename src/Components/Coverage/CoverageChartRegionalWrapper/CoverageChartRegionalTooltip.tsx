import { Fragment } from "react";

import { Paper, Stack, Typography } from "@mui/material";

import { QUALITY_MAP } from "../coverage.constants";

import { Payload } from "recharts/types/component/DefaultTooltipContent";

function CoverageChartRegionalTooltip({ active, payload, label }: {
  active?: boolean,
  payload?: Payload<string | number | (string | number)[], string | number>[],
  label: string
}) {
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
}

export default CoverageChartRegionalTooltip;