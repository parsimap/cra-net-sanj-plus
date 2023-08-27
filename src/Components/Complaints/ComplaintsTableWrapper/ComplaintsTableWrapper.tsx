import {
  Skeleton,
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
import ChartIcon from "@mui/icons-material/BarChartRounded";


import TitleWithIcon from "../../TitleWithIcon";

import { ICommonComplaintsTableProps } from "../../../interfaces/ICommonComplaintsTableProps";


function ComplaintsTableWrapper({ complaints }: ICommonComplaintsTableProps) {
  return <>
    {complaints.status === "fulfilled" ?
      <>
        <Typography sx={{ p: 0.5 }} component={"div"}>
          <TitleWithIcon
            text={"پرتکرارترین موضوعات شکایت در استان"}
            Icon={ChartIcon}
            textProps={{ sx: { fontSize: "0.9rem", fontWeight: 800 } }}
          />
        </Typography>
        <TableContainer>
          <Table sx={{
            [`.${tableCellClasses.root}`]: { p: 1, fontSize: "0.75rem" },
            [`.${tableHeadClasses.root} .${tableCellClasses.root}`]: { fontWeight: 600 }
          }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">ردیف</TableCell>
                <TableCell align="left">نوع شکایت</TableCell>
                <TableCell align="left">موضوع شکایت</TableCell>
                <TableCell align="left">تعداد</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.data!.map(({
                                       complainSubject,
                                       complainType,
                                       complainTypeId,
                                       countComplaint,
                                       operator,
                                       subjectId
                                     }, index) => {
                return <TableRow
                  key={`${complainTypeId}-${subjectId}-${index >= complaints.data!.length ? index * 2 : index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align={"left"}>{index + 1}</TableCell>
                  <TableCell align={"left"}>{complainType}</TableCell>
                  <TableCell align={"left"}>{complainSubject}</TableCell>
                  <TableCell align={"left"}>{countComplaint}</TableCell>
                </TableRow>;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
      :
      <Skeleton variant={"rounded"} animation={"pulse"} sx={{ height: "234.94px" }} />
    }
  </>;
}

export default ComplaintsTableWrapper;