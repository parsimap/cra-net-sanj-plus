import ThemeWrapper from "./Components/RTLprovider/ThemeWrapper";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";

function App() {
  return (
    <>
      <ThemeWrapper>
        <Provider store={store}>
          <RouterProvider router={Router} />
        </Provider>
      </ThemeWrapper>
    </>
  );
}

export default App;
