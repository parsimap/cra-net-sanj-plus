import { buttonBaseClasses, Stack, Tab, tabClasses, Tabs, tabsClasses, Typography } from "@mui/material";

import { STATUS_CATEGORY_MAP } from "../quality.constants";

import { IQualityChartTabProps } from "../../../interfaces/IQualityChartTabProps";

function QualityChartTab({ category, setCategory }: IQualityChartTabProps) {
  return <Tabs
    variant={"fullWidth"}
    textColor="inherit"
    indicatorColor="primary"
    value={category}
    onChange={(_, v) => {
      setCategory(v);
    }}
    sx={{
      mb: 2,
      [`.${tabsClasses.indicator}`]: { backgroundColor: "#43a047" },
      [`.${tabClasses.textColorInherit}`]: { color: "#43a047" },
      [`.${buttonBaseClasses.root}`]: { p: "10px 2px", minWidth: "50px" }
    }}
  >
    {
      Object.entries(STATUS_CATEGORY_MAP).map(([key, { shortText, Icon }], index) => {
        return <Tab key={key} value={index + 1}
                    label={
                      <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                        <Typography><Icon /></Typography>
                        <Typography sx={{ fontSize: "0.75rem" }}>{shortText}</Typography>
                      </Stack>
                    } />;
      })
    }
  </Tabs>

    ;
}

export default QualityChartTab;