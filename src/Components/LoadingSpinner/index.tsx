import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";
import { ILoadingSpinnerProps } from "../../interfaces/ILoadingSpinnerProps";

function LoadingSpinner({ open }: ILoadingSpinnerProps) {
  return <Backdrop open={open}>
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Typography width={150} height={150} component={"img"} src={"/images/loading-logo192.png"} />
      <CircularProgress color={"inherit"} />
    </Stack>
  </Backdrop>;
}

export default LoadingSpinner;