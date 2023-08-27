import { TSetState } from "../types/TSetState";

export interface IComplaintsChartTabProps {
  subjectId: number,
  subjectIDs: number[],
  setSubjectId: TSetState<number>
}