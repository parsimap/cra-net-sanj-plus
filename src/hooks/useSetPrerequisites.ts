import { useEffect } from "react";

import { userLocationCoordinatesChanged } from "../features/mapViewSlice";
import { useOperatorListQuery } from "../features/craHostServiceApiSlice";
import {  metadataChanged  } from "../features/appSlice";
import { useAuthenticationQuery } from "../features/gisCraApiSlice";
import { fttxTokenChanged, tokenChanged } from "../features/authSlice";

import { useTokenQueryWrapper } from "./useTokenQueryWrapper";

import { useAppDispatch } from "../app/hooks";

/**
 * a custom hook for loading the necessary information which is needed for further process
 */
export const useSetPrerequisites = () => {

  const dispatch = useAppDispatch();
  const token = useTokenQueryWrapper();

  const fttxToken = useAuthenticationQuery({ passcode: process.env.REACT_APP_FTTX_PASSCODE ?? "" });
  const operatorsList = useOperatorListQuery({});

  /**
   * this effect handles `operatorsList` changes
   */
  useEffect(() => {
    if (operatorsList.isError) {
      return;
    }

    const data = operatorsList.data;
    if (data) {
      dispatch(metadataChanged(data));
    }
  }, [dispatch, operatorsList]);

  useEffect(() => {
    dispatch(tokenChanged(token));
  }, [dispatch, token]);


  useEffect(() => {
    const data = fttxToken.data;
    if (data) {
      dispatch(fttxTokenChanged(data.token));
    }
  }, [dispatch, fttxToken]);


  /**
   * this effect is responsible for tracking end users' live location
   */
  useEffect(() => {
    const locationWatcherID = navigator.geolocation.watchPosition(onUserPermission, onUserDenial, {
      timeout: 5000
    });

    function onUserPermission(position: GeolocationPosition) {
      const { latitude: lat, longitude: lng } = position.coords;
      const lngLat = { lng, lat };
      dispatch(userLocationCoordinatesChanged(lngLat));
    }

    function onUserDenial(err: GeolocationPositionError) {
    }


    return () => {
      navigator.geolocation.clearWatch(locationWatcherID);
    };


  }, [dispatch]);

};
