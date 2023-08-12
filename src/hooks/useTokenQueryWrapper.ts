import { useEffect, useState } from "react";

import { useTokenQuery } from "../features/gisCraApiSlice";

/**
 * a wrapper for useTokenQuery provided by createApi in the store to avoid the boilerplate.
 */
export const useTokenQueryWrapper = () => {
  const [token, setToken] = useState("no-token");

  const tokenQuery = useTokenQuery(
    {
      web_app_name: "netsanj-plus"
    }
  );


  useEffect(() => {
    const data = tokenQuery.data;
    if (data) {
      setToken(data.token);
    }
  }, [tokenQuery]);

  return token;
};