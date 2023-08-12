import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";


export type ITabInfo = {
  id: number,
  name: string,
  value: string,
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }
}