import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../app/store";

import { PRICING_TABLE_COLUMN_MAP } from "./pricing.constants";

import { usePricingQuery } from "../../hooks/usePricingQuery";

import { IOptionedColumns } from "../../interfaces/IOptionedColumns";
import { IPricingTable } from "../../interfaces/IPricingTable";

import { getSortFunction } from "./pricing.util";

import PricingTable from "./PricingTable/PricingTable";


function Pricing() {
  const { service } = useSelector((state: RootState) => state.app);

  /**
   * this state holds a table-friendly version of the `pricing` object fetched from network
   */
  const [dataTableInfo, setDataTableInfo] = useState<IPricingTable>({ tableColumns: [], tableRows: [] });
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


  return <PricingTable dataTableInfo={dataTableInfo} />;
}

export default Pricing;