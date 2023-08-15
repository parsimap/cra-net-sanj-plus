import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../app/store";
import { currentTabChanged, generationChanged, userOperatorChanged, userServiceChanged } from "../../features/appSlice";
import { userLocationCoordinatesChanged } from "../../features/mapViewSlice";


import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from "@mui/material";
import Report from "@mui/icons-material/SummarizeRounded";

import GeocodeAutocomplete from "../GeocodeAutocomplete/GeocodeAutocomplete";

import { IEditProps } from "../../interfaces/IEditProps";
import IGeocodePlace from "../../interfaces/IGeocodePlace";

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

function Edit({ setEditMode, token }: IEditProps) {
  const {
    metadata,
    operator
  } = useSelector((state: RootState) => state.app);
  const {
    userLocationCoordinates: { lng, lat }, mapZoom: zoom
  } = useSelector((state: RootState) => state.mapView);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * holds the ID of the selected service and operator for future uses
   */
  const [info, setInfo] = useState<{ serviceId: number, operatorId: number }>({
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

    function setPathName() {
      navigate("/home");
    }

    function setTab() {
      const serviceWithId = getService(info.serviceId);
      const type = serviceWithId?.type;
      if (type === "mobile") dispatch(currentTabChanged("Coverage"));
      else dispatch(currentTabChanged("Quality"));
    }

    setNewOperator();
    setNewService();
    setNewGeneration();
    setEditMode(false);
    setPathName();
    setTab();
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
        <Typography sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>سرویس مورد نظر خود را انتخاب کنید.</Typography>
        <Divider />
        <FormControl>
          <RadioGroup
            value={info.serviceId}
            onChange={(_, value) => setInfo(prev => ({
              ...prev,
              serviceId: +value,
              // we should change the selected operator after a change in service as an operator and service may have no relation to each other. on service change, the default-selected operator is set to the first one
              operatorId: +value === info.serviceId ? info.operatorId : operators.filter(operator => operator.serviceId === +value)[0].id
            }))}
          >
            {
              metadata?.services.map(({ name, id }) => {
                return <FormControlLabel key={id} value={id} control={<Radio size={"small"} />}
                                         label={<Typography sx={{ fontSize: "0.8rem" }}>{name}</Typography>} />;
              })
            }
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper elevation={4} sx={{ p: 1 }}>
        <Typography sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>اپراتور مورد نظر خود را انتخاب کنید.</Typography>
        <Divider />
        <FormControl>
          <RadioGroup
            value={info.operatorId}
            onChange={(_, value) => setInfo(prev => ({ ...prev, operatorId: +value }))}
          >
            {
              operators.filter(operator => operator.serviceId === info.serviceId).map(({ name, id }) => {
                return <FormControlLabel key={id} value={id} control={<Radio size={"small"} />}
                                         label={<Typography sx={{ fontSize: "0.8rem" }}>{name}</Typography>} />;
              })
            }
          </RadioGroup>
        </FormControl>
      </Paper>
    </Stack>
    <Button variant={"contained"}
            fullWidth={true}
            sx={{ position: "sticky", bottom: "-16px", left: 0, right: 0 }}
            onClick={submitHandler}>
      <Report />
      مشاهده گزارش
    </Button>
  </>;
}

export default Edit;