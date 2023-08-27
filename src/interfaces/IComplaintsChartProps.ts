import { IComplaintCountRankResult } from "./IComplaintCountRankResult";
import { IComplaintRankResult } from "./IComplaintRankResult";
import IGetBaseResult from "./IGetBaseResult";

export interface IComplaintsChartProps {
  isLoading: boolean,
  hasSubjectId: boolean,
  chartData: IComplaintCountRankResult[] | IComplaintRankResult[] | undefined,
  operatorInfo: IGetBaseResult | undefined,

}