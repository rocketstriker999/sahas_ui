import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
// import CustomError from "../pages/CustomError";
// import Forbidden from "../pages/Forbidden";
// import HasNoAuthentication from "../security/HasAuthentication";
import Product from "../pages/Product";
import Courses from "../components/product/Courses";
import MediaPlayer from "../pages/MediaPlayer";
import AllProducts from "../components/dashboard/AllProducts";
import MyProducts from "../components/dashboard/MyProducts";
import HasAuthentication from "../security/HasAuthentication";
import HasNoAuthentication from "../security/HasNoAuthentication";
import FormLogin from "../components/login/FormLogin";
import Forbidden from "../pages/Forbidden";
import NotFound from "../pages/NotFound";
import Purchase from "../pages/Purchase";
import HasPrimaryDetails from "../security/HasPrimaryDetails";
import Subjects from "../components/product/Subjects";
import Chapters from "../components/product/Chapters";
import { BrowserRouter } from "react-router-dom";
import ProcessToken from "../security/ProcessToken";
import AdminUserProductAccess from "../components/temp_admin/AdminUserProductAccess";
import AdmissionForm from "../components/temp_admin/AdmissionForm";

export default function App() {
    return (
        <ProcessToken>
            <BrowserRouter>
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

                    <Route path="/products/:productId" element={<Product />}>
                        <Route index element={<Courses />} />
                        <Route path="courses/:courseId">
                            <Route index element={<Subjects />} />
                            <Route path="subjects/:subjectId" element={<Chapters />} />
                        </Route>
                    </Route>
                    <Route path="/media-player/:selector/:id" element={<MediaPlayer />} />

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
                    <Route path="/adminUserProductAccess" element={<AdminUserProductAccess />} />
                    <Route path="/admissionForm" element={<AdmissionForm />} />               
                    <Route path="/forbidden" element={<Forbidden />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ProcessToken>
    );
}
