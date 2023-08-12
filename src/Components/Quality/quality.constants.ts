import PokerFace from "@mui/icons-material/SentimentNeutralRounded";
import SadFace from "@mui/icons-material/SentimentDissatisfiedRounded";
import HappyFace from "@mui/icons-material/SentimentSatisfiedRounded";
import Company from "@mui/icons-material/ApartmentRounded";
import Game from "@mui/icons-material/SportsEsportsRounded";
import Call from "@mui/icons-material/AddIcCallRounded";
import Download from "@mui/icons-material/DownloadRounded";
import Web from "@mui/icons-material/LanguageRounded";

import { TQualityStatusMap } from "../../types/TQualityStatusMap";
import { TQualityStatusCategoryMap } from "../../types/TQualityStatusCategoryMap";


export const STATUS_MAP: TQualityStatusMap = {
  "-1": { Icon: undefined, color: undefined, infoText: undefined },
  "1": { Icon: HappyFace, color: "#008000", infoText: "خوب" },
  "2": { Icon: PokerFace, color: "#FFC300", infoText: "متوسط" },
  "3": { Icon: SadFace, color: "#FF0000", infoText: "ضعیف" }
};


export const STATUS_CATEGORY_MAP: TQualityStatusCategoryMap = {
  "companyrank": { text: "گروه کاربران تجاری", shortText: "کاربران تجاری", Icon: Company },
  "gamingrank": { text: "گروه بازی (Gaming)", shortText: "بازی", Icon: Game },
  "callingrank": { text: "گروه تماس اینترنتی (VoIP)", shortText: "تماس اینترنتی", Icon: Call },
  "downloadrank": { text: "گروه دانلود حجیم", shortText: "دانلود حجیم", Icon: Download },
  "webrank": { text: "گروه وبگردی", shortText: "وبگردی", Icon: Web }
};