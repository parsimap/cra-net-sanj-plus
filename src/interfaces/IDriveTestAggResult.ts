interface IDriveTestAggResultItem {
  data: number[],
  title: string
}

export interface IDriveTestAggResult {
  status: string;
  status_code: number;
  result: IDriveTestAggResultItem[];
}