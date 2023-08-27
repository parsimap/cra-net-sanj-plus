import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";


import { useComplaintCountQuery, useReportTimeComplaintQuery } from "../../features/craHostServiceApiSlice";
import { provinceChanged } from "../../features/appSlice";
import { useAreaInfoQuery } from "../../features/craApiSlice";
import { complaintGeoJsonChanged } from "../../features/mapViewSlice";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { useArrayQueryResult } from "../../hooks/useArrayQueryResult";

import { Paper, Stack } from "@mui/material";

import ComplaintsTableWrapper from "./ComplaintsTableWrapper/ComplaintsTableWrapper";
import ComplaintsChartWrapper from "./ComplaintsChartWrapper/ComplaintsChartWrapper";
import ComplaintsReportTime from "./ComplaintsReportTime/ComplaintsReportTime";
import ComplaintsAddButton from "./ComplaintsAddButton/ComplaintsAddButton";

import { IProvince } from "../../interfaces/IProvince";

import { useComplaintsGeoJson } from "../../hooks/useComplaintsGeoJson";


function Complaints() {
  const {
    isDataReady: isReportTimeReady,
    returnValue: reportTime
  } = useArrayQueryResult(useReportTimeComplaintQuery, {}, undefined);
  const { operator, province } = useSelector((state: RootState) => state.app);
  const { userLocationCoordinates: { lng, lat }, mapZoom } = useSelector((state: RootState) => state.mapView);
  const token = useSelector((state: RootState) => state.auth.token);
  const areaInfo = useAreaInfoQuery({ lat, lng, zoom: 0, code: 1, apiKey: token });
  /**
   * queryProps is a common object between query params in `useComplaintCountQuery` and props of `ComplaintsChartWrapper`
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


  function submitHandler() {

    function objectToQueryString(params: { [index: string]: string | number }) {
      const array = [];
      for (const key in params) {
        array.push(key + "=" + params[key]);
      }
      return array.join("&");
    }


    const refQueryString = objectToQueryString({
      mainmode: "",
      reportmode: "",
      operatorid: operator!.id,
      serviceid: operator!.serviceId,
      refroute: "submit-complaint",
      refview: [lng, lat, mapZoom].toString()
    });

    const queryString = objectToQueryString({
      workflowid: 150039,
      creatortype: 11,
      opid: operator!.id,
      serviceid: operator!.serviceId,
      lat,
      lng,
      refqs: encodeURIComponent(refQueryString)
    });

    let url = process.env.REACT_APP_CRA_HOST_URL + "/StartPortalWF.aspx?" + queryString;
    let link = document.createElement("a");
    link.href = url;
    link.click();
  }

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
        <ComplaintsReportTime reportTime={reportTime} isReportTimeReady={isReportTimeReady} />
      </Paper>

      <Paper elevation={4}>
        <ComplaintsTableWrapper complaints={{ data: complaints.data, status: complaints.status }} />
      </Paper>

      <Paper elevation={4}>
        <ComplaintsChartWrapper dataInfo={"complaint-count-rank"} subjectIDs={subjectIDs}
                                title={"مقایسه استانی تعداد شکایت از اپراتورها"} queryProps={queryProps} />
      </Paper>

      <Paper elevation={4}>
        <ComplaintsChartWrapper dataInfo={"complaint-rank"} subjectIDs={subjectIDs}
                                title={"مقایسه استانی شکایت از اپراتورها به ازای هر صدهزار مشترک"}
                                queryProps={queryProps} />
      </Paper>
    </Stack>

    <ComplaintsAddButton submitHandler={submitHandler} />
  </>;
}

export default Complaints;

