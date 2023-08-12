import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MuiPersistentDrawer from "@parsimap/mui-persistent-drawer";

import { Box } from "@mui/material";


import { RootState } from "../../app/store";
import { useAreaInfoQuery } from "../../features/craApiSlice";
import { useTokenQueryWrapper } from "../../hooks/useTokenQueryWrapper";

import { SERVICE_TYPE, TABS_INFO } from "./drawer.constant";
import { TTab } from "../../types/TTab";
import { ITabInfo } from "../../interfaces/ITabInfo";
import { IProvince } from "../../interfaces/IProvince";


import MainContent from "./MainContent";
import Edit from "../Edit";
import { provinceChanged } from "../../features/appSlice";
import { useAppDispatch } from "../../app/hooks";


function Drawer() {
  /**
   * holds the information of drawer's main tabs
   */
  const [tabs, setTabs] = useState<ITabInfo[]>([]);

  /**
   * indicated whether we are in the edit mode or not
   */
  const [editMode, setEditMode] = useState<boolean>(false);

  /**
   * holds the state of current active tab
   */
  const [currentTab, setCurrentTab] = useState<TTab>("Quality");
  const appState = useSelector((state: RootState) => state.app);
  const { service, userLocationCoordinates: { lng, lat }, operator } = appState;
  const navigate = useNavigate();
  const token = useTokenQueryWrapper();
  const areaInfo = useAreaInfoQuery({
    lat, lng, zoom: 0, code: 1, apiKey: token
  });
  const dispatch = useAppDispatch();

  useEffect(() => {

    if (areaInfo.data) {
      if (areaInfo.data?.status_code === 100) {
        const newProvince: IProvince = {
          id: areaInfo.data.result[0]?.code,
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
    if (!appState.service) {
      navigate("/userinfo");
    }
  }, [appState, navigate]);


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

    const tabs = getTabs();
    setTabs(tabs);

  }, [service]);


  return <>
    <MuiPersistentDrawer scroll={true} open={true} width={410} closeTitle={"نقشه"} openTitle={"اطلاعات"}>
      <Box>
        {editMode ? <Edit token={token} areaInfo={areaInfo.data} setEditMode={setEditMode} /> :
          <MainContent service={service} operator={operator} setEditMode={setEditMode} currentTab={currentTab}
                       setCurrentTab={setCurrentTab} tabs={tabs} areaInfo={areaInfo} />}
      </Box>
    </MuiPersistentDrawer>
  </>;
}

export default Drawer;