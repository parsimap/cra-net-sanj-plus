import { createTheme, ThemeProvider } from "@mui/material";
import RTL from "./CacheRTL";


function ThemeWrapper(props: any) {
  return (
    <RTL>
      <ThemeProvider theme={createTheme({ direction: "rtl" })}>
        {props.children}
      </ThemeProvider>
    </RTL>
  );
}

export default ThemeWrapper;
