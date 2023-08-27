import TitleWithIcon from "../../TitleWithIcon";

import ChartIcon from "@mui/icons-material/BarChartRounded";

function CoverageChartRegionalTitle() {
  return <TitleWithIcon text={"وضعیت پوشش اپراتور انتخابی در منطقه"} Icon={ChartIcon} textProps={{
    sx: {
      fontSize: "0.9rem",
      fontWeight: 800
    }
  }} />;
}

export default CoverageChartRegionalTitle;