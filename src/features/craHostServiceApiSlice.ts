import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ICommonComplaintsTabularInfo } from "../interfaces/ICommonComplaintsTabularInfo";
import { IMetadata as IOperatorListResult } from "../interfaces/IMetadata";
import { IOperatorStatus as IOperatorStatusQuery } from "../interfaces/IOperatorStatus";
import { IOperatorStatusResult } from "../interfaces/IOperatorStatusResult";
import { IReportTimeResult } from "../interfaces/IReportTimeResult";
import { IRankingInfoQuery } from "../interfaces/IRankingInfoQuery";
import { IRankingInfoResult } from "../interfaces/IRankingInfoResult";
import { IComplaintCountQuery } from "../interfaces/IComplaintCountQuery";
import { IComplaintCountRankQuery } from "../interfaces/IComplaintCountRankQuery";
import { IComplaintCountRankResult } from "../interfaces/IComplaintCountRankResult";
import { IComplaintRankQuery } from "../interfaces/IComplaintRankQuery";
import { IComplaintRankResult } from "../interfaces/IComplaintRankResult";
import { IPriceListResult } from "../interfaces/IPriceListResult";
import { IPriceListQuery } from "../interfaces/IPriceListQuery";
import { IComplaintDetailQuery } from "../interfaces/IComplaintDetailQuery";
import { IComplaintDetailResult } from "../interfaces/IComplaintDetailResult";


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
      query: () => ({
        url: `/getreporttimefaradid`
      })
    }),
    rankingInfo: builder.query<IRankingInfoResult[], IRankingInfoQuery>({
      query: ({ serviceId, provinceId, category }) => ({
        url: `/ranking/${serviceId}/${provinceId}/${category}`
      })
    }),
    reportTimeComplaint: builder.query<IReportTimeResult[], {}>({
      query: () => ({
        url: `/getreporttimecomplaint`
      })
    }),
    complaintCount: builder.query<ICommonComplaintsTabularInfo[], IComplaintCountQuery>({
      query: ({ serviceId, operatorId, provinceId }) => ({
        url: `/complaintcount/${serviceId}/${provinceId}/${operatorId}`
      })
    }),
    complaintCountRank: builder.query<IComplaintCountRankResult[], IComplaintCountRankQuery>({
      query: ({ serviceId, provinceId, subjectId }) => ({
        url: `/complaintcountrank/${serviceId}/${provinceId}/${subjectId}`
      })
    }),
    complaintRank: builder.query<IComplaintRankResult[], IComplaintRankQuery>({
      query: ({ serviceId, provinceId, subjectId }) => ({
        url: `/complaintrank/${serviceId}/${provinceId}/${subjectId}`
      })
    }),
    fixedPricingList: builder.query<IPriceListResult[], IPriceListQuery>({
      query: ({ serviceId, operatorId, cityCode, provinceCode, countyCode }) => ({
        url: `/tariffsabetlist/${serviceId}/${provinceCode}/${operatorId}/${countyCode}/${cityCode}`
      })
    }),
    otherPricingList: builder.query<IPriceListResult[], IPriceListQuery>({
      query: ({ serviceId, operatorId, cityCode, provinceCode, countyCode }) => ({
        url: `/tariffsayarlist/${serviceId}/${provinceCode}/${operatorId}/${countyCode}/${cityCode}`
      })
    }),
    complaintDetail: builder.query<IComplaintDetailResult[], IComplaintDetailQuery>({
      query: ({ provinceId, operatorId }) => `/complaintdetail/${operatorId}/${provinceId}`
    })
  })
});


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
