import { Stack, Tab, Tabs, Typography } from "@mui/material";
import Topic from "@mui/icons-material/ForumRounded";

import { IComplaintsChartTabProps } from "../../../interfaces/IComplaintsChartTabProps";

function ComplaintsChartTab({ subjectId, subjectIDs, setSubjectId }: IComplaintsChartTabProps) {
  return <>
    <Tabs
      sx={{
        mb: 2
      }}
      variant={"fullWidth"}
      textColor="inherit"
      indicatorColor="primary"
      value={subjectId}
      onChange={(_, v) => {
        setSubjectId(v);
      }}
    >
      {
        subjectIDs.map((item, index) => {
          return <Tab key={item} value={item}
                      label={
                        <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                          <Typography><Topic sx={{ fontSize: "1.1rem" }} /></Typography>
                          <Typography sx={{ fontSize: "0.75rem" }}>موضوع {index + 1}</Typography>
                        </Stack>
                      } />;
        })
      }
    </Tabs>
  </>;
}

export default ComplaintsChartTab;