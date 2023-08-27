import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { generationChanged, userOperatorChanged, userServiceChanged } from "../../features/appSlice";
import { useOperatorInfoQuery } from "../../features/craHostApiSlice";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";


import VerifyUserInfo from "./Presenter";

import { NETWORK_REQUEST_ERROR } from "../../common/networkRequestError";
import { IService } from "../../interfaces/IService";
import { IOperator } from "../../interfaces/IOperator";

function VerifyUserInfoContainer() {
  const { metadata } = useSelector((state: RootState) => state.app);

  /**
   * keeps track of data loading state; if data is not loaded fallback component is shown
   */
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  /**
   * keeps track of errors that may occur during data fetching and network requests
   */
  const [dataLoadingError, setDataLoadingError] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        return metadata!.services.find(service => serviceId === service.id)!;
      }

      function getCurrentOperator(operatorId: number) {
        return metadata!.operators.find(operator => operator.id === operatorId)!;
      }

      const isMetaDataLoaded = isMetadataLoaded();


      const currentService: IService | null = isMetaDataLoaded ? getCurrentService(result.serviceId) : null;
      const currentOperator: IOperator | null = isMetaDataLoaded ? getCurrentOperator(result.operatorId) : null;


      if (isMetaDataLoaded || !!dataLoadingError)
        setIsDataLoaded(true);


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


  return <VerifyUserInfo isDataLoaded={isDataLoaded} loadingDataError={dataLoadingError} navigate={navigate} />;
}

export default VerifyUserInfoContainer;