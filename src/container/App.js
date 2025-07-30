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
            <HasRequiredAuthority requiredAuthority="USE_CONTAINER_APP" fallBack={() => <Forbidden />}>
                <RequiresTemplateConfiguration>
                    <RequiresProductsCatelogue>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <HasRequiredAuthority fallBack={() => navigate("/forbidden")} requiredAuthority="USE_PAGE_DASHBOARD">
                                        <Dashboard />
                                    </HasRequiredAuthority>
                                }
                            />
                            <Route
                                path="/courses"
                                element={
                                    <HasRequiredAuthority fallBack={() => navigate("/forbidden")} requiredAuthority="USE_PAGE_COURSES">
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

//USE_CONTAINER_CONTAINERNAME
//USE_PAGE_PAGENAME
//USE_FEATURE_FEATURENAME
//READ_FEATURE
//WRITE_FEATURE
//DELETE_FEATURE
//UPDATE_FEATURE
