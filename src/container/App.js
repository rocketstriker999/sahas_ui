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
import Categories from "../components/catelogue/Categories";
import Courses from "../components/catelogue/Courses";
import Catelogue from "../pages/Catelogue";
import Course from "../pages/Course";
import Subjects from "../components/course/Subjects";
import { Chapters } from "../components/course/Chapters";
import ManageChapterTypes from "../pages/ManageChapterTypes";
import ManageCouponCodes from "../pages/ManageCouponCodes";
import CouponCodes from "../components/manage_coupon_codes/CouponCodes";
import CouponCodeCourses from "../components/manage_coupon_codes/CouponCodeCourses";
import Enroll from "../pages/Enroll";
import PaymentGatewayPayLoad from "../pages/PaymentGatewayPayLoad";
import MediaCatalogue from "../pages/MediaCatalogue";
import Media from "../pages/Media";
import { AUTHORITIES } from "../constants";

export default function App() {
    return (
        <HasAuthentication>
            <RequiresTemplateConfiguration>
                <Routes>
                    <Route path="/" element={<Dashboard />} />

                    <Route path="/manage-users" element={<ManageUsers />}>
                        <Route
                            index
                            element={
                                <HasRequiredAuthority showForBidden={true} requiredAuthority={AUTHORITIES.USE_PAGE_USERS}>
                                    <Users />
                                </HasRequiredAuthority>
                            }
                        />
                        <Route path=":userId" element={<User />}>
                            <Route path="basics" element={<Basics />} />
                            <Route
                                path="inquiries"
                                element={
                                    <HasRequiredAuthority showForBidden={true} requiredAuthority={AUTHORITIES.READ_USER_INQUIRIES}>
                                        <Inquiries />
                                    </HasRequiredAuthority>
                                }
                            />
                            <Route path="enrollments" element={<Enrollments />} />
                            <Route path="devices" element={<NoContent error={"Coming soon !"} />} />
                            <Route path="wallet" element={<Wallet />} />
                            <Route path="notes" element={<NoContent error={"Coming soon !"} />} />
                            <Route
                                path="roles"
                                element={
                                    <HasRequiredAuthority showForBidden={true} requiredAuthority={AUTHORITIES.READ_USER_ROLES}>
                                        <Roles />
                                    </HasRequiredAuthority>
                                }
                            />
                        </Route>
                    </Route>
                    <Route path="/course-categories" element={<Catelogue />}>
                        <Route index element={<Categories />} />
                        <Route path=":categoryId/courses" element={<Courses />} />
                    </Route>

                    <Route path="/courses/:courseId" element={<Course />}>
                        <Route path="subjects" element={<Subjects />}></Route>
                        <Route path="subjects/:subjectId/chapters" element={<Chapters />} />
                        <Route path="subjects/:subjectId/chapters/:chapterId/media" element={<MediaCatalogue />} />
                    </Route>

                    <Route path="/media-player/:mediaId" element={<Media />}></Route>

                    <Route path="/manage-chapter-types" element={<ManageChapterTypes />} />

                    <Route path="/manage-coupon-codes" element={<ManageCouponCodes />}>
                        <Route index element={<CouponCodes />}></Route>
                        <Route path=":couponCodeId/courses" element={<CouponCodeCourses />} />
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

                    <Route path="/enroll/:courseId" element={<Enroll />} />

                    <Route path="/payment-gateway-payloads/:paymentGatewayPayloadId" element={<PaymentGatewayPayLoad />} />

                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </RequiresTemplateConfiguration>
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
