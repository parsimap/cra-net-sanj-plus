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
    })
  })
});

export const {
  useLazyCaptchaQuery
} = captchaSlice;
