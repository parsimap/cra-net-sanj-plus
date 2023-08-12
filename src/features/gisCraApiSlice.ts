import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const gisCraApiSlice = createApi({
  reducerPath: "gis-cra-api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GIS_CRA_API_URL
  }),
  endpoints: (builder) => ({
    token: builder.query<any, any>({
      query: (query) => ({
        url: `/token?web_app_name=${query.web_app_name}`
      })
    })
  })
});

export const {
  useTokenQuery
} = gisCraApiSlice;
