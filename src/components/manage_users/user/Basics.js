import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";
import { getReadableDate } from "../../../utils";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import TabHeader from "../../common/TabHeader";
import { Divider } from "primereact/divider";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import Loading from "../../common/Loading";
import NoContent from "../../common/NoContent";
import { AUTHORITIES } from "../../../constants";
import { useOutletContext } from "react-router-dom";
import FileInput from "../../common/FileInput";

export default function Basics() {
    const { userId, branches } = useOutletContext();
    const [basics, setBasics] = useState();

    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [updating, setUpdating] = useState();

    const [enableInputs, setEnableInputs] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `users/${userId}`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (basics, responseCode) => {
                if (basics && responseCode === 200) {
                    setBasics(basics);
                } else {
                    setError("Couldn't load User Profile");
                }
            },
        });
    }, [requestAPI, userId]);

    const updateUserBasics = useCallback(() => {
        requestAPI({
            requestPath: `users`,
            requestMethod: "PUT",
            requestPostBody: basics,
            setLoading: setUpdating,
            onRequestFailure: setError,
            onResponseReceieved: (basics, responseCode) => {
                if (basics && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Profile Updated Succesfully", life: 1000 });
                    setBasics(basics);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Updated Profile !", life: 2000 });
                }
            },
        });
    }, [basics, requestAPI, showToast]);

    return (
        <div className="flex flex-column h-full ">
            <TabHeader
                className={"px-3 pt-3"}
                title="User's Basic Details & Profile"
                highlights={[`Created At - ${getReadableDate({ date: basics?.created_on })}`, `Updated At - ${getReadableDate({ date: basics?.updated_at })}`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.WRITE_USERS_BASICS}>
                        <InputSwitch
                            checked={Boolean(basics?.active)}
                            onChange={(e) => setBasics((prev) => ({ ...prev, active: e.value }))}
                            disabled={!enableInputs}
                        />
                    </HasRequiredAuthority>,
                    <Button icon="pi pi-pencil" severity="warning" onClick={setEnableInputs} />,
                ]}
            />
            <Divider />

            {loading ? (
                <Loading message="Loading Inquiries" />
            ) : error ? (
                <NoContent error={error} />
            ) : basics ? (
                <div className="flex-1 px-2 flex flex-column gap-2 overflow-y-scroll ">
                    <FileInput
                        label="User Image"
                        type="image"
                        cdn_url={basics?.image}
                        setCDNUrl={(cdn_url) => setBasics((prev) => ({ ...prev, image: cdn_url }))}
                        disabled={loading || !enableInputs}
                    />
                    <FloatLabel className="mt-4">
                        <InputText
                            value={basics?.full_name || ""}
                            id="fullname"
                            className="w-full"
                            onChange={(e) => setBasics((prev) => ({ ...prev, full_name: e.target.value }))}
                            disabled={!enableInputs}
                        />
                        <label htmlFor="fullname">Full Name</label>
                    </FloatLabel>
                    <FloatLabel className="mt-4">
                        <InputText
                            value={basics?.email || ""}
                            id="email"
                            className="w-full"
                            onChange={(e) => setBasics((prev) => ({ ...prev, email: e.target.value }))}
                            disabled={!enableInputs}
                        />
                        <label htmlFor="email">Email</label>
                    </FloatLabel>
                    <div className="flex mt-4 gap-2 items-center">
                        <FloatLabel className="flex-1">
                            <InputText
                                className="w-full"
                                value={basics?.phone || ""}
                                id="phone"
                                onChange={(e) => setBasics((prev) => ({ ...prev, phone: e.target.value }))}
                                disabled={!enableInputs}
                            />
                            <label htmlFor="phone">Phone</label>
                        </FloatLabel>

                        <FloatLabel className="flex-1">
                            <Dropdown
                                className="w-full"
                                value={branches?.find(({ id }) => id === basics?.branch_id)}
                                inputId="branch"
                                options={branches}
                                optionLabel="title"
                                onChange={(e) => setBasics((prev) => ({ ...prev, branch_id: e.value?.id }))}
                                disabled={!enableInputs}
                            />
                            <label htmlFor="branch">Branch</label>
                        </FloatLabel>
                    </div>

                    <FloatLabel className="mt-4">
                        <InputTextarea
                            value={basics?.address || ""}
                            id="address"
                            rows={5}
                            cols={30}
                            className="w-full"
                            onChange={(e) => setBasics((prev) => ({ ...prev, address: e.target.value }))}
                            disabled={!enableInputs}
                        />
                        <label htmlFor="address">Address</label>
                    </FloatLabel>
                </div>
            ) : (
                <NoContent error={"No Inquiries Found"} />
            )}

            <Button className="mx-3 my-2" label="Update" severity="warning" onClick={updateUserBasics} loading={updating} disabled={!basics} />
        </div>
    );
}
