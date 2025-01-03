/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
// import CustomError from "../pages/CustomError";
// import Login from "../pages/Login";
// import Forbidden from "../pages/Forbidden";
// import HasNoAuthentication from "../security/HasAuthentication";
import ProcessToken from "../security/ProcessToken";
import { ProviderToast } from "../providers/ProviderToast";
import Product from "../pages/Product";
import Courses from "../components/product/Courses";
import Course from "../components/product/Course";
import ContentPlayer from "../pages/ContentPlayer";
import AllProducts from "../components/dashboard/AllProducts";
import MyProducts from "../components/dashboard/MyProducts";
import HasAuthentication from "../security/HasAuthentication";
import HasNoAuthentication from "../security/HasNoAuthentication";
import FormLogin from "../components/login/FormLogin";
import Forbidden from "../pages/Forbidden";
import NotFound from "../pages/NotFound";
import Purchase from "../pages/Purchase";
import HasPrimaryDetails from "../security/HasPrimaryDetails";

export default function App() {
    return (
        <ProviderToast>
            <ProcessToken>
                <Routes>
                    <Route path="/" element={<Dashboard />}>
                        <Route index element={<AllProducts />} />

                        <Route
                            path="my-products"
                            element={
                                <HasAuthentication>
                                    <MyProducts />
                                </HasAuthentication>
                            }
                        />
                        <Route
                            path="login"
                            element={
                                <HasNoAuthentication>
                                    <FormLogin />
                                </HasNoAuthentication>
                            }
                        />
                    </Route>
                    <Route
                        path="/purchase/:productId"
                        element={
                            <HasAuthentication>
                                <HasPrimaryDetails>
                                    <Purchase />
                                </HasPrimaryDetails>
                            </HasAuthentication>
                        }
                    />
                    <Route path="/products" element={<Product />}>
                        <Route path=":productId/courses" element={<Courses />} />
                        <Route path=":productId/courses/:courseId" element={<Course />} />
                    </Route>
                    <Route path="/content-player">
                        <Route path="demo/:contentId" element={<ContentPlayer contentType="public" />} />
                        <Route path="chapter/:contentId" element={<ContentPlayer contentType="private" />} />
                    </Route>

                    <Route path="/forbidden" element={<Forbidden />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ProcessToken>
        </ProviderToast>
    );
}
