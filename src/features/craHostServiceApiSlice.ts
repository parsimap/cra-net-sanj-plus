import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ICommonComplaintsTabularInfo } from "../interfaces/ICommonComplaintsTabularInfo";
import { IMetadata as IOperatorListResult } from "../interfaces/IMetadata";
import { IOperatorStatus as IOperatorStatusQuery } from "../interfaces/IOperatorStatus";
import { IOperatorStatusResult } from "../interfaces/IOperatorStatusResult";
import { IReportTimeResult } from "../interfaces/IReportTimeResult";
import { IRankingInfoQuery } from "../interfaces/IRankingInfoQuery";


export const craHostServiceApiSlice = createApi({
  reducerPath: "host-service-cra-api",
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.REACT_APP_CRA_HOST_SERVICE_API_BASE_URL ?? "")
  }),
  endpoints: (builder) => ({
    operatorList: builder.query<IOperatorListResult, {}>({
      query: () => ({
        url: `/getoplist`
      })
    }),
    operatorStatus: builder.query<IOperatorStatusQuery[], IOperatorStatusResult>({
      query: ({ serviceId, operatorId, provinceId }) => ({
        url: `/faradidlist/${operatorId}/${serviceId}/${provinceId}`
      })
    }),
    reportTime: builder.query<IReportTimeResult[], {}>({
      query: (query) => ({
        url: `/getreporttimefaradid`
      })
    }),
    rankingInfo: builder.query<any, IRankingInfoQuery>({
      query: (query) => ({
        url: `/ranking/${query.serviceId}/${query.provinceId}/${query.category}`
      })
    }),
    reportTimeComplaint: builder.query<any, any>({
      query: (query) => ({
        url: `/getreporttimecomplaint`
      })
    }),
    complaintCount: builder.query<ICommonComplaintsTabularInfo[], {
      serviceId: number,
      provinceId: string,
      operatorId: number
    }>({
      query: (query) => ({
        url: `/complaintcount/${query.serviceId}/${query.provinceId}/${query.operatorId}`
      })
    }),
    complaintCountRank: builder.query<{
      operatorId: number,
      countComplaint: number
    }[], {
      serviceId: number,
      provinceId: string,
      subjectId: number
    }>({
      query: (query) => ({
        url: `/complaintcountrank/${query.serviceId}/${query.provinceId}/${query.subjectId}`
      })
    }),
    complaintRank: builder.query<{
      operatorId: number,
      countComplaint: number
    }[], {
      serviceId: number,
      provinceId: string,
      subjectId: number
    }>({
      query: (query) => ({
        url: `/complaintrank/${query.serviceId}/${query.provinceId}/${query.subjectId}`
      })
    }),
    fixedPricingList: builder.query<
      {
        "tariffName": string,
        "planType": string,
        "geoLimit": string,
        "serviceName": string,
        "tariff": string,
        "nerkhbit": string,
        "hajm": string,
        "limitPack": string,
        "validationLink": string,
        simCart: string
      }[]
      , {
      serviceId: number,
      provinceCode: string,
      operatorId: number,
      countyCode: string,
      cityCode: string
    }>({
      query: (query) => ({
        url: `/tariffsabetlist/${query.serviceId}/${query.provinceCode}/${query.operatorId}/${query.countyCode}/${query.cityCode}`
      })
    }),
    otherPricingList: builder.query<{
      "tariffName": string,
      "planType": string,
      "geoLimit": string,
      "serviceName": string,
      "tariff": string,
      "nerkhbit": string,
      "hajm": string,
      "limitPack": string,
      "validationLink": string,
      "simCart": string
    }[], {
      serviceId: number,
      provinceCode: string,
      operatorId: number,
      countyCode: string,
      cityCode: string
    }>({
      query: (query) => ({
        url: `/tariffsayarlist/${query.serviceId}/${query.provinceCode}/${query.operatorId}/${query.countyCode}/${query.cityCode}`
      })
    }),
    complaintDetail: builder.query<ComplaintDetailResultType, IComplaintDetailQuery>({
      query: ({ provinceId, operatorId }) => `/complaintdetail/${operatorId}/${provinceId}`
    })
  })
});

interface IComplaintDetailQuery {
  provinceId: string;
  operatorId: string;
}

export interface IComplaintDetailResultItem {
  date: string;
  service: string;
  complaintType: string;
  complaintSubject: string;
  comId: number;
  lat: number;
  long: number;
}

type ComplaintDetailResultType = IComplaintDetailResultItem[]
export const {
  useOperatorListQuery,
  useOperatorStatusQuery,
  useReportTimeQuery,
  useRankingInfoQuery,
  useReportTimeComplaintQuery,
  useComplaintCountQuery,
  useComplaintCountRankQuery,
  useComplaintRankQuery,
  useLazyFixedPricingListQuery,
  useLazyOtherPricingListQuery,
  useLazyComplaintDetailQuery
} = craHostServiceApiSlice;
