import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { PRICING_TABLE_COLUMN_MAP } from "./pricing.constants";
import { Paper, Skeleton, tableHeadClasses } from "@mui/material";
import TitleWithIcon from "../TitleWithIcon";
import Calendar from "@mui/icons-material/CalendarViewMonthRounded";
import MUIDataTable from "mui-datatables";
import { usePricingQuery } from "../../hooks/usePricingQuery";

import { TSortCompare } from "../../types/TSortCompare";
import { IOptionedColumns } from "../../interfaces/IOptionedColumns";


function Pricing() {


  const { service } = useSelector((state: RootState) => state.app);

  const { isLoading, data: pricing } = usePricingQuery({ serviceType: service!.type as any });


  const [dataTableInfo, setDataTableInfo] = useState<{
    tableColumns: IOptionedColumns[],
    tableRows: string[][]
  }>({ tableColumns: [], tableRows: [] });


  useEffect(() => {
    function getTableColumns() {

      function getTableColumnsRawText() {
        if (!isLoading && Array.isArray(pricing) && pricing.length !== 0) {
          return Object.keys(pricing[0]).filter(item => PRICING_TABLE_COLUMN_MAP[item] !== "").map(item => PRICING_TABLE_COLUMN_MAP[item]);
        }
        return [];
      }


      function addSortOptionToRawColumns() {
        function regularSort(order: Parameters<TSortCompare>[0]): ReturnType<TSortCompare> {
          return (obj1, obj2) => {
            const [v1, v2] = [obj1.data ? +obj1.data.split(" ")[0] : 0, obj2.data ? +obj2.data.split(" ")[0] : 0];
            return (v1 - v2) * (order === "asc" ? 1 : -1);
          };
        }

        function priceSort(order: Parameters<TSortCompare>[0]): ReturnType<TSortCompare> {
          return (obj1, obj2) => {
            const [v1, v2] = [obj1.data ? +obj1.data.split(" ")[0].replace(/,/g, "") : 0, obj2.data ? +obj2.data.split(" ")[0].replace(/,/g, "") : 0];
            return (v1 - v2) * (order === "asc" ? 1 : -1);
          };
        }

        function convertAndSort(order: Parameters<TSortCompare>[0]): ReturnType<TSortCompare> {
          function convertor(unit: "(Mbps)" | "(Kbps)", value: string) {
            const coe = unit === "(Mbps)" ? 1 : 0.001;
            return coe * +value;
          }

          return (obj1, obj2) => {
            const [splitValue1, splitValue2] = [obj1.data ? obj1.data.split(" ") : ["(Mbps)", "0"], obj2.data ? obj2.data.split(" ") : ["(Mbps)", "0"]];
            const [v1, v2] = [splitValue1[0], splitValue2[0]];
            const [u1, u2] = [splitValue1[1], splitValue2[1]];
            const [converted1, converted2] = [convertor(u1, v1), convertor(u2, v2)];
            return (converted1 - converted2) * (order === "asc" ? 1 : -1);
          };
        }


        function getSortFunction(columnName: string) {
          switch (columnName) {
            case PRICING_TABLE_COLUMN_MAP["limitPack"]:
            case PRICING_TABLE_COLUMN_MAP["hajm"]:
              return regularSort;
            case PRICING_TABLE_COLUMN_MAP["tariff"]:
              return priceSort;
            case PRICING_TABLE_COLUMN_MAP["nerkhbit"]:
              return convertAndSort;
            default:
              return undefined;
          }
        }


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
    {dataTableInfo.tableRows.length !== 0 && dataTableInfo.tableColumns.length !== 0 ? <Paper elevation={4} sx={{
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