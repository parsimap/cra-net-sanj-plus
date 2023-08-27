import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../app/store";
import {
  currentTabChanged,
  editModeChanged,
  generationChanged,
  userOperatorChanged,
  userServiceChanged
} from "../../features/appSlice";
import { userLocationCoordinatesChanged } from "../../features/mapViewSlice";


import { Paper, Stack } from "@mui/material";

import GeocodeAutocomplete from "../GeocodeAutocomplete/GeocodeAutocomplete";

import { IEditProps } from "../../interfaces/IEditProps";
import IGeocodePlace from "../../interfaces/IGeocodePlace";
import { IEditedInfo } from "../../interfaces/IEditedInfo";
import EditOperatorRadioGroup from "./EditOperatorRadioGroup";
import EditServiceRadioGroup from "./EditServiceRadioGroup";
import EditCTA from "./EditCTA";
import { TTab } from "../../types/TTab";

const searchedLocationInitialState: IGeocodePlace = {
  area_id: "",
  center: { lng: 0, lat: 0 },
  end_location: { lng: 0, lat: 0 },
  last_item_type: 0,
  start_location: { lng: 0, lat: 0 },
  title: "",
  short_title: "",
  postalCodeError: { accuracyRadius: 0 }
};

function Edit({ token }: IEditProps) {
  const {
    metadata,
    operator,
    currentTab
  } = useSelector((state: RootState) => state.app);
  const {
    userLocationCoordinates: { lng, lat }, mapZoom: zoom
  } = useSelector((state: RootState) => state.mapView);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  /**
   * holds the ID of the selected service and operator for future uses
   */
  const [info, setInfo] = useState<IEditedInfo>({
    operatorId: operator!.id,
    serviceId: operator!.serviceId
  });


  /**
   * the state that holds info of searched location
   */
  const [searchedLocation, setSearchedLocation] = useState<IGeocodePlace>(searchedLocationInitialState);


  /**
   * caches the result of `getOperators` as its result does not change over time
   */
  const operators = useMemo(getOperators, [metadata]);

  // TODO : ask about the following functions
  /**
   * gets the unique operators from info stored in redux store
   */
  function getOperators() {
    const operators: { id: number, name: string, serviceId: number }[] = [];
    metadata!.operators.forEach(operator => !operators.find(op => op.id === operator.id) && operators.push({
      id: operator.id,
      name: operator.name,
      serviceId: operator.serviceId
    }));
    return operators;
  }


  /**
   * finds an operator from all operators using its id.
   * @param id the id of the target operator
   */
  function getOperator(id: number) {
    return operators.find(operator => operator.id === id);
  }


  /**
   * finds an operator from all services using its id.
   * @param id the id of the target service
   */
  function getService(id: number) {
    return metadata!.services.find(service => service.id === id);
  }

  /**
   * handles the submit action by dispatching the changes in target service and operator
   */
  function submitHandler() {
    /**
     * dispatches the operator change
     */
    function setNewOperator() {
      const operatorWithId = getOperator(info.operatorId);
      dispatch(userOperatorChanged({
        id: info.operatorId,
        name: operatorWithId!.name,
        provinceId: operator!.provinceId,
        serviceId: info.serviceId
      }));
    }

    /**
     * dispatches the service change
     */
    function setNewService() {
      const serviceWithId = getService(info.serviceId);
      dispatch(userServiceChanged({
        id: info.serviceId,
        name: serviceWithId?.name ?? "",
        type: serviceWithId?.type ?? ""
      }));
    }

    function setNewGeneration() {
      const serviceWithId = getService(info.serviceId);
      dispatch(generationChanged(serviceWithId?.type === "mobile" ? "4G" : undefined));
    }

    function setPathName(newTab: string) {
      navigate(`/home/${newTab.toLowerCase()}/${info.operatorId}/${info.serviceId}`);
    }

    function getTab() {
      const serviceWithId = getService(info.serviceId);
      const type = serviceWithId?.type;
      return type === "mobile" ? "Coverage" : "Quality";
    }

    function setTab(newTab: TTab) {
      dispatch(currentTabChanged(newTab));
    }

    function setEditMode() {
      dispatch(editModeChanged(false));
    }

    setNewOperator();
    setNewService();
    setNewGeneration();
    setEditMode();

    const newTab = getTab();

    setTab(newTab);
    setPathName(newTab);
  }


  function handleLocationChange(newLocation: IGeocodePlace | null) {
    if (newLocation) {
      setSearchedLocation(newLocation);
      if (newLocation.center) {
        dispatch(userLocationCoordinatesChanged(newLocation.center));
      }
    }
  }


  return <>
    <Stack spacing={1}>

      <GeocodeAutocomplete
        mapViewPort={{ lng, lat, zoom }}
        token={token}
        value={searchedLocation}
        onChange={handleLocationChange} />

      <Paper elevation={4} sx={{ p: 1 }}>
        <EditServiceRadioGroup services={metadata?.services ?? []} info={info} setInfo={setInfo}
                               operators={operators} />
      </Paper>

      <Paper elevation={4} sx={{ p: 1 }}>
        <EditOperatorRadioGroup operators={operators} info={info} setInfo={setInfo} />
      </Paper>

    </Stack>

    <EditCTA submitHandler={submitHandler} />
  </>;
}

export default Edit;