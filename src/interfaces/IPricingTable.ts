import { IOptionedColumns } from "./IOptionedColumns";

export interface IPricingTable {
  tableColumns: IOptionedColumns[],
  tableRows: string[][]
}