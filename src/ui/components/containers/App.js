import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import CustomError from "../error/CustomError";
import Navbar from "../navbar/Navbar";
import Profile from "./Profile";
import Login from "./Login";
import Forbidden from "../security/Forbidden";
import HasAuthentication from "../security/HasAuthentication";
import HasNoAuthentication from "../security/HasNoAuthentication";
import HasRequiredGroup from "../security/HasRequiredGroup";
import Help from "./Help";
import Contact from "./Contact";
import { useRef } from "react";
import { Toast } from 'primereact/toast';
import useAPI from "../../hooks/useAPI";
import { ProgressSpinner } from 'primereact/progressspinner';
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/sliceAuth";

export default function App() {

    const dispatch = useDispatch();

    //convert into global toast object
    const toast = useRef(null);

    const [stateDetails, isLoadingStateDetails, errorStateDetails] = useAPI({ requestPath: "token/verify" });

    //user's token was verified
    if(stateDetails.statusCode===200){

        dispatch(setCurrentUser(stateDetails))

    }



    //if any error
    if (errorStateDetails) {
        return <p>It is not You but It is Us , Something is Broken !</p>
    }
    //if loading
    if (isLoadingStateDetails) {

        return (
            <div className="card flex justify-content-center">
                <ProgressSpinner />
            </div>
        );

    }
    //if state data is availabale
    return (
        <>
            <Toast ref={toast} />
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>

                <Route path="/profile" element={<HasAuthentication><Profile /></HasAuthentication>}></Route>
                <Route path="/help" element={<HasAuthentication><Help /></HasAuthentication>}></Route>

                <Route path="/manage-firm" element={<HasRequiredGroup allowedGroups={["FADMIN", "HADMIN"]} ><p>Firm Admin Management</p></HasRequiredGroup>}></Route>
                <Route path="/manage-system" element={<HasRequiredGroup allowedGroups={["HADMIN"]} ><p>System Admin Management</p></HasRequiredGroup>}></Route>

                <Route path="/login" element={<HasNoAuthentication><Login /></HasNoAuthentication>}></Route>
                <Route path="/contact" element={<HasNoAuthentication><Contact /></HasNoAuthentication>}></Route>

                <Route path="/forbidden" element={<Forbidden />}></Route>
                <Route path="*" element={<CustomError highlight="OOPS ! We could't Find What You Were Looking For." />}></Route>
            </Routes>
        </>
    );




}