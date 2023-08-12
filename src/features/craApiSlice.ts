import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


import { ICraDriveTestResult } from "../interfaces/ICraDriveTestResult";
import IGeocodeQuery from "../interfaces/IGeocodeQuery";
import IGeocodeResult from "../interfaces/IGeocodeResult";
import { IAreaInfoResult } from "../interfaces/IAreaInfoResult";
import { IAreaInfoQuery } from "../interfaces/IAreaInfoQuery";
import { ICraDriveTestQuery } from "../interfaces/ICraDriveTestQuery";
import { IDriveTestAggQuery } from "../interfaces/IDriveTestAggQuery";
import { IDriveTestAggResult } from "../interfaces/IDriveTestAggResult";


export const craApiSlice = createApi({
  reducerPath: "cra-api",
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.REACT_APP_CRA_API_URL ?? "")
  }),
  endpoints: (builder) => ({
    areaInfo: builder.query<IAreaInfoResult, IAreaInfoQuery>({
      query: ({ lng, lat, zoom, apiKey, code }) => ({
        url: `areaInfo/${lat}/${lng}/${zoom}/${code}/${apiKey}/areaInfo`
      })
    }),
    craDriveTest: builder.query<ICraDriveTestResult, ICraDriveTestQuery>({
      query: ({ lng, lat, operatorCode, apiKey }) => ({
        url: `getcradrivetestval/${operatorCode}/${lat}/${lng}/${apiKey}/getcradrivetestval`
      })
    }),
    driveTestAggData: builder.query<IDriveTestAggResult, IDriveTestAggQuery>({
      query: ({ lng, lat, operatorCode, apiKey, lng_1, lat_1 }) => ({
        url: `drivetestaggdata/${operatorCode}/${lat}/${lng}/${lat_1}/${lng_1}/${apiKey}/drivetestaggdata`
      })
    }),
    geocode: builder.query<IGeocodeResult, IGeocodeQuery>({
      query: ({ token, lat, lng, zoom, address }) => ({
        url: `geocode/${address}/${zoom}/${lat}/${lng}/${token}/geocode`
      })
    })

  })
});


export const {
  useAreaInfoQuery, useCraDriveTestQuery, useDriveTestAggDataQuery, useLazyGeocodeQuery
} = craApiSlice;




