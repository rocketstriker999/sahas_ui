/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CustomError from "../pages/CustomError";
import Login from "../pages/Login";
import Forbidden from "../pages/Forbidden";
import HasNoAuthentication from "../components/security/HasNoAuthentication";
import Contact from "./Contact";
import ProcessToken from "../components/security/ProcessToken";
import { ProviderToast } from "../components/providers/ProviderToast";
import Product from "../pages/Product";

export default function App() {
    return (
        <ProviderToast>
            <ProcessToken>
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route
                        path="/login"
                        element={
                            <HasNoAuthentication>
                                <Login />
                            </HasNoAuthentication>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <HasNoAuthentication>
                                <Contact />
                            </HasNoAuthentication>
                        }
                    />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/forbidden" element={<Forbidden />} />
                    <Route path="*" element={<CustomError highlight="OOPS ! We could't Find What You Were Looking For." />} />
                </Routes>
            </ProcessToken>
        </ProviderToast>
    );
}
