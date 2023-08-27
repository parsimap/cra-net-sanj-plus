import { Button } from "@mui/material";
import AddFeedBack from "@mui/icons-material/AddCommentRounded";

import { IComplaintsAddButtonProps } from "../../../interfaces/IComplaintsAddButtonProps";

function ComplaintsAddButton({ submitHandler }: IComplaintsAddButtonProps) {
  return <Button onClick={submitHandler} sx={{ position: "sticky", bottom: "-16px" }} variant={"contained"}
                 fullWidth={true}>
    <AddFeedBack sx={{ fontSize: "1.3rem" }} />
    ثبت شکایت
  </Button>;
}

export default ComplaintsAddButton;