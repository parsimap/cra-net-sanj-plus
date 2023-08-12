import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  generationChanged,
  metadataChanged,
  userLocationCoordinatesChanged,
  userOperatorChanged,
  userServiceChanged
} from "../../features/appSlice";

import VerifyUserInfo from "./Presenter";
import { NETWORK_REQUEST_ERROR } from "../../common/networkRequestError";
import { useOperatorListQuery } from "../../features/craHostServiceApiSlice";
import { useOperatorInfoQuery } from "../../features/craHostApiSlice";

import { IMetadata } from "../../interfaces/IMetadata";
import { IService } from "../../interfaces/IService";
import { IOperator } from "../../interfaces/IOperator";
import { IProviderInfo } from "../../interfaces/IProviderInfo";

function VerifyUserInfoContainer() {

  /**
   * holds information of all available services and operators
   */
  const [metadata, setMetaData] = useState<IMetadata>({
    operators: [], services: []
  });

  /**
   * holds information of the operator and service of end user
   */
  const [providerInfo, setProviderInfo] = useState<IProviderInfo>({
    serviceName: "نامشخص",
    operatorName: "نامشخص"
  });

  /**
   * keeps track of data loading state; if data is not loaded fallback component is shown
   */
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  /**
   * keeps track of errors that may occur during data fetching and network requests
   */
  const [dataLoadingError, setDataLoadingError] = useState<string>("");


  const dispatch = useDispatch();

  const navigate = useNavigate();

  /**
   * this effect is responsible for tracking end users' live location
   */
  useEffect(() => {
    const locationWatcherID = navigator.geolocation.watchPosition(onUserPermission, onUserDenial, {
      timeout: 5000
    });
    // function effectCleanup() {
    // }

    function onUserPermission(position: GeolocationPosition) {
      const { latitude: lat, longitude: lng } = position.coords;
      const lngLat = { lng, lat };
      dispatch(userLocationCoordinatesChanged(lngLat));
    }

    function onUserDenial(err: GeolocationPositionError) {
      // err.
    }


    return () => {
      navigator.geolocation.clearWatch(locationWatcherID);

    };


  }, [dispatch]);


  /**
   * fetches data using RTK query. data is of type Imetadata
   */
  const operatorsList = useOperatorListQuery({});

  /**
   * this effect handles `operatorsList` changes
   */
  useEffect(() => {
    if (operatorsList.isError) {
      handleNetworkError();
      return;
    }

    const data = operatorsList.data;
    if (data) {
      setMetaData(data);
      dispatch(metadataChanged(data));
    }
  }, [dispatch, operatorsList]);

  /**
   * fetches data using RTK query. data contains operatorId and serviceId
   */
  const operatorInfo = useOperatorInfoQuery({});

  /**
   * this effect handles `operatorInfo` changes
   */
  useEffect(() => {

    function setProviderInfoWrapper(result: {
      status: string,
      status_code: number,
      operatorId: number,
      serviceId: number
    }) {


      function isMetadataLoaded() {
        return metadata && metadata.operators.length !== 0 && metadata.operators.length !== 0;
      }

      function getCurrentService(serviceId: number) {
        return metadata.services.find(service => serviceId === service.id)!;
      }

      function getCurrentOperator(operatorId: number) {
        return metadata.operators.find(operator => operator.id === operatorId)!;
      }

      const isMetaDataLoaded = isMetadataLoaded();


      const NO_INFO = "نامشخص";

      const currentService: IService | null = isMetaDataLoaded ? getCurrentService(result.serviceId) : null;
      const currentOperator: IOperator | null = isMetaDataLoaded ? getCurrentOperator(result.operatorId) : null;

      const currentServiceName = currentService ? currentService.name : NO_INFO;
      const currentOperatorName = currentOperator ? currentOperator.name : NO_INFO;


      if (isMetaDataLoaded || !!dataLoadingError)
        setIsDataLoaded(true);

      setProviderInfo({ serviceName: currentServiceName, operatorName: currentOperatorName });

      dispatch(userServiceChanged(currentService ?? { type: "", name: "", id: -1 }));
      dispatch(userOperatorChanged(currentOperator ?? { name: "", id: -1, serviceId: -1, provinceId: -1 }));
      dispatch(generationChanged(currentService?.type === "mobile" ? "4G" : undefined));

    }

    if (operatorInfo.isError) {
      handleNetworkError();
      return;
    }

    const data = operatorInfo.data;
    if (data) {
      setProviderInfoWrapper(data);
    }

  }, [dataLoadingError, dispatch, metadata, operatorInfo]);


  /**
   * sets the error which was encountered during network requests
   */
  function handleNetworkError() {
    setDataLoadingError(NETWORK_REQUEST_ERROR);
  }


  return <VerifyUserInfo operatorName={providerInfo.operatorName} serviceName={providerInfo.serviceName}
                         isDataLoaded={isDataLoaded} loadingDataError={dataLoadingError} navigate={navigate} />;
}

export default VerifyUserInfoContainer;