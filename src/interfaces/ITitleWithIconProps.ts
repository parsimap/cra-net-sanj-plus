import { TIcon } from "../types/TIcon";
import { IconProps, TypographyProps } from "@mui/material";

export interface ITitleWithIconProps {
  text: string;
  Icon: TIcon;
  textProps?: TypographyProps;
  iconProps?: IconProps;
  spacing?: number;
}
