import { Divider, Paper, Stack, Typography, typographyClasses } from "@mui/material";
import { IGenerationToolbarProps } from "../../interfaces/IGenerationToolbarProps";

function GenerationToolbar({ generation, changeGenerationHandler }: IGenerationToolbarProps) {
  return <Paper elevation={4} sx={{ p: 1, height: "100px" }}>
    <Stack justifyContent={"space-between"} sx={{
      height: "100%",
      [`.${typographyClasses.root}`]: {
        fontWeight: "600",
        textAlign: "right",
        cursor: "pointer",
        fontFamily: "sans-serif !important"
      }
    }}>
      <Typography sx={{ color: generation === "2G" ? "blue" : "black" }}
                  onClick={() => changeGenerationHandler("2G")}>2G</Typography>
      <Divider orientation={"horizontal"} flexItem={true} />
      <Typography
        sx={{ color: generation === "3G" ? "blue" : "black" }}
        onClick={() => changeGenerationHandler("3G")}>3G</Typography>
      <Divider orientation={"horizontal"} flexItem={true} />
      <Typography sx={{ color: generation === "4G" ? "blue" : "black" }}
                  onClick={() => changeGenerationHandler("4G")}>4G</Typography>
    </Stack>
  </Paper>;
}

export default GenerationToolbar;