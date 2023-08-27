import { NavigateFunction } from "react-router-dom";

export interface IVerifyInfoPresenterProps {
  isDataLoaded: boolean;
  loadingDataError: string;
  navigate: NavigateFunction;
}

