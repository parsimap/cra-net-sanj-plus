import ErrorRounded from "@mui/icons-material/ErrorRounded";
import SadFace from "@mui/icons-material/SentimentDissatisfiedRounded";
import PokerFace from "@mui/icons-material/SentimentNeutralRounded";
import HappyFace from "@mui/icons-material/SentimentSatisfiedRounded";

import { TCoverageStatus } from "../../types/TCoverageStatus";


export const COVERAGE_STATUS: TCoverageStatus = {
  "0": { signalText: "", Icon: ErrorRounded, color: "#000000" },
  "1": { signalText: "ضعیف", Icon: SadFace, color: "#FF0000" },
  "2": { signalText: "متوسط", Icon: PokerFace, color: "#FFC300" },
  "3": { signalText: "خوب", Icon: HappyFace, color: "#008000" }
};

export const OPERATOR_NAME_MAP: { [index: string]: string } = {
  "mci": "همراه اول",
  "mtn": "ایرانسل",
  "rightell": "رایتل"
};

export const QUALITY_MAP: { [index: string]: string } = {
  "goodCoverage": "خوب",
  "mediumCoverage": "متوسط",
  "poorCoverage": "ضعیف",
  "noCoverage": "فاقد پوشش"
};


export const legendMap = {
  "#FF0000": "ضعیف",
  "#FFC300": "متوسط",
  "#008000": "خوب",
  "#000000": "فاقد پوشش"
};