interface IArea {
  code: string,
  id: string,
  title: string,
  type: number
}

export interface IAreaInfoResult {
  status: string,
  status_code: number,
  ApproximateAddress: null | string,
  area_id: number,
  area_name: string,
  limitedFullAddress: string,
  localAddress: string,
  prefix: string,
  result: IArea[],
  shortAddress: string
}