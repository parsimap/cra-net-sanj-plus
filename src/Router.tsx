import { createBrowserRouter } from "react-router-dom";
import VerifyUserInfo from "./Components/VerifyUserInfo";
import MapView from "./Components/MapView";

export const Router = createBrowserRouter([
  {
    path: "/userinfo",
    element: <VerifyUserInfo />
  },
  {
    path: "/home",
    element: <MapView />,
    children: [{ path: "/home/edit", element: <MapView /> }]
  },
  {
    path: "*",
    element: <VerifyUserInfo />
  }
]);
