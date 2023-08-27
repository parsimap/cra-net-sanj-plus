import { Alert, Button, Paper, Snackbar, Stack, Typography, typographyClasses } from "@mui/material";
import Edit from "@mui/icons-material/EditNoteRounded";
import Confirm from "@mui/icons-material/BeenhereRounded";

import { IVerifyInfoPresenterProps } from "../../interfaces/IVerifyInfoPresenterProps";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import LoadingSpinner from "../LoadingSpinner";
import { currentTabChanged } from "../../features/appSlice";
import { useAppDispatch } from "../../app/hooks";


function VerifyUserInfo({
                          isDataLoaded,
                          loadingDataError,
                          navigate
                        }: IVerifyInfoPresenterProps) {
  const { operator, service } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();


  /**
   * changes the current tab both in store and path
   */
  function submitHandler() {
    const tab = service!.type === "mobile" ? "Coverage" : "Quality";
    dispatch(currentTabChanged(tab));
    navigate(`/home/${tab.toLowerCase()}/${operator!.id}/${operator!.serviceId}`);
  }

  /**
   * sets the edit mode in path
   */
  function editHandler() {
    navigate(`/edit/${operator!.id}/${operator!.serviceId}`);
  }

  return <>
    {isDataLoaded ?
      <Stack justifyContent={"center"} alignItems={"center"} sx={{ height: "100vh", backgroundColor: "#f3f3f3" }}>
        <Paper variant={"elevation"} elevation={5} sx={{ width: "400px", p: 2 }}>
          <Stack direction={"column"} spacing={3}>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
              اطلاعات بدست آمده در مورد سرویس اینترنت شما
            </Typography>
            <Stack direction={"row"} alignItems={"center"} sx={{ p: 2 }} spacing={2}>
              <Stack spacing={2} sx={{ [`.${typographyClasses.root}`]: { fontSize: "0.9rem" } }}>
                <Typography>
                  سرویس {service!.name}
                </Typography>
                <Typography>
                  اپراتور {operator!.name}
                </Typography>
              </Stack>
              <Typography component={"div"} sx={{
                backgroundImage: !loadingDataError ? "url(\"/operator-icon.c54a679a.png\")" : "",
                backgroundPositionX: "-64px",
                backgroundPositionY: "-64px",
                backgroundSize: "128px",
                height: "32px",
                width: "32px",
                transform: "scale(2)"
              }}></Typography>
            </Stack>
            <Stack direction={"column"} spacing={2} sx={{ p: 2 }}>
              <Stack direction={"row"} justifyContent={"space-around"}>
                <Button onClick={submitHandler}
                        variant={"contained"}>
                  <Confirm sx={{ fontSize: "1.2rem" }} />
                  تایید و ادامه
                </Button>
                <Button
                  onClick={editHandler}
                  variant={"outlined"}>
                  <Edit />
                  ویرایش
                </Button>
              </Stack>
              <Typography sx={{ fontSize: "0.8rem", textAlign: "justify", color: "#999" }}>
                در صورتیکه مشخصات ارائه شده با اطلاعات سرویس اینترنت شما مطابقت
                ندارد؛ یا مایل به دریافت گزارش درخصوص سایر سرویس‌ها و یا
                اپراتورها می‌باشید، بروی دکمه ویرایش کلیک کنید.
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Stack> :
      <LoadingSpinner open={true} />
    }

    {
      loadingDataError && <Snackbar open={!!loadingDataError}>
        <Alert severity={"error"}>
          {loadingDataError}
        </Alert>
      </Snackbar>
    }
  </>;
}

export default VerifyUserInfo;