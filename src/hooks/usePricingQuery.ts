import { useLazyFixedPricingListQuery, useLazyOtherPricingListQuery } from "../features/craHostServiceApiSlice";
import { useEffect, useState } from "react";
import { REGIONAL_CODE_MAP } from "../Components/Pricing/pricing.constants";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useAreaInfoQuery } from "../features/craApiSlice";
import { IUsePricingQueryProps } from "../interfaces/IUsePricingQueryProps";
import { IPricingProps } from "../interfaces/IPricingProps";
import { IPriceListResult } from "../interfaces/IPriceListResult";


const initialPropsState: IPricingProps = {
  cityCode: "-1",
  countyCode: "-1",
  provinceCode: "-1",
  operatorId: -1,
  serviceId: -1
};

const initialResultState: IPriceListResult[] = [{
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

  const [pricingProps, setPricingProps] = useState<IPricingProps>(initialPropsState);


  const appState = useSelector((state: RootState) => state.app);

  const { operator } = appState;
  const { userLocationCoordinates: { lng, lat } } = useSelector((state: RootState) => state.mapView);


  const token = useSelector((state: RootState) => state.auth.token);

  const areaInfo = useAreaInfoQuery({
    lat, lng, zoom: 0, code: 1, apiKey: token
  });


  const [triggerFixedPricing, { data: fixedData, isLoading: isFixedLoading }] = useLazyFixedPricingListQuery();
  const [triggerOtherPricing, { data: otherData, isLoading: isOtherLoading }] = useLazyOtherPricingListQuery();


  const [pricing, setPricing] = useState<IPriceListResult[]>(initialResultState);


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
      setPricingProps(newPricingProps as unknown as IPricingProps);
    }
  }, [areaInfo, operator]);


  return {
    isLoading: serviceType === "mobile" ? isOtherLoading : isFixedLoading,
    data: pricing
  };


};