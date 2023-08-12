import { Divider, Paper, Stack } from "@mui/material";
import ZoomIn from "@mui/icons-material/AddRounded";
import ZoomOut from "@mui/icons-material/Minimize";

import { IZoomToolbarProps } from "../../interfaces/IZoomToolbarProps";

function ZoomToolbar({ handleZoomChange, zoom }: IZoomToolbarProps) {
  return <>
    <Paper elevation={4} sx={{ p: 1 }}>
      <Stack>
        <ZoomIn onClick={() => handleZoomChange("in")}
                sx={{
                  fontSize: "1.3rem",
                  mb: 0.5,
                  cursor: zoom === 22 ? "default" : "pointer",
                  color: zoom === 22 ? "#eee" : "#000"
                }} />
        <Divider orientation={"horizontal"} flexItem={true} />
        <ZoomOut onClick={() => handleZoomChange("out")}
                 sx={{
                   fontSize: "1.3rem",
                   cursor: zoom === 1 ? "default" : "pointer",
                   color: zoom === 1 ? "#eee" : "#000"
                 }} />
      </Stack>
    </Paper>
  </>;
}

export default ZoomToolbar;