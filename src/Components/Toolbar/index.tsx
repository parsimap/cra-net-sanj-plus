import { useAppDispatch } from "../../app/hooks";
import { generationChanged, mapZoomChanged } from "../../features/appSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import GenerationToolbar from "./GenerationToolbar";
import { Box, Stack } from "@mui/material";
import ZoomToolbar from "./ZoomToolbar";
import { TGeneration } from "../../types/TGeneration";
import { IToolbarProps } from "../../interfaces/IToolbarProps";

function Toolbar({ zoomHandlers: { handleZoomIn, handleZoomOut, getZoom } }: IToolbarProps) {
  const dispatch = useAppDispatch();
  const { generation, mapZoom } = useSelector((state: RootState) => state.app);

  function changeGenerationHandler(generation: TGeneration) {
    dispatch(generationChanged(generation));
  }

  function handleZoomChange(mode: "in" | "out") {
    if (mode === "in") {
      const maxZoom = 22;
      if (mapZoom !== maxZoom) {
        handleZoomIn!();
        dispatch(mapZoomChanged(getZoom!()));
      }
    } else {
      const minZoom = 1;
      if (mapZoom !== minZoom) {
        handleZoomOut!();
        dispatch(mapZoomChanged(getZoom!()));
      }
    }
  }


  return <>
    <Box sx={{ position: "absolute", right: 15, zIndex: 100000, top: "40%" }}>
      <Stack spacing={0.5}>
        <ZoomToolbar handleZoomChange={handleZoomChange} zoom={mapZoom} />
        {generation ?
          <GenerationToolbar generation={generation} changeGenerationHandler={changeGenerationHandler} /> : <></>}
      </Stack>
    </Box>
  </>;
}

export default Toolbar;