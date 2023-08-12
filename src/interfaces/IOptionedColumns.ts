import { TSortCompare } from "../types/TSortCompare";

export interface IOptionedColumns {
  name: string,
  options: { sortCompare?: TSortCompare }
}
