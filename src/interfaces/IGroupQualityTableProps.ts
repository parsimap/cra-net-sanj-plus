import { IOperatorStatus } from "./IOperatorStatus";

export interface IGroupQualityTableProps {
  operatorStatus: { data: IOperatorStatus[], status: string };
  reportTime: string;
}
