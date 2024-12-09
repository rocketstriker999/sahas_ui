/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CustomError from "../pages/CustomError";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Forbidden from "../pages/Forbidden";
import HasAuthentication from "../security/HasAuthentication";
import HasNoAuthentication from "../security/HasNoAuthentication";
import HasRequiredGroup from "../security/HasRequiredGroup";
import Help from "./Help";
import Contact from "./Contact";
import ProcessToken from "../security/ProcessToken";
import NeedDeviceID from "../security/NeedDeviceID";
import { ProviderToast } from "../providers/ProviderToast";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Demo from "../pages/Demo";

export default function App() {
    return (
        <ProviderToast>
            <NeedDeviceID>
                {
                    <ProcessToken>
                        <Routes>
                            <Route index element={<Dashboard />} />
                            <Route
                                path="/profile"
                                element={
                                    <HasAuthentication>
                                        <Profile />
                                    </HasAuthentication>
                                }
                            />
                            <Route
                                path="/help"
                                element={
                                    <HasAuthentication>
                                        <Help />
                                    </HasAuthentication>
                                }
                            />
                            <Route
                                path="/manage-firm"
                                element={
                                    <HasRequiredGroup allowedGroups={["FADMIN", "HADMIN"]}>
                                        <p>Firm Admin Management</p>
                                    </HasRequiredGroup>
                                }
                            />
                            <Route
                                path="/manage-system"
                                element={
                                    <HasRequiredGroup allowedGroups={["HADMIN"]}>
                                        <p>System Admin Management</p>
                                    </HasRequiredGroup>
                                }
                            />
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

                            <Route path="/products">
                                <Route index element={<Products />} />
                                <Route path="category/:category" element={<Products />} />
                                <Route path=":id">
                                    <Route index element={<Product />} />
                                    <Route path="demo" element={<Demo />} />
                                </Route>
                            </Route>

                            <Route
                                path="/my-learning"
                                element={
                                    <HasAuthentication>
                                        <p>My Learning</p>
                                    </HasAuthentication>
                                }
                            ></Route>

                            <Route path="/forbidden" element={<Forbidden />} />
                            <Route path="*" element={<CustomError highlight="OOPS ! We could't Find What You Were Looking For." />} />
                        </Routes>
                    </ProcessToken>
                }
            </NeedDeviceID>
        </ProviderToast>
    );
}
