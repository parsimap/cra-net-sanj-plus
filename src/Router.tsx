import { createBrowserRouter } from "react-router-dom";
import VerifyUserInfo from "./Components/VerifyUserInfo";
import Redirect from "./Components/Redirect";
import MapView from "./Components/MapView";

export const Router = createBrowserRouter([
  {
    path: "/userinfo",
    element: <VerifyUserInfo />
  },
  {
    path: "/home",
    element: <MapView />,
  },
  {
    path: "*",
    element: <Redirect path={"/userinfo"} />
  }
]);
