import { Paper, Stack, Typography } from "@mui/material";
import MyLocation from "@mui/icons-material/MyLocationRounded";

import { ILocationToolbarProps } from "../../interfaces/ILocationToolbarProps";

function LocationToolbar({ handleSelfLocation }: ILocationToolbarProps) {
  return <Paper elevation={4} sx={{ p: 1, height: "40px", width: "40px", borderRadius: "50%", cursor: "pointer" }}
                onClick={handleSelfLocation}>
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <Typography>
        <MyLocation />
      </Typography>
    </Stack>
  </Paper>;
}

export default LocationToolbar;