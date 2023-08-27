import { TCoverageColor } from "../../types/TCoverageColor";

/**
 * returns a color code based on the given metric
 * @param val the value used to map signal_value to a color
 */
export function getCoverageColor(val: number): TCoverageColor {
  if (val === 1) return "#FF0000";
  else if (val === 2) return "#FFC300";
  else if (val === 3) return "#008000";
  else return "#000000";
}


