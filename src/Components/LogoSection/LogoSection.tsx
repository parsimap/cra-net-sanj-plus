import { Stack, Typography } from "@mui/material";

function LogoSection() {
  return <>
    <Stack direction={"row"} spacing={1} sx={{ position: "absolute", top: 0, right: 0, zIndex: 1199, mr: 1 }}>
      <Typography component={'div'} sx={{
        width: 45,
        height: 45,
        backgroundImage: `url("/images/cra-logo.png")`,
        backgroundSize: "cover"
      }}></Typography>
      <Typography component={'div'} sx={{
        width: 45,
        height: 45,
        backgroundImage: `url("/images/ict-192.png")`,
        backgroundSize: "cover"
      }}></Typography>
    </Stack>
  </>;
}

export default LogoSection;