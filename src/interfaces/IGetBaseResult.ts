interface IProvince {
  Id: string;
  ProvinceName: string;
  TotalCalcHome: number;
}

export interface IOperator {
  Id: string;
  OperatorName: string;
  BrandName: string;
  CRMLink: string;
}

// noinspection SpellCheckingInspection
interface ITechnology {
  id: number;
  title: string;
  Paletts: any;
}

interface IYearMonth {
  Year: number;
  Month: number[];
}

export interface IIndicatorPalette {
  Name: string;
  Palette: any;
}

export interface IGetBaseResultObject {
  Provinces: IProvince[];
  Operators: IOperator[];
  YearMonth: IYearMonth[];
  Technologies: ITechnology[];
  PassivePalette: IIndicatorPalette;
  ClientsPalette: IIndicatorPalette;
  CoveragesPalette: IIndicatorPalette;
}

export default interface IGetBaseResult {
  ResultObject: IGetBaseResultObject
  Result_ErrorMessage: string
  Result_HasError: boolean
  StatusCode: number
  TransactionDate: string,
  TransactionId: string,
  ErrorCode: string
}