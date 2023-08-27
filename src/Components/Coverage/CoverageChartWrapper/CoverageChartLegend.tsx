import { Box, Stack, Typography } from "@mui/material";

import { getCoverageColor } from "../coverage.util";


const legendMap = {
  "#FF0000": "ضعیف",
  "#FFC300": "متوسط",
  "#008000": "خوب",
  "#000000": "فاقد پوشش"
};

function CoverageChartLegend() {
  return <Box>
    <Stack
      sx={{ mt: 1 }}
      direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
      {
        [-1, 1, 2, 3].map(item => {
          const color = getCoverageColor(item);
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
}

export default CoverageChartLegend;