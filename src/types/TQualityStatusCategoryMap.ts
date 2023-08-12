import { TIcon } from "./TIcon";
import { TQualityStatusCategoryMapKeys } from "./TQualityStatusCategoryMapKeys";

export type TQualityStatusCategoryMap = {
  [key in TQualityStatusCategoryMapKeys]: {
    text: string,
    shortText: string,
    Icon: TIcon,
  }
}