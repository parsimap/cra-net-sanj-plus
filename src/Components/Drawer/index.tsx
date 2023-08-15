import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import MuiPersistentDrawer from "@parsimap/mui-persistent-drawer";

import { Box } from "@mui/material";

import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useAreaInfoQuery } from "../../features/craApiSlice";
import { provinceChanged } from "../../features/appSlice";


import { SERVICE_TYPE, TABS_INFO } from "./drawer.constant";
import { ITabInfo } from "../../interfaces/ITabInfo";
import { IProvince } from "../../interfaces/IProvince";


import MainContent from "./MainContent";
import Edit from "../Edit";


function Drawer() {
  /**
   * holds the information of drawer's main tabs
   */
  const [tabs, setTabs] = useState<ITabInfo[]>([]);

  /**
   * indicated whether we are in the edit mode or not
   */
  const [editMode, setEditMode] = useState<boolean>(false);

  const { service, operator } = useSelector((state: RootState) => state.app);
  const { userLocationCoordinates: { lng, lat } } = useSelector((state: RootState) => state.mapView);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const path = useLocation();

  const areaInfo = useAreaInfoQuery({
    lat, lng, zoom: 0, code: 1, apiKey: token
  });


  /**
   * if the pathname included `edit` keyword then we go to the edit tab
   */
  useEffect(() => {
    const pathName = path.pathname;
    const pathNameSplit = pathName.split("/");
    if (pathNameSplit.includes("edit")) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [path]);


  useEffect(() => {
    const info = areaInfo.data;
    if (info) {
      if (info.status_code === 100) {
        const newProvince: IProvince = {
          id: info.result[0]?.code,
          title: ""
        };
        dispatch(provinceChanged(newProvince));
      }
    }
  }, [areaInfo, dispatch]);

  /**
   * if user info is not set, navigate to the /userinfo page to retrieve the data
   * TODO: poor UX. should find another way
   */
  useEffect(() => {
    if (!service) {
      navigate("/userinfo");
    }
  }, [service, navigate]);

  /**
   * occupies the tabs state with info from TABS_INFO constant regarding the type of connection(fixed or mobile)
   */
  useEffect(() => {
    function getTabs() {
      const serviceType = service?.type ?? "";
      let tabs = TABS_INFO;
      if (serviceType === SERVICE_TYPE.fixed)
        tabs = tabs.slice(1); // the first element is the coverage which should be removed when service type is fixed
      return tabs;
    }

    const newTabs = getTabs();
    setTabs(newTabs);

  }, [service]);


  return <>
    <MuiPersistentDrawer scroll={true} open={true} width={410} closeTitle={"نقشه"} openTitle={"اطلاعات"}>
      <Box>
        {editMode ? <Edit token={token} setEditMode={setEditMode} /> :
          <MainContent service={service} operator={operator} setEditMode={setEditMode} tabs={tabs} areaInfo={areaInfo}
                       navigate={navigate} />}
      </Box>
    </MuiPersistentDrawer>
  </>;
}

export default Drawer;