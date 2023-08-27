import { OPERATOR_NAME_MAP } from "../coverage.constants";

function CoverageChartTick({ x, y, payload }: any) {
  return <g transform={`translate(${x},${y})`} key={payload.value}>
    <text x={20} y={0} dy={16} textAnchor="end" fill="#666" fontSize={"0.7rem"}>
      {OPERATOR_NAME_MAP[payload.value]}
    </text>
  </g>;
}

export default CoverageChartTick;