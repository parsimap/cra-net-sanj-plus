import { configureStore } from "@reduxjs/toolkit";

import { reducers as appSliceReducer } from "../features/appSlice";
import { gisCraApiSlice } from "../features/gisCraApiSlice";
import { craApiSlice } from "../features/craApiSlice";
import { craHostServiceApiSlice } from "../features/craHostServiceApiSlice";
import { craHostApiSlice } from "../features/craHostApiSlice";
import authReducer from "../features/authSlice";
import { captchaSlice } from "../features/captchaSlice";
import mapViewReducer from "../features/mapViewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appSliceReducer,
    mapView: mapViewReducer,
    [gisCraApiSlice.reducerPath]: gisCraApiSlice.reducer,
    [craApiSlice.reducerPath]: craApiSlice.reducer,
    [craHostServiceApiSlice.reducerPath]: craHostServiceApiSlice.reducer,
    [craHostApiSlice.reducerPath]: craHostApiSlice.reducer,
    [captchaSlice.reducerPath]: captchaSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(craApiSlice.middleware, gisCraApiSlice.middleware, craHostServiceApiSlice.middleware, craHostApiSlice.middleware, captchaSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
