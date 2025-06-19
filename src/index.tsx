import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/store";

import { App } from "./components/App/App";

import "./styles/_style.scss";
import { TaddyProvider } from "./context/TaddyContext";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store()}>
    <TaddyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TaddyProvider>
  </Provider>
);
