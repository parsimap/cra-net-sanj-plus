import { Button } from "@mui/material";
import Report from "@mui/icons-material/SummarizeRounded";

import { IEditCTAProps } from "../../interfaces/IEditCTAProps";

function EditCTA({ submitHandler }: IEditCTAProps) {
  return <Button variant={"contained"}
                 fullWidth={true}
                 sx={{ position: "sticky", bottom: "-16px", left: 0, right: 0 }}
                 onClick={submitHandler}>
    <Report />
    مشاهده گزارش
  </Button>;
}

export default EditCTA;