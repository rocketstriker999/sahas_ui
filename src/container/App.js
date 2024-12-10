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
// import Product from "../pages/Product";

export default function App() {
    return (
        <ProviderToast>
            <ProcessToken>
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="/products" element={<Product />}>
                        <Route path="courses/:productId" element={<Courses />} />
                        <Route path="course/:courseId" element={<Course />} />
                    </Route>
                    <Route path="/content-player/:contentId" element={<ContentPlayer />}></Route>
                    {/* <Route
                        path="/login"
                        element={
                            <HasNoAuthentication>
                                <Login />
                            </HasNoAuthentication>
                        }
                    />
                    
                    <Route path="/forbidden" element={<Forbidden />} />
                    <Route path="*" element={<CustomError highlight="OOPS ! We could't Find What You Were Looking For." />} /> */}
                </Routes>
            </ProcessToken>
        </ProviderToast>
    );
}
