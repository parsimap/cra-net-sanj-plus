import { IEditOperatorRadioGroupProps } from "./IEditOperatorRadioGroupProps";
import { IService } from "./IService";

export interface IEditServiceRadioGroupProps extends IEditOperatorRadioGroupProps {
  services: IService[];
}