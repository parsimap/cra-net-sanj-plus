import { ICommonComplaintsTabularInfo } from "./ICommonComplaintsTabularInfo";

export interface ICommonComplaintsTableProps {
  complaints: {
    data: ICommonComplaintsTabularInfo[] | undefined,
    status: string
  };
}
