import { IEditedInfo } from "./IEditedInfo";
import { TSetState } from "../types/TSetState";

export interface IEditOperatorRadioGroupProps {
  info: IEditedInfo,
  setInfo: TSetState<IEditedInfo>;
  operators: { id: number, name: string, serviceId: number }[]
}