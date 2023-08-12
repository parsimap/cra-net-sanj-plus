import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const selectSelf = (state: RootState) => state;

export const tokenSelector = createSelector(
  selectSelf,
  (state) => state.auth.token,
);
