import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IFttxAuthenticationResult from "../interfaces/IFttxAuthenticationResult";
import IFttxAuthenticationQuery from "../interfaces/IFttxAuthenticationQuery";
import { ITokenQuery } from "../interfaces/ITokenQurey";
import { ITokenResult } from "../interfaces/ITokenResult";
import Crypto from "crypto-js";

export const gisCraApiSlice = createApi({
  reducerPath: "gis-cra-api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GIS_CRA_API_URL,
  }),
  endpoints: (builder) => ({
    token: builder.query<ITokenResult, ITokenQuery>({
      query: ({ web_app_name }) => ({
        url: `/token?web_app_name=${web_app_name}`,
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
      transformResponse: (result: IFttxAuthenticationResult) => ({
        token: Crypto.AES.decrypt(
          result.token,
          process.env.REACT_APP_FTTX_TOKEN_KEY!,
        ).toString(Crypto.enc.Utf8),
      }),
    }),
  }),
});

export const { useTokenQuery, useAuthenticationQuery } = gisCraApiSlice;
