import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import { BrowserRouter } from "react-router-dom";

import Index from "../pages/Index";
import { useSelector } from "react-redux";
import ProcessToken from "../security/ProcessToken";
import { useAppContext } from "../providers/ProviderSahas";
import Forbidden from "../pages/Forbidden";
import NoContent from "../components/common/NoContent";
import Loading from "../components/common/Loading";
import HasAuthentication from "../security/HasAuthentication";

export default function App() {
    const { loading, error } = useAppContext();

    const configs = useSelector((state) => state.stateConfigs);

    if (loading) return <Loading message="Fetching Application Configurations" />;

    if (error && !configs && !loading) return <NoContent error="Missing Application Configurations" />;

    if (configs)
        return (
            <ProcessToken>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index pageConfig={configs?.index} />} />
                        <Route
                            path="/dashboard"
                            element={
                                <HasAuthentication>
                                    <Dashboard pageConfig={configs?.dashboard} />
                                </HasAuthentication>
                            }
                        />
                        <Route path="/forbidden" element={<Forbidden pageConfig={configs?.forbidden} />} />
                        <Route path="*" element={<NotFound pageConfig={configs?.not_found} />} />
                    </Routes>
                </BrowserRouter>
            </ProcessToken>
        );
}
