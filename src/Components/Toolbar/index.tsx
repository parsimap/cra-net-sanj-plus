import { useSelector } from "react-redux";

import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { generationChanged } from "../../features/appSlice";
import { mapZoomChanged, userLocationCoordinatesChanged } from "../../features/mapViewSlice";

import GenerationToolbar from "./GenerationToolbar";
import ZoomToolbar from "./ZoomToolbar";
import LocationToolbar from "./LocationToolbar";

import { Box, Stack } from "@mui/material";

import { TGeneration } from "../../types/TGeneration";
import { IToolbarProps } from "../../interfaces/IToolbarProps";

function Toolbar({ zoomHandlers: { handleZoomIn, handleZoomOut, getZoom }, mapReady }: IToolbarProps) {
  const dispatch = useAppDispatch();
  const { generation } = useSelector((state: RootState) => state.app);
  const { mapZoom } = useSelector((state: RootState) => state.mapView);

  function changeGenerationHandler(generation: TGeneration) {
    dispatch(generationChanged(generation));
  }
// TODO: zoom handling?
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

  function handleSelfLocation() {

    function errorCallback(error: GeolocationPositionError) {
      console.log(error);
    }

    function successCallback(position: GeolocationPosition) {
      const { latitude: lat, longitude: lng } = position.coords;
      const lngLat = { lng, lat };
      dispatch(userLocationCoordinatesChanged(lngLat));
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback,
      {
        maximumAge: 0
      }
    );

  }


  return <>
    {mapReady && <Box sx={{ position: "absolute", right: 15, zIndex: 1199, top: "40%" }}>
      <Stack spacing={0.5}>
        <LocationToolbar handleSelfLocation={handleSelfLocation} />
        <ZoomToolbar handleZoomChange={handleZoomChange} zoom={mapZoom} />
        {generation ?
          <GenerationToolbar generation={generation} changeGenerationHandler={changeGenerationHandler} /> : <></>}
      </Stack>
    </Box>}
  </>;
}

export default Toolbar;