import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
import Courses from "../components/product/Courses";
import MediaPlayer from "../pages/MediaPlayer";
import AllProducts from "../components/dashboard/AllProducts";
import MyProducts from "../components/dashboard/MyProducts";
import HasAuthentication from "../components/security/HasAuthentication";
import HasNoAuthentication from "../components/security/HasNoAuthentication";
import FormLogin from "../components/login/FormLogin";
import Forbidden from "../pages/Forbidden";
import NotFound from "../pages/NotFound";
import Purchase from "../pages/Purchase";
import HasPrimaryDetails from "../components/security/HasPrimaryDetails";
import Subjects from "../components/product/Subjects";
import Chapters from "../components/product/Chapters";
import Logout from "../components/common/Logout";
import Profile from "../pages/Profile";
import PrimaryDetails from "../components/profile/PrimaryDetails";
import ProductAccess from "../components/profile/ProductAccess";
import Catelogue from "../components/profile/Catelogue";
import TransactionDetails from "../components/profile/TransactionDetails";
import GlobalNotes from "../components/profile/GlobalNotes";
import WalletDetails from "../components/profile/WalletDetails";
import WithdrawDetails from "../components/profile/WithdrawDetails";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import { useSelector } from "react-redux";
import { useAppContext } from "../providers/ProviderAppContainer";

import RequiresTemplateConfiguration from "../components/dependencies/RequiresTemplateConfiguration";

export default function App() {
    return (
        <RequiresTemplateConfiguration>
            <p>Dashboard</p>
            {/* <Routes>
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

                <Route path="/profile" element={<Profile />}>
                    <Route index element={<Catelogue />} />
                    <Route path="primary-details" element={<PrimaryDetails />} />
                    <Route path="product-access" element={<ProductAccess />} />
                    <Route path="product-access/transaction-details/:transactionId/:transactionTitle" element={<TransactionDetails />} />
                    <Route path="student-notes" element={<GlobalNotes />} />
                    <Route path="wallet-details" element={<WalletDetails />} />
                    <Route path="wallet-details/withdraw-details" element={<WithdrawDetails />} />
                </Route>

                <Route path="/adminUserProductAccess" element={<p>Admin Product access</p>} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/maintenance" element={<div>Under Maintenance</div>} />

                <Route path="/forbidden" element={<Forbidden />} />
                <Route path="*" element={<NotFound />} />
            </Routes> */}
        </RequiresTemplateConfiguration>
    );
}
