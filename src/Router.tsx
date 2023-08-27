import { createBrowserRouter } from "react-router-dom";
import AppWrapper from "./Components/AppWrapper";

export const Router = createBrowserRouter([
  {
    path: "/home/:tab/:operatorId/:serviceId",
    element: <AppWrapper />,
  },
  {
    path: "/edit/:operatorId/:serviceId",
    element: <AppWrapper />
  },
  {
    path: "*",
    element: <AppWrapper />
  }
]);
