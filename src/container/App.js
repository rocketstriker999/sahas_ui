import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import RequiresTemplateConfiguration from "../components/dependencies/RequiresTemplateConfiguration";
import RequiresProductsCatelogue from "../components/dependencies/RequiresProductsCatelogue";
import Courses from "../pages/Courses";
import Forbidden from "../pages/Forbidden";
import HasRequiredAuthority from "../components/dependencies/HasRequiredAuthority";
import Logout from "../pages/Logout";
import HasAuthentication from "../components/dependencies/HasAuthentication";
import NotFound from "../pages/NotFound";
import Users from "../components/manage_users/Users";
import ManageUsers from "../pages/ManageUsers";
import User from "../components/manage_users/User";

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
                                path="/manage-users"
                                element={
                                    <HasRequiredAuthority fallBack={() => navigate("/forbidden")} requiredAuthority="USE_CONTAINER_MANAGE_USERS">
                                        <ManageUsers />
                                    </HasRequiredAuthority>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <HasRequiredAuthority fallBack={() => navigate("/forbidden")} requiredAuthority="USE_PAGE_USERS">
                                            <Users />
                                        </HasRequiredAuthority>
                                    }
                                />
                                <Route
                                    path=":id"
                                    element={
                                        <HasRequiredAuthority fallBack={() => navigate("/forbidden")} requiredAuthority="USE_PAGE_USER">
                                            <User />
                                        </HasRequiredAuthority>
                                    }
                                />
                            </Route>
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
                            <Route path="*" element={<NotFound />} />
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
