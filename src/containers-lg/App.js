import { Route, Routes } from "react-router-dom";
import UserDashboard from "./Dashboard";
import CustomError from "../components/error/CustomError";
import Navbar from "../components/navbar/Navbar";
import Profile from "./Profile";
import Login from "./Login";
import Forbidden from "../components/security/Forbidden";
import HasAuthentication from "../components/security/HasAuthetication";
import HasNoAuthentication from "../components/security/HasNoAuthentication";
import HasRole from "../components/security/HasRole";
import Help from "./Help";
import Contact from "./Contact";
import { useRef } from "react";
import { Toast } from 'primereact/toast';


export default function App() {

    //const dispatch = useDispatch();

    //convert into global object
    const toast = useRef(null);

    return (
        <>
            <Toast ref={toast} />
            <Navbar />
            <Routes>
                <Route path="/" element={<UserDashboard />}></Route>

                <Route path="/profile" element={<HasAuthentication><Profile /></HasAuthentication>}></Route>
                <Route path="/help" element={<HasAuthentication><Help /></HasAuthentication>}></Route>

                <Route path="/manage-firm" element={<HasRole requiredRole={["FADMIN", "HADMIN"]} ><p>Firm Admin Management</p></HasRole>}></Route>

                <Route path="/login" element={<HasNoAuthentication><Login /></HasNoAuthentication>}></Route>
                <Route path="/contact" element={<HasNoAuthentication><Contact /></HasNoAuthentication>}></Route>

                <Route path="/forbidden" element={<Forbidden />}></Route>
                <Route path="*" element={<CustomError highlight="Invalid Page Request" />}></Route>
            </Routes>
        </>
    );

}