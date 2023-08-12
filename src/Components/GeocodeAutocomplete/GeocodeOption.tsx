import * as React from "react";
import RoomIcon from "@mui/icons-material/Room";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import Box from "@mui/material/Box";
import IGeocodeResult from "../../interfaces/IGeocodeResult";

interface IProps extends React.HTMLAttributes<HTMLLIElement> {
  option: IGeocodeResult["result"][0];
}

const GeocodeOption = ({ option, ...rest }: IProps) => (
  <li {...rest} style={{ padding: 10 }}>
    {!option.postalCodeError ? (
      <RoomIcon sx={{ color: (theme) => theme.palette.grey[500] }} />
    ) : (
      <NotListedLocationIcon
        sx={{ color: (theme) => theme.palette.grey[500] }}
      />
    )}
    <Stack ml={2}>
      <Typography fontWeight={"bold"} fontSize={13}>
        {option.short_title}
      </Typography>
      {!option.postalCodeError ? (
        <Typography fontSize={12}>{option.title}</Typography>
      ) : (
        <Box>
          {option.postalCodeError.accuracyRadius ? (
            <>
              <Typography
                color={(theme) => theme.palette.warning.main}
                fontSize={12}
                display={"inline"}
                component={"span"}
              >
                محل دقیق کدپستی یافت نشد، کدپستی شما با دقت
              </Typography>{" "}
              <Typography
                color={(theme) => theme.palette.warning.dark}
                fontWeight={"bold"}
                fontSize={12}
                display={"inline"}
                component={"span"}
              >
                ({option.postalCodeError.accuracyRadius}متر)
              </Typography>{" "}
              <Typography
                color={(theme) => theme.palette.warning.main}
                display={"inline"}
                component={"span"}
                fontSize={12}
              >
                در نقشه نمایش داده شده‌است
              </Typography>
            </>
          ) : (
            <Typography
              color={(theme) => theme.palette.warning.main}
              fontSize={12}
              display={"inline"}
              component={"span"}
            >
              محل دقیق کدپستی یافت نشد
            </Typography>
          )}
        </Box>
      )}
    </Stack>
  </li>
);

export default GeocodeOption;
