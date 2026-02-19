import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./container/App";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";

import { Provider } from "react-redux";
import state from "./redux/state";
import { ProviderAppContainer } from "./providers/ProviderAppContainer";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <PrimeReactProvider value={{ ripple: true, appendTo: "self" }}>
            <Provider store={state}>
                <div className="max-w-full lg:w-8 lg:mx-auto h-screen bg-white overflow-hidden">
                    <BrowserRouter>
                        <ProviderAppContainer>
                            <App />
                        </ProviderAppContainer>
                    </BrowserRouter>
                </div>
            </Provider>
        </PrimeReactProvider>
    </React.StrictMode>,
);
