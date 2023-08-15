import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../app/store";

import { PRICING_TABLE_COLUMN_MAP } from "./pricing.constants";

import { Paper, Skeleton, tableHeadClasses } from "@mui/material";
import Calendar from "@mui/icons-material/CalendarViewMonthRounded";
import MUIDataTable from "mui-datatables";

import { usePricingQuery } from "../../hooks/usePricingQuery";

import TitleWithIcon from "../TitleWithIcon";

import { IOptionedColumns } from "../../interfaces/IOptionedColumns";

import { getSortFunction } from "./pricing.util";


function Pricing() {
  const { service } = useSelector((state: RootState) => state.app);

  /**
   * this state holds a table-friendly version of the `pricing` object fetched from network
   */
  const [dataTableInfo, setDataTableInfo] = useState<{
    tableColumns: IOptionedColumns[],
    tableRows: string[][]
  }>({ tableColumns: [], tableRows: [] });
  const { isLoading, data: pricing } = usePricingQuery({ serviceType: service!.type as any });


  /**
   * this effect prepares the `pricing` object to be visualized by the table
   */
  useEffect(() => {
    function getTableColumns() {
      function getTableColumnsRawText() {
        if (!isLoading && Array.isArray(pricing) && pricing.length !== 0) {
          return Object.keys(pricing[0]).filter(item => PRICING_TABLE_COLUMN_MAP[item] !== "").map(item => PRICING_TABLE_COLUMN_MAP[item]);
        }
        return [];
      }

      function addSortOptionToRawColumns() {
        return rawData.map(item => {
          const itemWithOption: IOptionedColumns = { name: item, options: {} };
          itemWithOption.options.sortCompare = getSortFunction(item);
          return itemWithOption;
        });
      }

      const rawData = getTableColumnsRawText();

      return addSortOptionToRawColumns();
    }


    function getTableRows() {
      if (!isLoading && Array.isArray(pricing) && pricing.length !== 0) {
        return pricing.map(({ serviceName, validationLink, simCart, ...rest }) => Object.values(rest));
      }
      return [];
    }


    const tableColumns = getTableColumns();
    const tableRows = getTableRows();

    setDataTableInfo({
      tableColumns, tableRows
    });

  }, [pricing, isLoading]);


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

      </Paper> : <Skeleton variant={"rounded"} height={500} animation={"pulse"} />
    }
  </>;
}

export default Pricing;