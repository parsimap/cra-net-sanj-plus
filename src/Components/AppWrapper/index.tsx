import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { useSetPrerequisites } from "../../hooks/useSetPrerequisites";

import { currentTabChanged, generationChanged, userOperatorChanged, userServiceChanged } from "../../features/appSlice";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

import MapView from "../MapView";
import VerifyUserInfo from "../VerifyUserInfo";
import LoadingSpinner from "../LoadingSpinner";

import { TTab } from "../../types/TTab";

function AppWrapper() {

  useSetPrerequisites();

  const { metadata } = useSelector((state: RootState) => state.app);

  const { search } = useLocation();
  const params = useParams();
  const dispatch = useAppDispatch();

  const [dist, setDist] = useState<string>("");

  useEffect(() => {

    /**
     * returns an object containing the users' service info
     * @param serviceId service id of user
     */
    function getCurrentService(serviceId: number) {
      return metadata!.services.find(service => serviceId === service.id)!;
    }

    /**
     * returns an object containing the users' operator info
     * @param operatorId operator id of user
     */
    function getCurrentOperator(operatorId: number) {
      return metadata!.operators.find(operator => operator.id === operatorId)!;
    }

    /**
     * returns the initial values for tab from path params
     */
    function getCurrentTab(serviceType: string): TTab {
      const tab = params.tab;
      console.log(serviceType, tab);
      // we should set a default tab to go to in case of information insufficiency, information conflict or lack of information. so we navigate to `Quality tab` when tab param is not present, is not valid or does not match with the service type
      if (!tab || !["quality", "coverage", "complaints", "pricing"].includes(tab) || (serviceType !== "mobile" && tab === "coverage")) return "Quality";

      return (tab[0].toUpperCase() + tab.slice(1)) as TTab;
    }

    /**
     * checks the validity of path params. service id and operator id should match
     */
    function checkParams() {
      return metadata!.operators.some(operator => operator.id === +operatorID! && operator.serviceId === +serviceID!);
    }

    /**
     * dispatches the user's info
     */
    function setUserInfo() {
      const currentService = getCurrentService(+serviceID!);
      const currentOperator = getCurrentOperator(+operatorID!);
      const currentTab = getCurrentTab(currentService.type);
      const currentGeneration = currentService?.type === "mobile" ? "4G" : undefined;


      dispatch(userServiceChanged(currentService));
      dispatch(userOperatorChanged(currentOperator));
      dispatch(generationChanged(currentGeneration));
      dispatch(currentTabChanged(currentTab));
    }

    /**
     * determines which component to show based on state of store and path params
     */
    function getCurrentState() {
      if (!serviceID || !operatorID) {
        return "userinfo";
      }

      const areParamsValid = checkParams();

      if (!areParamsValid) {
        return "userinfo";
      } else {
        setUserInfo();
        return "home";
      }

    }

    if (!metadata) return;

    const serviceID = params.serviceId;
    const operatorID = params.operatorId;

    const newDist = getCurrentState();

    setDist(newDist);

  }, [search, metadata, dispatch, params]);


  switch (dist) {
    case "home":
      return <MapView />;
    case "userinfo":
      return <VerifyUserInfo />;
    default:
      return <LoadingSpinner open={true} />;
  }
}

export default AppWrapper;