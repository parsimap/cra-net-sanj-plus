import { Paper, Stack } from "@mui/material";
import { useSelector } from "react-redux";

import { RootState } from "../../app/store";
import { useCraDriveTestQuery } from "../../features/craApiSlice";


import CoverageChartWrapper from "./CoverageChartWrapper/CoverageChartWrapper";
import CoverageChartRegionalWrapper from "./CoverageChartRegionalWrapper/CoverageChartRegionalWrapper";
import CoverageCurrentOperatorInfo from "./CoverageCurrentOperatorInfo/CoverageCurrentOperatorInfo";

import { getOperatorCode } from "../../common/getOperatorCode";


function Coverage() {
  const token = useSelector((state: RootState) => state.auth.token);

  const {
    operator, generation
  } = useSelector((state: RootState) => state.app);
  const { userLocationCoordinates: { lng, lat } } = useSelector((state: RootState) => state.mapView);


  const info = useCraDriveTestQuery({
    lat, lng, apiKey: token, operatorCode: getOperatorCode(operator!.id, generation!)
  });


  return <>
    <Stack spacing={1}>
      <Paper elevation={4} sx={{ p: 1 }}>
        <CoverageCurrentOperatorInfo data={info.data ?? null} />
      </Paper>
      <Paper elevation={4} sx={{ p: 1 }}>
        <CoverageChartWrapper />
      </Paper>
      <Paper elevation={4} sx={{ p: 1 }}>
        <CoverageChartRegionalWrapper />
      </Paper>
    </Stack>
  </>;

}

export default Coverage;