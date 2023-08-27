import { ComponentType, lazy, Suspense, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import {
  Box,
  Button,
  buttonBaseClasses,
  buttonClasses,
  CircularProgress,
  Divider,
  Skeleton,
  Stack,
  Tab,
  tabClasses,
  Tabs,
  tabsClasses,
  Typography,
  typographyClasses
} from "@mui/material";
import Feedback from "@mui/icons-material/FeedbackRounded";
import EditIcon from "@mui/icons-material/Edit";

import { IDrawerProps } from "../../interfaces/IDrawerProps";

import ProviderInfoWrapper from "../ProviderInfoWrapper";

import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { currentTabChanged, editModeChanged } from "../../features/appSlice";
import { useGetBaseDataQuery } from "../../features/fttxApiSlice";
import { useParams } from "react-router-dom";
import { TTab } from "../../types/TTab";

const FeedbackComponent = lazy(() => import("../Feedback"));
const Dialog = lazy(() => import("@mui/material/Dialog")) as ComponentType<any>;

function MainContent({
                       tabs,
                       operator,
                       service,
                       areaInfo,
                       navigate
                     }: IDrawerProps) {
  /**
   * holds the state of feedback dialog
   */
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { currentTab } = useSelector((state: RootState) => state.app);
  const { fttxToken } = useSelector((state: RootState) => state.auth);
  const operatorInfo = useGetBaseDataQuery(fttxToken);
  const operatorBrandName = useMemo(getOperatorShortName, [operatorInfo, operator]);
  const params = useParams();

  /**
   * uses the operator info object to find the short name(brand name) of the current operator
   */
  function getOperatorShortName() {
    const data = operatorInfo.data;
    if (!data) return;
    return data.ResultObject.Operators.find(op => +op.Id === (operator?.id ?? -1))?.BrandName;
  }

  /**
   * changes mode in both path and store to `edit`
   */
  function editHandler() {
    dispatch(editModeChanged(true));
    navigate(`/edit/${params.operatorId}/${params.serviceId}`);
  }

  /**
   * changes the current tab both in store and path
   * @param value the new tab's name
   */
  function tabChangeHandler(value: string) {
    navigate(`/home/${value.toLowerCase()}/${operator!.id}/${operator!.serviceId}`);
    dispatch(currentTabChanged(value as TTab));
  }


  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          mb: 2,
          [`.${buttonClasses.root}`]: { fontSize: "0.8rem", fontWeight: 400 }
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          spacing={1}
          sx={{
            borderRadius: "1rem",
            p: 0.5,
            background: "rgba(109,189,113,.8784313725)",
            color: "#fff",
            [`.${typographyClasses.root}`]: { fontSize: "0.7rem" }
          }}
        >
          <Typography>{service ? service.name : ""}</Typography>
          <Divider
            variant={"middle"}
            orientation={"vertical"}
            flexItem={true}
            color={"#fff"}
          />
          <Typography>{operatorBrandName ?? ""}</Typography>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          spacing={1}
          sx={{
            [`.${typographyClasses.root}`]: { fontSize: "0.75rem" }
          }}
        >
          <Button variant={"contained"} color={"warning"} size={"small"} onClick={() => setFeedbackDialogOpen(true)}>
            <Feedback sx={{ fontSize: "0.8rem", mr: 0.5 }} />
            <Typography>بازخورد</Typography>
          </Button>
          <Button
            variant={"contained"}
            color={"info"}
            size={"small"}
            onClick={editHandler}
          >
            <EditIcon sx={{ fontSize: "0.8rem", mr: 0.5 }} />
            <Typography>ویرایش</Typography>
          </Button>
        </Stack>
      </Stack>
      <Typography
        sx={{
          fontSize: "0.95rem",
          borderLeft:
            areaInfo.data && areaInfo.data.limitedFullAddress
              ? "2px solid black"
              : "",
          p: 1,
          mb: 2
        }}
      >
        {areaInfo.data && areaInfo.data.limitedFullAddress !== "" ? (
          areaInfo.data.limitedFullAddress
        ) : (
          <Skeleton variant={"text"} animation={"pulse"} />
        )}
      </Typography>
      <Box
        sx={{
          [`.${tabsClasses.indicator}`]: { backgroundColor: "#43a047" },
          [`.${tabClasses.textColorInherit}`]: { color: "#43a047" },
          [`.${buttonBaseClasses.root}`]: { p: "12px" },
          [`.${tabClasses.selected} .${typographyClasses.root}`]: {
            fontWeight: 800,
            fontSize: "0.9rem",
            transition: "0.3s"
          }
        }}
      >
        <Tabs
          variant={"fullWidth"}
          textColor="inherit"
          indicatorColor="primary"
          value={currentTab}
          onChange={(_, v) => tabChangeHandler(v)}
          sx={{
            mb: 2
          }}
        >
          {tabs.map(({ name, value, id, Icon }) => {
            return (
              <Tab
                key={id}
                value={value}
                label={
                  <>
                    <Icon />
                    <Typography sx={{ fontSize: "0.8rem" }}>{name}</Typography>
                  </>
                }
              />
            );
          })}
        </Tabs>
        <ProviderInfoWrapper state={currentTab} />
      </Box>

      <Suspense fallback={<CircularProgress />}>
        <Dialog open={feedbackDialogOpen} onClose={() => setFeedbackDialogOpen(false)}>
          <FeedbackComponent setFeedbackDialogOpen={setFeedbackDialogOpen} />
        </Dialog>
      </Suspense>
    </>
  );
}

export default MainContent;
