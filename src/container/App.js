import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import RequiresTemplateConfiguration from "../components/dependencies/RequiresTemplateConfiguration";
import RequiresProductsCatelogue from "../components/dependencies/RequiresProductsCatelogue";
import Courses from "../pages/Courses";
import Forbidden from "../pages/Forbidden";
import HasRequiredAuthority from "../components/dependencies/HasRequiredAuthority";
import Logout from "../pages/Logout";
import HasAuthentication from "../components/dependencies/HasAuthentication";

export default function App() {
    const navigate = useNavigate();

    return (
        <HasAuthentication>
            <HasRequiredAuthority requiredAuthority="ACCESS_CONTAINER_APP" fallBack={() => <Forbidden />}>
                <RequiresTemplateConfiguration>
                    <RequiresProductsCatelogue>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <HasRequiredAuthority fallBack={() => navigate("/forbidden")} requiredAuthority="ACCESS_PAGE_DASHBOARD">
                                        <Dashboard />
                                    </HasRequiredAuthority>
                                }
                            />
                            <Route
                                path="/courses"
                                element={
                                    <HasRequiredAuthority fallBack={() => navigate("/forbidden")} requiredAuthority="ACCESS_PAGE_COURSES">
                                        <Courses />
                                    </HasRequiredAuthority>
                                }
                            />

                            <Route path="/logout" element={<Logout />} />
                            <Route path="/forbidden" element={<Forbidden />} />
                            <Route path="*" element={<p>Not Found</p>} />
                        </Routes>
                    </RequiresProductsCatelogue>
                </RequiresTemplateConfiguration>
            </HasRequiredAuthority>
        </HasAuthentication>
    );
}

//ACCESS_CONTAINER_CONTAINERNAME
//ACCESS_PAGE_PAGENAME
//READ_FEATURE_CAROUSEL
//WRITE_FEATURE
//DELETE_FEATURE
//UPDATE_FEATURE
