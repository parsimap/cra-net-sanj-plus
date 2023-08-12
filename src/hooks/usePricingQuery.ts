import { useLazyFixedPricingListQuery, useLazyOtherPricingListQuery } from "../features/craHostServiceApiSlice";
import { useEffect, useState } from "react";
import { REGIONAL_CODE_MAP } from "../Components/Pricing/pricing.constants";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useTokenQueryWrapper } from "./useTokenQueryWrapper";
import { useAreaInfoQuery } from "../features/craApiSlice";

type TServiceType = "fixed" | "mobile";

interface IUsePricingQueryProps {
  serviceType: TServiceType;
}

type TpricingProps = {
  serviceId: number,
  operatorId: number,
  provinceCode: string,
  countyCode: string,
  cityCode: string
}


type Tresult = {
  "tariffName": string,
  "planType": string,
  "geoLimit": string,
  "serviceName": string,
  "tariff": string,
  "nerkhbit": string,
  "hajm": string,
  "limitPack": string,
  "validationLink": string,
  simCart: string
}[]

const initialPropsState = {
  cityCode: "-1",
  countyCode: "-1",
  provinceCode: "-1",
  operatorId: -1,
  serviceId: -1
};

const initialResultState: Tresult = [{
  tariffName: "",
  planType: "",
  geoLimit: "",
  serviceName: "",
  tariff: "",
  nerkhbit: "",
  hajm: "",
  limitPack: "",
  validationLink: "",
  simCart: ""
}];

export const usePricingQuery = ({ serviceType }: IUsePricingQueryProps) => {

  const [pricingProps, setPricingProps] = useState<TpricingProps>(initialPropsState);


  const appState = useSelector((state: RootState) => state.app);

  const { userLocationCoordinates: { lng, lat }, operator } = appState;

  const token = useTokenQueryWrapper();

  const areaInfo = useAreaInfoQuery({
    lat, lng, zoom: 0, code: 1, apiKey: token
  });


  const [triggerFixedPricing, { data: fixedData, isLoading: isFixedLoading }] = useLazyFixedPricingListQuery();
  const [triggerOtherPricing, { data: otherData, isLoading: isOtherLoading }] = useLazyOtherPricingListQuery();


  const [pricing, setPricing] = useState<Tresult>(initialResultState);


  useEffect(() => {
    if (serviceType === "mobile") {
      triggerOtherPricing(pricingProps);
      if (!isOtherLoading) {
        setPricing(otherData!);
      }
    } else {
      triggerFixedPricing(pricingProps);
      if (!isFixedLoading) {
        setPricing(fixedData!);
      }
    }
  }, [fixedData, otherData, pricingProps, serviceType, triggerFixedPricing, triggerOtherPricing]);


  useEffect(() => {
    if (areaInfo.data && areaInfo.data.result) {
      const newPricingProps: { [index: string]: string | number } = {
        serviceId: operator!.serviceId,
        operatorId: operator!.id
      };
      const data = areaInfo.data.result;
      for (const item of data) {
        const code = item.type;
        const region = REGIONAL_CODE_MAP[code];
        if (region) {
          newPricingProps[region] = item.code;
        }
      }
      setPricingProps(newPricingProps as TpricingProps);
    }
  }, [areaInfo, operator]);


  return {
    isLoading: serviceType === "mobile" ? isOtherLoading : isFixedLoading,
    data: pricing
  };


};