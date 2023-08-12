import { IProviderInfo } from "./IProviderInfo";
import { NavigateFunction } from "react-router-dom";

export interface IVerifyInfoPresenterProps extends IProviderInfo {
  isDataLoaded: boolean;
  loadingDataError: string;
  navigate: NavigateFunction;
}

