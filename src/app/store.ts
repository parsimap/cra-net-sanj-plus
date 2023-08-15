import { configureStore } from "@reduxjs/toolkit";

import { gisCraApiSlice } from "../features/gisCraApiSlice";
import { craApiSlice } from "../features/craApiSlice";
import { craHostServiceApiSlice } from "../features/craHostServiceApiSlice";
import { craHostApiSlice } from "../features/craHostApiSlice";
import { captchaSlice } from "../features/captchaSlice";
import { fttxApiSlice } from "../features/fttxApiSlice";
import mapViewReducer from "../features/mapViewSlice";
import authReducer from "../features/authSlice";
import appReducer from "../features/appSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    mapView: mapViewReducer,
    [gisCraApiSlice.reducerPath]: gisCraApiSlice.reducer,
    [craApiSlice.reducerPath]: craApiSlice.reducer,
    [craHostServiceApiSlice.reducerPath]: craHostServiceApiSlice.reducer,
    [craHostApiSlice.reducerPath]: craHostApiSlice.reducer,
    [captchaSlice.reducerPath]: captchaSlice.reducer,
    [fttxApiSlice.reducerPath]: fttxApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(craApiSlice.middleware, gisCraApiSlice.middleware, craHostServiceApiSlice.middleware, craHostApiSlice.middleware, captchaSlice.middleware, fttxApiSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
