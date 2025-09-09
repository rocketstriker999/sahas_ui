import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import RequiresTemplateConfiguration from "../components/dependencies/RequiresTemplateConfiguration";
import HasRequiredAuthority from "../components/dependencies/HasRequiredAuthority";
import Logout from "../pages/Logout";
import HasAuthentication from "../components/dependencies/HasAuthentication";
import NotFound from "../pages/NotFound";
import Users from "../components/manage_users/Users";
import ManageUsers from "../pages/ManageUsers";
import User from "../components/manage_users/User";
import Basics from "../components/manage_users/user/Basics";
import Inquiries from "../components/manage_users/user/Inquiries";
import Enrollments from "../components/manage_users/user/Enrollments";
import NoContent from "../components/common/NoContent";
import Roles from "../components/manage_users/user/Roles";
import Wallet from "../components/manage_users/user/Wallet";
import ManageRoles from "../pages/ManageRoles";
import ManageAuthorities from "../pages/ManageAuthorities";
import Categories from "../components/courses/Categories";
import Catelogue from "../pages/Catelogue";

export default function App() {
    return (
        <HasAuthentication>
            <HasRequiredAuthority requiredAuthority="USE_CONTAINER_APP" showForBidden={true}>
                <RequiresTemplateConfiguration>
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
                            >
                                <Route
                                    path="basics"
                                    element={
                                        <HasRequiredAuthority showForBidden={true} requiredAuthority="READ_USERS_BASICS">
                                            <Basics />
                                        </HasRequiredAuthority>
                                    }
                                />
                                <Route path="inquiries" element={<Inquiries />} />
                                <Route path="enrollments" element={<Enrollments />} />
                                <Route path="devices" element={<NoContent error={"Coming soon !"} />} />
                                <Route path="wallet" element={<Wallet />} />
                                <Route path="notes" element={<NoContent error={"Coming soon !"} />} />
                                <Route path="roles" element={<Roles />} />
                            </Route>
                        </Route>
                        <Route
                            path="/product-categories"
                            element={
                                <HasRequiredAuthority showForBidden={true} requiredAuthority="USE_PAGE_COURSES">
                                    <Catelogue />
                                </HasRequiredAuthority>
                            }
                        >
                            <Route index element={<Categories />} />
                            <Route path=":categoryId/products" element={<p>Product Detail</p>} />
                        </Route>

                        <Route
                            path="/manage-roles"
                            element={
                                <HasRequiredAuthority showForBidden={true} requiredAuthority="USE_CONTAINER_MANAGE_USERS">
                                    <ManageRoles />
                                </HasRequiredAuthority>
                            }
                        />

                        <Route
                            path="/manage-authorities"
                            element={
                                <HasRequiredAuthority showForBidden={true} requiredAuthority="USE_CONTAINER_MANAGE_USERS">
                                    <ManageAuthorities />
                                </HasRequiredAuthority>
                            }
                        />

                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
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
