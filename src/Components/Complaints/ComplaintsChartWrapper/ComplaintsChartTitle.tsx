import { Typography } from "@mui/material";
import ChartIcon from "@mui/icons-material/BarChartRounded";

import TitleWithIcon from "../../TitleWithIcon";

import { IComplaintsChartTitleProps } from "../../../interfaces/IComplaintsChartTitleProps";

function ComplaintsChartTitle({ title }: IComplaintsChartTitleProps) {
  return <>
    <Typography sx={{ p: 0.5 }} component={"div"}>
      <TitleWithIcon
        text={title}
        Icon={ChartIcon}
        textProps={{ sx: { fontSize: "0.9rem", fontWeight: 800 } }}
      />
    </Typography>
  </>;
}

export default ComplaintsChartTitle;