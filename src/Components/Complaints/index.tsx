import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";


import { useComplaintCountQuery, useReportTimeComplaintQuery } from "../../features/craHostServiceApiSlice";
import { useAreaInfoQuery } from "../../features/craApiSlice";
import { RootState } from "../../app/store";
import { useArrayQueryResult } from "../../hooks/useArrayQueryResult";
import { useAppDispatch } from "../../app/hooks";
import { provinceChanged } from "../../features/appSlice";
import { complaintGeoJsonChanged } from "../../features/mapViewSlice";

import { Button, Paper, Stack, Typography } from "@mui/material";
import Calender from "@mui/icons-material/EventAvailableRounded";
import AddFeedBack from "@mui/icons-material/AddCommentRounded";


import TitleWithIcon from "../TitleWithIcon";
import CommonComplaintsTable from "./CommonComplaintsTable";
import ComplaintsChartsWrapper from "./ComplaintsChartsWrapper";

import { IProvince } from "../../interfaces/IProvince";

import { useComplaintsGeoJson } from "../../hooks/useComplaintsGeoJson";


function Complaints() {
  const {
    isDataReady: isReportTimeReady,
    returnValue: reportTime
  } = useArrayQueryResult(useReportTimeComplaintQuery, {}, undefined);
  const { operator, province } = useSelector((state: RootState) => state.app);
  const { userLocationCoordinates: { lng, lat } } = useSelector((state: RootState) => state.mapView);
  const token = useSelector((state: RootState) => state.auth.token);
  const areaInfo = useAreaInfoQuery({ lat, lng, zoom: 0, code: 1, apiKey: token });
  /**
   * queryProps is a common object between query params in `useComplaintCountQuery` and props of `ComplaintsChartsWrapper`
   */
  const queryProps = {
    provinceId: areaInfo.data?.result ? areaInfo.data?.result[0].code : "-1",
    serviceId: operator!.serviceId
  };
  const dispatch = useAppDispatch();
  const newComplaintsGeoJson = useComplaintsGeoJson({ province, operator });
  const complaints = useComplaintCountQuery({ ...queryProps, operatorId: operator!.id });

  /**
   * sets teh geoJson object in store to be added to the map
   */
  useEffect(() => {
    dispatch(complaintGeoJsonChanged(newComplaintsGeoJson));
    return () => {
      dispatch(complaintGeoJsonChanged({ type: "FeatureCollection", features: [] }));
    };
  }, [dispatch, newComplaintsGeoJson]);

  useEffect(() => {
    if (areaInfo.data) {
      if (areaInfo.data?.status_code === 100) {
        const newProvince: IProvince = {
          id: areaInfo.data.result[0].code,
          title: ""
        };
        dispatch(provinceChanged(newProvince));
      }
    }
  }, [areaInfo, dispatch]);

  /**
   * gets all subjectIDs from fetched `complaints`
   */
  function getSubjectIDs() {
    return complaints && complaints.data ? complaints.data.map(item => +item.subjectId) : [];
  }

  const subjectIDs = useMemo(getSubjectIDs, [complaints]);


  return <>
    <Stack spacing={1}>
      <Paper elevation={4}>
        <Stack sx={{ p: 1 }} direction={"row"} alignItems={"center"} spacing={5}>
          <TitleWithIcon text={"بازه زمانی اطلاعات"} Icon={Calender}
                         textProps={{ sx: { fontSize: "0.9rem", fontWeight: 800 } }} />
          <Typography sx={{ fontWeight: 300 }}>{isReportTimeReady ? reportTime[0].reportTime : ""}</Typography>
        </Stack>
      </Paper>
      <CommonComplaintsTable complaints={{ data: complaints.data, status: complaints.status }} />
      <ComplaintsChartsWrapper dataInfo={"complaint-count-rank"} subjectIDs={subjectIDs}
                               title={"مقایسه استانی تعداد شکایت از اپراتورها"} queryProps={queryProps} />
      <ComplaintsChartsWrapper dataInfo={"complaint-rank"} subjectIDs={subjectIDs}
                               title={"مقایسه استانی شکایت از اپراتورها به ازای هر صدهزار مشترک"}
                               queryProps={queryProps} />

    </Stack>
    <Button sx={{ position: "sticky", bottom: "-16px" }} variant={"contained"} fullWidth={true}>
      <AddFeedBack sx={{ fontSize: "1.3rem" }} />
      ثبت شکایت
    </Button>
  </>;
}

export default Complaints;