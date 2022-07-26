import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider} from "react-redux";
import store from "./redux/store";
import {positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplalte from "react-alert-template-basic";
const options = {
  timeout: 5000,
  position: positions.MIDDLE,
  transition: transitions.FADE
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <AlertProvider template={AlertTemplalte} {...options}>
          <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
