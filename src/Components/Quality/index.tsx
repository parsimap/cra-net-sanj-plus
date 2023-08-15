import { useSelector } from "react-redux";


import { RootState } from "../../app/store";
import { useOperatorStatusQueryWrapper } from "../../hooks/useOperatorStatusQueryWrapper";
import { useArrayQueryResult } from "../../hooks/useArrayQueryResult";
import { useAreaInfoQuery } from "../../features/craApiSlice";
import { useReportTimeQuery } from "../../features/craHostServiceApiSlice";

import GroupQualityChart from "./GroupQualityChart";
import GroupQualityTable from "./GroupQualityTable";

import { Stack } from "@mui/material";

function Quality() {
  const { serviceId, id: operatorId } = useSelector((state: RootState) => state.app.operator!);
  const { userLocationCoordinates: { lng, lat } } = useSelector((state: RootState) => state.mapView);
  const token = useSelector((state: RootState) => state.auth.token);

  const areaInfo = useAreaInfoQuery({ lat, lng, zoom: 0, code: 1, apiKey: token });
  const status = useOperatorStatusQueryWrapper({ areaInfo, operatorId, serviceId });
  const { isDataReady, returnValue: reportTime } = useArrayQueryResult(useReportTimeQuery, {}, undefined);

  return <>
    <Stack direction={"column"} spacing={1}>
      <GroupQualityTable operatorStatus={{ data: status.data!, status: status.status }}
                         reportTime={isDataReady ? reportTime[0].reportTime : ""} />
      <GroupQualityChart serviceId={serviceId}
                         provinceId={areaInfo.data?.result ? areaInfo.data?.result[0].code : ""} />
    </Stack>

  </>;
}

export default Quality;