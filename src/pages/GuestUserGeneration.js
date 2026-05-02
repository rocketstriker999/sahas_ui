import { useCallback, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";
import { setCurrentUser } from "../redux/sliceUser";
import TabHeader from "../components/common/TabHeader";
import { KEY_AUTHENTICATION_TOKEN, KEY_GUEST_TOKEN } from "../constants";

export default function GuestUserGeneration() {
    const { requestAPI, showToast } = useAppContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [user, setUser] = useState({});

    const addUser = useCallback(() => {
        requestAPI({
            requestPath: `users/guest`,
            requestMethod: "POST",
            requestPostBody: user,
            setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Submit Details !", life: 2000 }),
            onResponseReceieved: ({error, ...createdUser}, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Success", detail: "Your details were saved.", life: 1500 });
                    localStorage.setItem(KEY_GUEST_TOKEN, createdUser?.token);
                    dispatch(setCurrentUser(user));

                } else {
                    showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Submit Details !", life: 2000 });
                }
            },
        });
    }, [dispatch, requestAPI, showToast, user]);

    return (
        <div className="flex-1 p-3 overflow-y-auto">
            <TabHeader className="pt-2" title="Before you enroll" highlights={["Enter your details to continue with the Psychometric Test."]} />
            <FloatLabel className="mt-4">
                <InputText
                    value={user?.full_name || ""}
                    id="full_name"
                    className="w-full"
                    onChange={(e) => setUser((prev) => ({ ...prev, full_name: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="full_name">Full name</label>
            </FloatLabel>
            <FloatLabel className="mt-4">
                <InputText
                    value={user?.phone || ""}
                    id="phone"
                    className="w-full"
                    onChange={(e) => setUser((prev) => ({ ...prev, phone: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="phone">Phone</label>
            </FloatLabel>
            <FloatLabel className="mt-4">
                <InputText
                    value={user?.email || ""}
                    id="email"
                    className="w-full"
                    onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="email">Email</label>
            </FloatLabel>
            <FloatLabel className="mt-4">
                <InputTextarea
                    value={user?.address || ""}
                    id="address"
                    rows={5}
                    cols={30}
                    className="w-full"
                    onChange={(e) => setUser((prev) => ({ ...prev, address: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="address">Address</label>
            </FloatLabel>
            <FloatLabel className="mt-4">
                <InputText
                    value={user?.history?.institute || ""}
                    id="institute"
                    className="w-full"
                    onChange={(e) => setUser((prev) => ({ ...prev, history: { ...prev?.history, institute: e.target.value } }))}
                    disabled={loading}
                />
                <label htmlFor="institute">Last Institute</label>
            </FloatLabel>
            <FloatLabel className="mt-4">
                <InputText
                    value={user?.history?.course || ""}
                    id="course"
                    className="w-full"
                    onChange={(e) => setUser((prev) => ({ ...prev, history: { ...prev?.history, course: e.target.value } }))}
                    disabled={loading}
                />
                <label htmlFor="course">Last Studied</label>
            </FloatLabel>
            <FloatLabel className="mt-4">
                <InputText
                    value={user?.history?.course_exam_seat || ""}
                    id="course_exam_seat"
                    className="w-full"
                    onChange={(e) => setUser((prev) => ({ ...prev, history: { ...prev?.history, course_exam_seat: e.target.value } }))}
                    disabled={loading}
                />
                <label htmlFor="course_exam_seat">Last Exam Seat Number</label>
            </FloatLabel>
            <FloatLabel className="mt-4">
                <InputText
                    value={user?.history?.refered_by || ""}
                    id="refered_by"
                    className="w-full"
                    onChange={(e) => setUser((prev) => ({ ...prev, history: { ...prev?.history, refered_by: e.target.value } }))}
                    disabled={loading}
                />
                <label htmlFor="refered_by">Refered By</label>
            </FloatLabel>

            <div className="flex gap-2 mt-4">
                <Button className="flex-1" label="Back / Cancel" severity="secondary" outlined onClick={() => navigate(-1)} disabled={loading} />
                <Button className="flex-1" label="Enroll" severity="warning" loading={loading} onClick={addUser} />
            </div>
        </div>
    );
}
