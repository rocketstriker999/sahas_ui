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
import { useEffect, useState } from "react";
import { requestAPI } from "../utils";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ProviderToast } from "../providers/ProviderToast";
import { setTemplate } from "../redux/sliceTemplate";
import ProcessToken from "../security/ProcessToken";

export default function App() {
    const dispatch = useDispatch();
    const template = useSelector((state) => state.stateTemplate);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: "configs/template",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (appConfig, responseCode) => {
                if (appConfig && responseCode === 200) {
                    dispatch(setTemplate(appConfig));
                }
            },
        });
    }, [dispatch]);

    return (
        <div className="max-w-full lg:max-w-30rem lg:mx-auto lg:border-1 lg:my-2">
            {loading && <Loading message="Loading App Configuration..." />}

            {error && <NoContent error="Failed To App Configuration, Try Again !" />}

            {!loading && template && (
                <ProcessToken>
                    <ProviderToast>
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

                                <Route path="/forbidden" element={<Forbidden />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </ProviderToast>
                </ProcessToken>
            )}
        </div>
    );
}
