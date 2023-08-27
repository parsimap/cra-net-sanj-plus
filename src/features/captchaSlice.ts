import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ICaptchaResult } from "../interfaces/ICaptchaResult";


export const captchaSlice = createApi({
  reducerPath: "captcha",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CRA_CAPTCHA_API_URL
  }),
  endpoints: (builder) => ({
    captcha: builder.query<ICaptchaResult, {}>({
      query: () => ({
        url: `/getcaptcha`
      })
    }),
    serviceFeedback: builder.query<{ status_code: number }, {
      MizanRezayat: number,
      Mobile: string,
      Nazar: string,
      captcha: string,
      key: number
    }>({
      query: ({ MizanRezayat, Mobile, Nazar, captcha, key }) => ({
        url: `/SanJeshRezaya/${key}/${captcha}`,
        method: "POST",
        body: JSON.stringify({
          MizanRezayat, Mobile, Nazar
        })
      })
    })
  })
});

export const {
  useLazyCaptchaQuery, useLazyServiceFeedbackQuery
} = captchaSlice;
