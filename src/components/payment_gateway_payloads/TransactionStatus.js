import { Button } from "primereact/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDigitallyEnrolledCourse } from "../../redux/sliceUser";

export default function TransactionStatus({ course }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.stateUser);
    console.log(loggedInUser);

    //if course is purchased then need to push to redux
    //redux will be holding the courses purchased
    useEffect(() => {
        console.log("CALLED");
        dispatch(addDigitallyEnrolledCourse(course));
    }, [course, dispatch, loggedInUser]);

    return (
        <div className="flex flex-column align-items-center m-3 border-1 border-round border-gray-300 px-2 py-4 gap-2 shadow-3 bg-white">
            <span className="text-lg font-semibold">Payment Was Succesful</span>
            <img src="/images/success.png" alt="success" className="w-6rem lg:w-8rem" />
            <Button text severity="success" label="Check Payment Invoices" onClick={() => navigate(`/manage-users/${loggedInUser?.id}/enrollments`)} />

            <Button
                icon="pi pi-arrow-right"
                iconPos="right"
                className="w-full"
                severity="warning"
                label="Go To Course"
                onClick={() => navigate(`/courses/${course?.id}/subjects`)}
            />
        </div>
    );
}
