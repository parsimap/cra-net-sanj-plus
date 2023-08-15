import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Map from "../Map";
import Drawer from "../Drawer";

import { RootState } from "../../app/store";


function MapView() {

  /**
   * dataReady state is used to avoid unnecessary render of MapView component in case users' data has not been retrieved
   */
  const [dataReady, setDataReady] = useState(false);
  const appState = useSelector((state: RootState) => state.app);

  const navigate = useNavigate();

  // TODO: bad UX
  useEffect(() => {
    if (!appState.service) {
      navigate("/userinfo");
    } else {
      setDataReady(true);
    }
  }, [appState, navigate]);

  return <>

    {dataReady &&
      <>
        <Map />
        <Drawer />
      </>
    }

  </>;
}

export default MapView;