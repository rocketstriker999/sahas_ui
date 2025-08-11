import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import RequiresTemplateConfiguration from "../components/dependencies/RequiresTemplateConfiguration";
import RequiresProductsCatelogue from "../components/dependencies/RequiresProductsCatelogue";
import Courses from "../pages/Courses";
import HasRequiredAuthority from "../components/dependencies/HasRequiredAuthority";
import Logout from "../pages/Logout";
import HasAuthentication from "../components/dependencies/HasAuthentication";
import NotFound from "../pages/NotFound";
import Users from "../components/manage_users/Users";
import ManageUsers from "../pages/ManageUsers";
import User from "../components/manage_users/User";

export default function App() {
    return (
        <HasAuthentication>
            <HasRequiredAuthority requiredAuthority="USE_CONTAINER_APP" showForBidden={true}>
                <RequiresTemplateConfiguration>
                    <RequiresProductsCatelogue>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <HasRequiredAuthority showForBidden={true} requiredAuthority="USE_PAGE_DASHBOARD">
                                        <Dashboard />
                                    </HasRequiredAuthority>
                                }
                            />
                            <Route
                                path="/manage-users"
                                element={
                                    <HasRequiredAuthority showForBidden={true} requiredAuthority="USE_CONTAINER_MANAGE_USERS">
                                        <ManageUsers />
                                    </HasRequiredAuthority>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <HasRequiredAuthority showForBidden={true} requiredAuthority="USE_PAGE_USERS">
                                            <Users />
                                        </HasRequiredAuthority>
                                    }
                                />
                                <Route
                                    path=":userId"
                                    element={
                                        <HasRequiredAuthority showForBidden={true} requiredAuthority="USE_PAGE_USER">
                                            <User />
                                        </HasRequiredAuthority>
                                    }
                                />
                            </Route>
                            <Route
                                path="/courses"
                                element={
                                    <HasRequiredAuthority showForBidden={true} requiredAuthority="USE_PAGE_COURSES">
                                        <Courses />
                                    </HasRequiredAuthority>
                                }
                            />
                            <Route path="/logout" element={<Logout />} />

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
