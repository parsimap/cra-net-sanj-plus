import { Divider, Paper, Stack, Typography } from "@mui/material";
import { BubbleChartRounded, ErrorRounded, SignalCellularAltRounded } from "@mui/icons-material";

import TitleWithIcon from "../TitleWithIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useCraDriveTestQuery } from "../../features/craApiSlice";

import { COVERAGE_STATUS } from "./coverage.constants";

import { TIcon } from "../../types/TIcon";
import { TCoverageStatusKeys } from "../../types/TCoverageStatusKeys";
import { ICoverageStatusValues } from "../../interfaces/ICoverageStatusValues";

import CoverageCharts from "./CoverageCharts";
import CoverageChartsRegional from "./CoverageChartsRegional";

import { getOperatorCode } from "../../common/getOperatorCode";


/**
 * adds unit to the current signal value and returns it. handling this inside jsx may be tricky due to the direction problems
 * @param signalValue raw signal value
 */
function adjustSignalValue(signalValue: string) {
  const sv = signalValue.replace("-", "");
  const UNIT = " دسی بل";
  return sv + "-" + UNIT;
}

function Coverage() {
  const token = useSelector((state: RootState) => state.auth.token);

  const {
    operator, generation
  } = useSelector((state: RootState) => state.app);
  const { userLocationCoordinates: { lng, lat } } = useSelector((state: RootState) => state.mapView);


  const info = useCraDriveTestQuery({
    lat, lng, apiKey: token, operatorCode: getOperatorCode(operator!.id, generation!)
  });

  /**
   * based on the fact that an operator may have no coverage in a specific point, we should check for coverage existence before showing chart
   * this function checks if the current operator has coverage in the current point or not.
   */
  function getCurrentStatus() {
    return info.data && info.data.has_value ? COVERAGE_STATUS[info.data.signal_level as unknown as TCoverageStatusKeys] : COVERAGE_STATUS["0"];
  }

  /**
   * returns the value of a given property in the current coverage status
   * @param property is among the properties that describe each individual coverage status ~ keyof ICoverageStatusValues
   */
  function getSignalStatusProperty(property: keyof ICoverageStatusValues) {
    return getCurrentStatus()[property];
  }


  return <>
    <Stack spacing={1}>
      <Paper elevation={4} sx={{ p: 1 }}>
        <Stack direction={"row"} spacing={5} justifyContent={"flex-start"} sx={{ position: "relative" }}>
          <TitleWithIcon text={"وضعیت پوشش"} Icon={BubbleChartRounded} spacing={0.5}
                         textProps={{ sx: { fontSize: "0.9rem", fontWeight: 800 } }} />
          <TitleWithIcon
            text={getSignalStatusProperty("signalText") as string}
            Icon={getSignalStatusProperty("Icon") as TIcon}
            iconProps={{
              sx: info.data && info.data.has_value && !isNaN(+info.data.signal_value) ? {
                color: getSignalStatusProperty("color") as string
              } : {
                color: getSignalStatusProperty("color") as string,
                fontSize: "1.3rem",
                position: "absolute",
                right: "100px",
                top: "5px"
              }
            }}
            textProps={{
              sx: {
                fontSize: "1rem", fontWeight: 300
              }
            }}
          />
        </Stack>
        <Divider />
        <Stack direction={"row"} spacing={5} justifyContent={"flex-start"} alignItems={"center"}
               sx={{ position: "relative" }}>
          <TitleWithIcon text={"شدت سیگنال"} Icon={SignalCellularAltRounded} spacing={0.5}
                         textProps={{ sx: { fontSize: "0.9rem", fontWeight: 800 } }} />

          {info.data && info.data.has_value && !isNaN(+info.data.signal_value) ? <Typography sx={{
              fontSize: "1rem", fontWeight: 300
            }}>{adjustSignalValue(info.data.signal_value)}</Typography> :
            <ErrorRounded sx={{
              fontSize: "1.3rem",
              position: "absolute",
              right: "100px",
              top: "5px"
            }} />
          }
        </Stack>
      </Paper>
      <Paper elevation={4} sx={{ p: 1 }}>
        <CoverageCharts />
      </Paper>
      <Paper elevation={4} sx={{ p: 1 }}>
        <CoverageChartsRegional />
      </Paper>
    </Stack>
  </>;

}

export default Coverage;