import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  Stack,
  Typography,
  typographyClasses
} from "@mui/material";
import { IVerifyInfoPresenterProps } from "../../interfaces/IVerifyInfoPresenterProps";


function VerifyUserInfo({
                          operatorName,
                          serviceName,
                          isDataLoaded,
                          loadingDataError,
                          navigate
                        }: IVerifyInfoPresenterProps) {
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
                  سرویس {serviceName}
                </Typography>
                <Typography>
                  اپراتور {operatorName}
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
                <Button onClick={() => navigate("/home")} variant={"contained"}> تایید و ادامه</Button>
                <Button variant={"outlined"}>ویرایش</Button>
              </Stack>
              <Typography sx={{ fontSize: "0.8rem", textAlign: "justify", color: "#999" }}>
                در صورتیکه مشخصات ارائه شده با اطلاعات سرویس اینترنت شما مطابقت
                ندارد؛ یا مایل به دریافت گزارش درخصوص سایر سرویس‌ها و یا
                اپراتورها می‌باشید، بروی دکمه ویرایش کلیک کنید.
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Stack> : <Backdrop open={true} sx={{ zIndex: 100000 }}> <CircularProgress color="inherit" />
      </Backdrop>}

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