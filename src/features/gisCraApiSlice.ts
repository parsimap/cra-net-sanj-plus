import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IFttxAuthenticationResult from "../interfaces/IFttxAuthenticationResult";
import IFttxAuthenticationQuery from "../interfaces/IFttxAuthenticationQuery";

export const gisCraApiSlice = createApi({
  reducerPath: "gis-cra-api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GIS_CRA_API_URL,
  }),
  endpoints: (builder) => ({
    token: builder.query<any, any>({
      query: (query) => ({
        url: `/token?web_app_name=${query.web_app_name}`,
      }),
    }),
    authentication: builder.query<
      IFttxAuthenticationResult,
      IFttxAuthenticationQuery
    >({
      query: ({ passcode }) => ({
        method: "POST",
        url: `/fttx/authentication`,
        body: { passcode },
      }),
    }),
  }),
});

export const { useTokenQuery } = gisCraApiSlice;
