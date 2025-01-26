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
import Subjects from "../components/product/Subjects";
import Chapters from "../components/product/Chapters";
import { useEffect, useState } from "react";
import { requestAPI } from "../utils";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { useDispatch, useSelector } from "react-redux";
import { setCatelogue } from "../redux/sliceCatelogue";

export default function App() {
    const dispatch = useDispatch();

    const catelogue = useSelector((state) => state.stateCatelogue.catelogue);

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (!catelogue)
            requestAPI({
                requestPath: "api/catelogue",
                setLoading: setLoading,
                onRequestFailure: setError,
                onResponseReceieved: (catelogue, responseCode) => {
                    if (catelogue && responseCode === 200) {
                        dispatch(setCatelogue(catelogue));
                    }
                },
            });
    }, [catelogue, dispatch]);

    if (loading) return <Loading message="Loading Catelogue..." />;

    if (error) return <NoContent error="Failed To Load Catelogue, Try Again !" />;

    if (catelogue)
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

                        <Route path="/products/:productId" element={<Product />}>
                            <Route index element={<Courses />} />
                            <Route path="courses/:courseId">
                                <Route index element={<Subjects />} />
                                <Route path="subjects/:subjectId" element={<Chapters />} />
                            </Route>
                        </Route>
                        <Route path="/content-player">
                            <Route path="demo/:subjectId" element={<ContentPlayer contentType="subjects" />} />
                            <Route path="chapter/:chapterId" element={<ContentPlayer contentType="chapters" />} />
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

                        <Route path="/forbidden" element={<Forbidden />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ProcessToken>
            </ProviderToast>
        );
}
