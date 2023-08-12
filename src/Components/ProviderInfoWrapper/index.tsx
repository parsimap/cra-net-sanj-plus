import { lazy, Suspense } from "react";

import Skeleton from "../Skeleton";

import { IProviderInfoWrapperProps } from "../../interfaces/IProviderInfoWrapperProps";


const Coverage = lazy(() => import("../Coverage"));
const Quality = lazy(() => import("../Quality"));
const Pricing = lazy(() => import("../Pricing"));
const Complaints = lazy(() => import("../Complaints"));


function ProviderInfoWrapper({ state }: IProviderInfoWrapperProps) {
  function getCurrentComponent() {
    switch (state) {
      case "Complaints":
        return <Complaints />;
      case "Coverage":
        return <Coverage />;
      case "Pricing":
        return <Pricing />;
      case "Quality":
        return <Quality />;
    }
  }

  return <>

    <Suspense fallback={<Skeleton />}>
      {getCurrentComponent()}
    </Suspense>


  </>;
}

export default ProviderInfoWrapper;