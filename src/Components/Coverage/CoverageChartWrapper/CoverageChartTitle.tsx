import TitleWithIcon from "../../TitleWithIcon";

import ChartIcon from "@mui/icons-material/BarChartRounded";

function CoverageChartTitle() {
  return <TitleWithIcon text={"مقایسه وضعیت پوشش اپراتور انتخابی با سایر اپراتورها"} Icon={ChartIcon} textProps={{
    sx: {
      fontSize: "0.9rem",
      fontWeight: 800
    }
  }} />
    ;
}

export default CoverageChartTitle;