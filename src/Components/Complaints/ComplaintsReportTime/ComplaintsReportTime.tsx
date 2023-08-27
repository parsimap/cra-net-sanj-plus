import { Stack, Typography } from "@mui/material";
import Calender from "@mui/icons-material/EventAvailableRounded";

import TitleWithIcon from "../../TitleWithIcon";

import { IComplaintsReportTimeProps } from "../../../interfaces/IComplaintsReportTimeProps";

function ComplaintsReportTime({ isReportTimeReady, reportTime }: IComplaintsReportTimeProps) {
  return <Stack sx={{ p: 1 }} direction={"row"} alignItems={"center"} spacing={5}>
    <TitleWithIcon text={"بازه زمانی اطلاعات"} Icon={Calender}
                   textProps={{ sx: { fontSize: "0.9rem", fontWeight: 800 } }} />
    <Typography sx={{ fontWeight: 300 }}>{isReportTimeReady ? reportTime[0].reportTime : ""}</Typography>
  </Stack>;
}

export default ComplaintsReportTime;