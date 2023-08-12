import { Stack, Typography } from "@mui/material";

import { ITitleWithIconProps } from "../../interfaces/ITitleWithIconProps";


function TitleWithIcon({ Icon, text, iconProps, textProps, spacing }: ITitleWithIconProps) {
  return <>
    <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"} spacing={spacing}>
      <Typography><Icon {...iconProps} /></Typography>
      <Typography {...textProps}>{text}</Typography>
    </Stack>
  </>;
}

export default TitleWithIcon;