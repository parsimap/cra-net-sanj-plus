import React, { useEffect, useState } from "react";

import * as yup from "yup";
import { useFormik } from "formik";

import { Button, IconButton, InputAdornment, inputLabelClasses, Paper, Rating, Stack, Typography } from "@mui/material";
import Redo from "@mui/icons-material/RefreshRounded";
import Save from "@mui/icons-material/SaveRounded";
import Close from "@mui/icons-material/CloseRounded";
import TextField from "@mui/material/TextField";

import { useLazyCaptchaQuery } from "../../features/captchaSlice";

import { IFeedbackForm } from "../../interfaces/IFeedbackForm";
import { IFeedbackProps } from "../../interfaces/IFeedbackProps";

// TODO : ask about the regex
const phoneRegExp = /09([0-9][0-9]|3[1-9])[0-9]{7}/;


const validationSchema = yup.object({
  rate: yup.string().required("این فیلد ضروری می باشد."),
  captcha: yup.string().required("این فیلد ضروری می باشد."),
  phone: yup.string().matches(phoneRegExp, "لطفا یک شماره تلفن معتبر وارد نمایید."),
  description: yup.string()
});


const initialValues: IFeedbackForm = {
  rate: 0,
  captcha: "",
  phone: "",
  description: ""
};

function Feedback({ setFeedbackDialogOpen }: IFeedbackProps) {
  const [trigger, { data }] = useLazyCaptchaQuery();

  /**
   * this state hols the captcha information fetched from network
   */
  const [captcha, setCaptcha] = useState<{ url: string, key: number }>();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  });


  useEffect(() => {
    trigger({});
  }, [trigger]);


  /**
   * this effect creates an image from the captcha array fetched from network
   */
  useEffect(() => {
    if (data) {
      const blob = new Blob([new Uint8Array(data.imageData)], {
        type: "image/png"
      });
      let imageUrl = URL.createObjectURL(blob);
      setCaptcha({ url: imageUrl, key: data.key });
    }
  }, [data]);


  function handleSubmit() { //TODO: ask about the submit
    console.log(formik.values);
  }


  return <>
    <Paper elevation={4} sx={{
      p: 2, overflow: "overflow", position: "relative", [`.${inputLabelClasses.root}`]: {
        fontSize: "0.9rem"
      }
    }}>
      <Typography sx={{ position: "absolute", top: 15, left: 15 }}>
        <IconButton onClick={() => setFeedbackDialogOpen(false)}>
          <Close />
        </IconButton>
      </Typography>
      <Typography sx={{ fontSize: "1.2rem", fontWeight: 800, textAlign: "center", mb: 2 }}>ثبت بازخورد</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} spacing={2}>
          <Typography>
            <Typography>چقدر نت سنج پلاس برای شما کاربردی بوده است؟ *</Typography>
            <Typography sx={{ textAlign: "center" }}>
              <Rating
                name={"rate"}
                id={"rate"}
                onChange={formik.handleChange}
                value={formik.values.rate}
              />
            </Typography>
          </Typography>
          <Typography>
            <Typography>آیا مایلید نظر خود را اضافه کنید؟</Typography>
            <Typography>
            <textarea
              id={"description"}
              name={"description"}
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder={"لطفا نظر خود را در این قسمت وارد نمایید."}
              style={{ width: "100%", height: "85px" }} />
            </Typography>
          </Typography>
          <Typography>
            <TextField
              id={"phone"}
              name={"phone"}
              onChange={formik.handleChange}
              value={formik.values.phone}
              error={formik.touched.phone && !!formik.errors.phone}
              helperText={formik.touched.phone && formik.errors.phone}
              size={"small"} label={"شماره تلفن خود را وارد نمایید."} fullWidth={true} />
          </Typography>
          <Typography component={"div"}>
            <Typography>کد امنیتی *</Typography>
            <Stack direction={"row"} alignItems={"center"}>
              <TextField size={"small"} label={"متن روبرو را وارد نمایید."}
                         id={"captcha"}
                         name={"captcha"}
                         onBlur={formik.handleBlur}
                         onChange={formik.handleChange}
                         value={formik.values.captcha}
                         error={formik.touched.captcha && !!formik.errors.captcha}
                         helperText={formik.touched.captcha && formik.errors.captcha}
                         InputProps={{
                           endAdornment: <InputAdornment position="end">
                             <Stack direction={"row"} alignItems={"center"}>
                               <Typography component={"img"} alt={"captcha image"}
                                           src={captcha ? captcha.url : ""}></Typography>
                               <Typography component={"div"}>
                                 <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                                   <IconButton onClick={() => trigger({})}>
                                     <Redo />
                                   </IconButton>
                                 </Stack>
                               </Typography>
                             </Stack>
                           </InputAdornment>
                         }}
              />
            </Stack>
          </Typography>
          <Typography>
            <Stack direction={"row"} justifyContent={"flex-end"} sx={{ mt: 2 }}>
              <Button variant={"contained"} type={"submit"}>
                <Stack direction={"row"} spacing={0.5}>
                  <Save sx={{ fontSize: "1.1rem" }} />
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    ثبت بازخورد
                  </Typography>
                </Stack>
              </Button>
            </Stack>
          </Typography>
        </Stack>
      </form>
    </Paper>
  </>;
}

export default Feedback;