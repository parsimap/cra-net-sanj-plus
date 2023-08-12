import { useEffect, useState } from "react";

/**
 * useArrayQueryResult makes sure that the desired properties of Array type are present in the result of useQueries provided by RTK query hooks before
 * returning them; thus, eliminating possible errors and bugs. returns an object with two properties; isDataReady indicates if it is safe to use the returnValue.
 * @param useCustomHook the use...Query hook provided by RTK query
 * @param params parameters to pass to the `useCustomHook` prop
 * @param propertyName if the desired property is nested in the result of `useCustomHook`, use this optional prop to provide the property name
 */
export const useArrayQueryResult = (useCustomHook: any, params: any, propertyName: string | undefined) => {

  const [isDataReady, setIsDataReady] = useState<boolean>(false);
  const [returnValue, setReturnValue] = useState<any[]>([]);

  const status = useCustomHook(
    params
  );

  useEffect(() => {
    if (status.data && Array.isArray(propertyName !== undefined ? status.data[propertyName] : status.data)) {
      setIsDataReady(true);
      setReturnValue(propertyName !== undefined ? status.data[propertyName] : status.data);
    }
  }, [propertyName, status]);

  return { isDataReady, returnValue };
};