export interface IComplaintsChartsWrapperProps {
  dataInfo: "complaint-count-rank" | "complaint-rank",
  queryProps: {
    serviceId: number, provinceId: string,
  },
  subjectIDs: number[],
  title: string
}