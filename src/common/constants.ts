import { IOperatorCatalog } from "../interfaces/IOperatorCatelog";
import { TCoverageColor } from "../types/TCoverageColor";

export const OPERATOR_CATALOG: IOperatorCatalog[] = [
  { operatorId: 76, operatorCode: 3011, generation: "2G" },
  { operatorId: 76, operatorCode: 3012, generation: "3G" },
  { operatorId: 76, operatorCode: 3013, generation: "4G" },

  { operatorId: 27, operatorCode: 4011, generation: "2G" },
  { operatorId: 27, operatorCode: 4012, generation: "3G" },
  { operatorId: 27, operatorCode: 4013, generation: "4G" },

  { operatorId: 74, operatorCode: -1, generation: "2G" },
  { operatorId: 74, operatorCode: 5012, generation: "3G" },
  { operatorId: 74, operatorCode: 5013, generation: "4G" }
];


export const COVERAGE_LAYER_STOPS: TCoverageColor[] = ["#FF0000", "#FFC300", "#008000", "#000000"];