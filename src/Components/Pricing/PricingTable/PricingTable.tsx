import { Paper, Skeleton, tableHeadClasses } from "@mui/material";
import Calendar from "@mui/icons-material/CalendarViewMonthRounded";
import MUIDataTable from "mui-datatables";

import TitleWithIcon from "../../TitleWithIcon";

import { IPricingTableProps } from "../../../interfaces/IPricingTableProps";

function PricingTable({ dataTableInfo }: IPricingTableProps) {
  return <>
    {dataTableInfo.tableRows.length !== 0 && dataTableInfo.tableColumns.length !== 0 ?
      <Paper elevation={4} sx={{
        p: 1,
        [`.${tableHeadClasses.root}`]: { fontSize: "0.5rem" },
        "& td, & th": {
          padding: "0.5rem 0 !important",
          fontSize: "11px",
          textAlign: "center !important"
        }
      }}>
        <TitleWithIcon text={" تعرفه اینترنت"} Icon={Calendar} spacing={0.5} />
        <MUIDataTable
          title={""}
          data={dataTableInfo.tableRows}
          columns={dataTableInfo.tableColumns}
          components={{
            TableToolbar: () => <></> // hides the toolbar container
          }}
          options={{
            customFooter: () => <></>, // hides the pagination footer
            customToolbar: () => <></>, // hides the ?
            elevation: 0,
            pagination: false,
            print: false, // hides a toolbar item
            download: false, // hides a toolbar item
            search: false, // hides a toolbar item
            filter: false, // hides a toolbar item
            viewColumns: false, // hides a toolbar item
            selectableRowsHideCheckboxes: true, // hides rows checkboxes,
            responsive: "standard"
          }}
        />

      </Paper> : <Skeleton variant={"rounded"} height={1000} animation={"pulse"} />
    }</>;
}

export default PricingTable;