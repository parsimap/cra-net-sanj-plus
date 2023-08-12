import { TIcon } from "./TIcon";
import { TQualityInfoText } from "./TQualityInfoText";
import { TQualityStatusMapKeys } from "./TQualityStatusMapKeys";
import { TQualityColor } from "./TQualityColor";

export type TQualityStatusMap = {
  [key in TQualityStatusMapKeys]: {
    Icon: TIcon | undefined;
    color: TQualityColor | undefined;
    infoText: TQualityInfoText | undefined
  }
}
