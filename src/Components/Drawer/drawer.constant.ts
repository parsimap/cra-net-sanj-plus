import { BubbleChartRounded, InfoRounded, LanguageRounded, ShoppingCartRounded } from "@mui/icons-material";

import { ITabInfo } from "../../interfaces/ITabInfo";


export const TABS_INFO: ITabInfo[] = [
  { id: 0, name: "وضعیت پوشش", value: "Coverage", Icon: BubbleChartRounded },
  { id: 1, name: "کیفیت اینترنت", value: "Quality", Icon: LanguageRounded },
  { id: 2, name: "شکایات", value: "Complaints", Icon: InfoRounded },
  { id: 3, name: "تعرفه", value: "Pricing", Icon: ShoppingCartRounded }
];


export const SERVICE_TYPE = {
  "fixed": "fixed",
  "mobile": "mobile"
};