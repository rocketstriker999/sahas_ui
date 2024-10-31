import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './components/containers/App';
import { Provider } from 'react-redux'
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import state from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <PrimeReactProvider value={{ ripple: true, appendTo: 'self', }}>
        <Provider store={state}>
          <App />
        </Provider>
      </PrimeReactProvider>
    </BrowserRouter>
);

reportWebVitals();