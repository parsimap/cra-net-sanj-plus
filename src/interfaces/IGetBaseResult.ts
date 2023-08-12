import IApiStatus from "./IApiStatus";

interface IProvince {
  Id: string;
  ProvinceName: string;
  TotalCalcHome: number;
}

interface IOperator {
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

interface IResult {
  Provinces: IProvince[];
  Operators: IOperator[];
  YearMonth: IYearMonth[];
  Technologies: ITechnology[];
  PassivePalette: IIndicatorPalette;
  ClientsPalette: IIndicatorPalette;
  CoveragesPalette: IIndicatorPalette;
}

export default interface IGetBaseResult extends IApiStatus<IResult> {
}
