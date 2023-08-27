import { Box, Stack, Typography } from "@mui/material";

import { getQualityColor } from "../quality.util";

const legendMap = {
  "#FF0000": "ضعیف",
  "#FFC300": "متوسط",
  "#008000": "خوب"
};


function QualityChartLegend() {
  return <Box>
    <Stack
      sx={{ mt: 1 }}
      direction={"row-reverse"} justifyContent={"center"} alignItems={"center"} spacing={2}>
      {
        [1, 2, 3].map(item => {
          const color = getQualityColor(item);
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
}

export default QualityChartLegend;