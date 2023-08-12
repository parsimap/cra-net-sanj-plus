import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IOperatorInfoResult } from "../interfaces/IOperatorInfoResult";


export const craHostApiSlice = createApi({
  reducerPath: "host-cra-api",
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.REACT_APP_CRA_HEADER_API_URL ?? "")
  }),
  endpoints: (builder) => ({
    operatorInfo: builder.query<IOperatorInfoResult, {}>({
      query: () => `/getOperatorInfo`
    })
  })
});

export const {
  useOperatorInfoQuery
} = craHostApiSlice;
