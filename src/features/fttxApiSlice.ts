// noinspection SpellCheckingInspection

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IGetBaseResult from "../interfaces/IGetBaseResult";

const getHeaders = (token: string) =>
  new Headers([["Authorization", `Bearer ${token}`]]);

export const fttxApiSlice = createApi({
  reducerPath: "base-api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getBaseData: builder.query<IGetBaseResult, string>({
      query: (token) => ({
        url: "/Get_BaseData",
        headers: getHeaders(token),
      }),
    }),
  }),
});

export const { useGetBaseDataQuery } = fttxApiSlice;
