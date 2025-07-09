import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import RequiresTemplateConfiguration from "../components/dependencies/RequiresTemplateConfiguration";
import RequiresProductsCatelogue from "../components/dependencies/RequiresProductsCatelogue";
import Courses from "../pages/Courses";

export default function App() {
    return (
        <RequiresTemplateConfiguration>
            <RequiresProductsCatelogue>
                <Routes>
                    <Route path="/" element={<Dashboard />}>
                        {/* <Route index element={<AllProducts />} />
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
                        /> */}
                    </Route>
                    <Route path="/courses" element={<Courses />} />

                    {/* <Route path="/products/:productId" element={<Product />}>
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
                    <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </RequiresProductsCatelogue>
        </RequiresTemplateConfiguration>
    );
}
