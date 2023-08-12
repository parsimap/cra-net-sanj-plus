import { Fragment } from "react";

import {
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  tableHeadClasses,
  TableRow,
  Typography
} from "@mui/material";
import Calender from "@mui/icons-material/EventAvailableRounded";


import { IGroupQualityTableProps } from "../../interfaces/IGroupQualityTableProps";
import { STATUS_CATEGORY_MAP, STATUS_MAP } from "./quality.constants";
import { TQualityStatusMapKeys } from "../../types/TQualityStatusMapKeys";
import { TQualityStatusCategoryMapKeys } from "../../types/TQualityStatusCategoryMapKeys";

import TitleWithIcon from "../TitleWithIcon";


function GroupQualityTable({ operatorStatus, reportTime }: IGroupQualityTableProps) {
  return <>
    {operatorStatus.status === "fulfilled" ? <TableContainer component={Paper} elevation={4}>
        <Table sx={{
          [`.${tableCellClasses.root}`]: { p: 1 },
          [`.${tableHeadClasses.root} .${tableCellClasses.root}`]: { fontWeight: 400 }
        }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <TitleWithIcon text={"بازه زمانی اطلاعات"} Icon={Calender} spacing={0.5}
                               textProps={{ sx: { fontSize: "0.9rem", fontWeight: 800 } }} />
              </TableCell>
              <TableCell align="left">{reportTime}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {operatorStatus.data.map(item => {
              const rows = Object.entries(item).filter(tuple => tuple[0].endsWith("rank"));
              return <Fragment key={`${item.operatorId} ${item.serviceName}`}>
                {
                  rows.map(([key, value], index) => {
                    const { Icon, color, infoText } = STATUS_MAP[value as TQualityStatusMapKeys];
                    const { Icon: TableCellIcon, text } = STATUS_CATEGORY_MAP[key as TQualityStatusCategoryMapKeys];
                    return <TableRow
                      key={`${key} ${item.operatorId}-${item.serviceId}-${rows.length ? index * 2 : index}`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ fontWeight: 400 }} align="left">
                        <TitleWithIcon Icon={TableCellIcon} spacing={0.5} text={text}
                                       textProps={{ sx: { fontSize: "0.85rem" } }} />
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={0.5}>
                          <Typography>
                            {Icon !== undefined ? <Icon sx={{ color: `${color}`, fontSize: "1.2rem" }} /> : ""}
                          </Typography>
                          <Typography sx={{ fontWeight: 300, fontSize: "0.8rem" }}>
                            {infoText}
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>;
                  })
                }
              </Fragment>;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      :
      <Skeleton variant={"rounded"} animation={"pulse"} sx={{ height: 300 }} />
    }
  </>
    ;
}

export default GroupQualityTable;