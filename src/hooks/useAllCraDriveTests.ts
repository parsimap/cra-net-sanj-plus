import { useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";

import { QueryStatus } from "@reduxjs/toolkit/query";
import { useCraDriveTestQuery } from "../features/craApiSlice";
import { useTokenQueryWrapper } from "./useTokenQueryWrapper";

import { RootState } from "../app/store";

import { OPERATOR_CATALOG } from "../common/constants";
import { ICraDriveTestResult } from "../interfaces/ICraDriveTestResult";

interface IuseAlCraDriveTests {
  negateSignalValues: boolean;
}


const initialValues: IextendedOperatorCoverageReport = {
  status: "",
  status_code: -1,
  city_range: -1,
  has_value: false,
  signal_level: -1,
  signal_value: -1,
  name: ""
};

/**
 * we need the `IextendedOperatorCoverageReport` interface since we may want to modify the `signal_value` property
 */
interface IextendedOperatorCoverageReport extends Omit<ICraDriveTestResult, "signal_value"> {
  signal_value: number;
}


type ToperatorsName = "mci" | "mtn" | "rightell";


/**
 * this function adds a name property to the fetched data for further uses. it also takes the `negateSignalValues` prop into account explained in hook desc
 * @param negateSignalValues indicates whether we must negate the `signal_value` property
 * @param data the original coverage information fetched from server
 * @param name the operator name to be added to the `data` param
 */
function getNewState(negateSignalValues: boolean, data: Omit<ICraDriveTestResult, "name">, name: string) {
  if (negateSignalValues) {
    return {
      ...{ ...data, signal_value: -(+data.signal_value) },
      name
    };
  }
  return { ...data, signal_value: +data.signal_value, name };
}


/**
 * this custom hook is responsible for wrapping the functionality that fetches the result for all operators' coverage report
 * @param negateSignalValues `signal_value` is a negative value and can lead to issues while plotting the data; this parameter sets whether to negate the `signal_value`
 * returns an object with two properties; `isLoading` which indicates whether data is ready to be used or not, `result` which is an array consisting of the coverage reports of different operators
 */
export const useAllCraDriveTests = ({ negateSignalValues }: IuseAlCraDriveTests) => {
  const token = useTokenQueryWrapper();
  const { generation } = useSelector((state: RootState) => state.app);

  /**
   * this state holds the coverage report object for each operator
   */
  const [result, setResult] = useState<{ [_ in ToperatorsName]: IextendedOperatorCoverageReport }>({
    mci: initialValues,
    mtn: initialValues,
    rightell: initialValues
  });

  const {
    userLocationCoordinates: {
      lat, lng
    }
  } = useSelector((state: RootState) => state.app);


  /**
   * finds the operator code of a specific operator. note that operator code depends both on operator and generation(TODO)
   */
  function getOperatorCodes() {
    const operatorIDs: number[] = [];
    const operatorCodes: number[] = [];
    // TODO: generation should be dynamically chosen
    for (const op of OPERATOR_CATALOG)
      if (!operatorIDs.includes(op.operatorId) && op.generation === generation) {
        operatorCodes.push(op.operatorCode);
        operatorIDs.push(op.operatorId);
      }
    return operatorCodes;
  }

  /**
   * should be dependent of genereation(TODO)
   */
  const operatorCodes = useMemo(getOperatorCodes, [generation]);

  const mci = useCraDriveTestQuery({
    lat, lng, apiKey: token, operatorCode: operatorCodes[0]
  });
  const mtn = useCraDriveTestQuery({
    lat, lng, apiKey: token, operatorCode: operatorCodes[1]
  });
  const rightell = useCraDriveTestQuery({
    lat, lng, apiKey: token, operatorCode: operatorCodes[2]
  });


  /**
   * the following effects are responsible for setting the data fetched from network for each operator
   */


  useEffect(() => {
    const data: ICraDriveTestResult | undefined = mci.data;
    if (data) {
      const status = data.status;
      if (status === "SUCCESS") {
        setResult(prevState => ({ ...prevState, mci: getNewState(negateSignalValues, data, "mci") }));
      }
    }
  }, [mci, negateSignalValues]);


  useEffect(() => {
    const data: ICraDriveTestResult | undefined = mtn.data;
    if (data) {
      const status = data.status;
      if (status === "SUCCESS") {
        setResult(prevState => ({ ...prevState, mtn: getNewState(negateSignalValues, data, "mtn") }));
      }
    }
  }, [mtn, negateSignalValues]);

  useEffect(() => {
    const data: ICraDriveTestResult | undefined = rightell.data;
    if (data) {
      const status = data.status;
      if (status === "SUCCESS") {
        setResult(prevState => ({ ...prevState, rightell: getNewState(negateSignalValues, data, "rightell") }));
      }
    }
  }, [negateSignalValues, rightell]);


  return {
    isLoading: mtn.status !== QueryStatus.fulfilled || mci.status !== QueryStatus.fulfilled || rightell.status !== QueryStatus.fulfilled,
    result: [result.mtn, result.mci, result.rightell]
  };

};