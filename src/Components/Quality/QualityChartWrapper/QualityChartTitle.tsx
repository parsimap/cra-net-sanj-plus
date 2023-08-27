import { Typography } from "@mui/material";
import ChartIcon from "@mui/icons-material/BarChartRounded";

import TitleWithIcon from "../../TitleWithIcon";

function QualityChartTitle() {
  return <Typography sx={{ p: 0.5 }} component={"div"}>
    <TitleWithIcon
      text={"مقایسه استانی کیفیت اینترنت اپراتور انتخابی با سایر اپراتورها"}
      Icon={ChartIcon}
      textProps={{ sx: { fontSize: "0.9rem", fontWeight: 800 } }}
    />
  </Typography>;
}

export default QualityChartTitle;