import { TQualityColor } from "../../types/TQualityColor";

/**
 * returns the color for the chart cell based on the provided metric
 * @param val the value which the color is set upon
 */
export function getQualityColor(val: number): TQualityColor {
  if (val === 3) return "#FF0000";
  else if (val === 2) return "#FFC300";
  else return "#008000";
}
