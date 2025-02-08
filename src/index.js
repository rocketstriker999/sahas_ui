import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./container/App";
import reportWebVitals from "./reportWebVitals";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import { Provider } from "react-redux";
import state from "./redux/state";
import { ProviderAppContainer } from "./providers/ProviderAppContainer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <PrimeReactProvider value={{ ripple: true, appendTo: "self" }}>
            <Provider store={state}>
                <ProviderAppContainer>
                    <App />
                </ProviderAppContainer>
            </Provider>
        </PrimeReactProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
