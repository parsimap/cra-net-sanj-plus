import { TOrder } from "./TOrder";

export type TSortCompare = (order: TOrder) => (obj1: any, obj2: any) => number;