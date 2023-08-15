import { Divider, Paper, Stack, Typography, typographyClasses } from "@mui/material";

import { IGenerationToolbarProps } from "../../interfaces/IGenerationToolbarProps";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function GenerationToolbar({ generation, changeGenerationHandler }: IGenerationToolbarProps) {

  const { operator } = useSelector((state: RootState) => state.app);
  const operatorHas2G = operator!.id !== 74; // any operator without 2g support should be filtered out here

  return <Paper elevation={4} sx={{ p: 1, height: operatorHas2G ? "100px" : "70px" }}>
    <Stack justifyContent={"space-between"} sx={{
      height: "100%",
      [`.${typographyClasses.root}`]: {
        fontWeight: "600",
        textAlign: "right",
        cursor: "pointer",
        fontFamily: "sans-serif !important"
      }
    }}>
      {operatorHas2G &&
        <>
          <Typography sx={{ color: generation === "2G" ? "blue" : "black" }}
                      onClick={() => changeGenerationHandler("2G")}>2G</Typography>
          <Divider orientation={"horizontal"} flexItem={true} />
        </>
      }

      <Typography
        sx={{ color: generation === "3G" ? "blue" : "black" }}
        onClick={() => changeGenerationHandler("3G")}>3G</Typography>
      <Divider orientation={"horizontal"} flexItem={true} />
      <Typography sx={{ color: generation === "4G" ? "blue" : "black" }}
                  onClick={() => changeGenerationHandler("4G")}>4G</Typography>
    </Stack>
  </Paper>
    ;
}

export default GenerationToolbar;