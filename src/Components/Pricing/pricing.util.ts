import { TSortCompare } from "../../types/TSortCompare";

import { PRICING_TABLE_COLUMN_MAP } from "./pricing.constants";

//TODO : ask -> data is not clean: sorting is challenging

function regularSort(order: Parameters<TSortCompare>[0]): ReturnType<TSortCompare> {
  return (obj1, obj2) => {
    const [v1, v2] = [obj1.data ? +obj1.data.split(" ")[0] : 0, obj2.data ? +obj2.data.split(" ")[0] : 0];
    return (v1 - v2) * (order === "asc" ? 1 : -1);
  };
}

function priceSort(order: Parameters<TSortCompare>[0]): ReturnType<TSortCompare> {
  return (obj1, obj2) => {
    const [v1, v2] = [obj1.data ? +obj1.data.split(" ")[0].replace(/,/g, "") : 0, obj2.data ? +obj2.data.split(" ")[0].replace(/,/g, "") : 0];
    return (v1 - v2) * (order === "asc" ? 1 : -1);
  };
}

function convertAndSort(order: Parameters<TSortCompare>[0]): ReturnType<TSortCompare> {
  function convertor(unit: "(Mbps)" | "(Kbps)", value: string) {
    const coe = unit === "(Mbps)" ? 1 : 0.001;
    return coe * +value;
  }

  return (obj1, obj2) => {
    const [splitValue1, splitValue2] = [obj1.data ? obj1.data.split(" ") : ["(Mbps)", "0"], obj2.data ? obj2.data.split(" ") : ["(Mbps)", "0"]];
    const [v1, v2] = [splitValue1[0], splitValue2[0]];
    const [u1, u2] = [splitValue1[1], splitValue2[1]];
    const [converted1, converted2] = [convertor(u1, v1), convertor(u2, v2)];
    return (converted1 - converted2) * (order === "asc" ? 1 : -1);
  };
}


export function getSortFunction(columnName: string) {
  switch (columnName) {
    case PRICING_TABLE_COLUMN_MAP["limitPack"]:
    case PRICING_TABLE_COLUMN_MAP["hajm"]:
      return regularSort;
    case PRICING_TABLE_COLUMN_MAP["tariff"]:
      return priceSort;
    case PRICING_TABLE_COLUMN_MAP["nerkhbit"]:
      return convertAndSort;
    default:
      return undefined;
  }
}