import { Box, Stack, Typography } from "@mui/material";

import { QUALITY_MAP } from "../coverage.constants";

import { TCoverageColor } from "../../../types/TCoverageColor";

function CoverageChartRegionalLegend({ payload }: { payload: any[] }) {
  if (!payload) return <></>;

  return <Box>
    <Stack
      sx={{ mt: 1 }}
      direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
      {
        payload?.map(({ color, dataKey }: { color: TCoverageColor, dataKey: string }) => {
          return <Stack key={color} direction={"row"} alignItems={"center"} justifyContent={"center"}
                        sx={{ width: "65px" }}>
            <Typography sx={{ fontSize: "0.6rem" }}>{QUALITY_MAP[dataKey]}</Typography>
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
}

export default CoverageChartRegionalLegend;