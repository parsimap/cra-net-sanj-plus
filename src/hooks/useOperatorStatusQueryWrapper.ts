import { useEffect, useState } from "react";

import { useOperatorStatusQuery } from "../features/craHostServiceApiSlice";

import { IUseOperatorStatusQueryWrapperProps } from "../interfaces/IUseOperatorStatusQueryWrapperProps";


/**
 * a wrapper for `useOperatorStatusQuery` provided by createApi in the store to avoid the boilerplate.
 * @param areaInfo a parameter to `useOperatorStatusQuery` which comes from another API request.
 * @param operatorId current operator id
 * @param serviceId current service id
 */
export const useOperatorStatusQueryWrapper = ({
                                                areaInfo,
                                                operatorId,
                                                serviceId
                                              }: IUseOperatorStatusQueryWrapperProps) => {

  const [safeToFetch, setSafeToFetch] = useState<boolean>(false);
  const [provinceId, setProvinceId] = useState<string>("");


  const status = useOperatorStatusQuery({
    operatorId, serviceId, provinceId
  });


  useEffect(() => {
    if (areaInfo.data && Array.isArray(areaInfo.data.result)) {
      setSafeToFetch(true);
    }
  }, [areaInfo]);

  useEffect(() => {
    if (safeToFetch) {
      setProvinceId(areaInfo.data.result[0].code);
    }
  }, [areaInfo, safeToFetch]);


  return status;

};