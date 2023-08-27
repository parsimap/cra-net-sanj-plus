import { TGeneration } from "../types/TGeneration";

import { OPERATOR_CATALOG } from "./constants";

export function getOperatorCode(targetOperatorId: number, targetGeneration: TGeneration) {
  const operator = OPERATOR_CATALOG.find(op => op.operatorId === targetOperatorId && op.generation === targetGeneration);
  return operator ? operator.operatorCode : -1;
}