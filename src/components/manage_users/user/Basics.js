import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getReadableDate, hasRequiredAuthority } from "../../../utils";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import TabHeader from "../../common/TabHeader";
import { Divider } from "primereact/divider";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import ProfileCard from "../../dashboard/ProfileCard";
import Loading from "../../common/Loading";
import NoContent from "../../common/NoContent";
import { AUTHORITIES } from "../../../constants";
import { useOutletContext } from "react-router-dom";

export default function Basics() {
    const { userId, authorities, branches } = useOutletContext();
    const [basics, setBasics] = useState();

    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [updating, setUpdating] = useState();

    const disableInputs = useMemo(
        () => !hasRequiredAuthority(authorities, AUTHORITIES.WRITE_USERS_BASICS) || updating || loading,
        [authorities, loading, updating]
    );

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
            requestPath: `users/${userId}`,
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
    }, [basics, requestAPI, showToast, userId]);

    return (
        <div className="flex flex-column h-full ">
            <TabHeader
                className={"px-3 pt-3"}
                title="User's Basic Details & Profile"
                highlights={[`Created At - ${getReadableDate({ date: basics?.created_on })}`, `Updated At - ${getReadableDate({ date: basics?.updated_at })}`]}
            />
            <Divider />

            <div className="flex-1 px-3 pb-2 overflow-y-scroll gap-2 flex flex-column">
                {loading ? (
                    <Loading message="Loading Inquiries" />
                ) : error ? (
                    <NoContent error={error} />
                ) : basics ? (
                    <div className="flex flex-column gap-2">
                        <ProfileCard {...basics} showViewMore={false} />
                        <FloatLabel className="mt-4">
                            <InputText
                                value={basics?.full_name}
                                id="fullname"
                                className="w-full"
                                onChange={(e) => setBasics((prev) => ({ ...prev, full_name: e.target.value }))}
                                disabled={disableInputs}
                            />
                            <label htmlFor="fullname">Full Name</label>
                        </FloatLabel>
                        <FloatLabel className="mt-4">
                            <InputText
                                value={basics?.phone}
                                id="phone"
                                className="w-full"
                                onChange={(e) => setBasics((prev) => ({ ...prev, phone: e.target.value }))}
                                disabled={disableInputs}
                            />
                            <label htmlFor="phone">Phone</label>
                        </FloatLabel>
                        <FloatLabel className="mt-4">
                            <Dropdown
                                value={branches?.find((branch) => branch.id === basics?.branch_id)}
                                inputId="branch"
                                options={branches}
                                optionLabel="title"
                                className="w-full"
                                onChange={(e) => setBasics((prev) => ({ ...prev, branch_id: e.value?.id }))}
                                disabled={disableInputs}
                            />
                            <label htmlFor="branch">Branch</label>
                        </FloatLabel>
                        <FloatLabel className="mt-4">
                            <InputTextarea
                                value={basics?.address}
                                id="address"
                                rows={5}
                                cols={30}
                                className="w-full"
                                onChange={(e) => setBasics((prev) => ({ ...prev, address: e.target.value }))}
                                disabled={disableInputs}
                            />
                            <label htmlFor="address">Address</label>
                        </FloatLabel>
                        <div className="px-3 border-1 border-gray-300 border-round mt-2 flex align-items-center">
                            <p className="flex-1">Active</p>
                            <InputSwitch
                                checked={Boolean(basics?.active)}
                                onChange={(e) => setBasics((prev) => ({ ...prev, active: e.value }))}
                                disabled={disableInputs}
                            />
                        </div>
                        <HasRequiredAuthority requiredAuthority={AUTHORITIES.WRITE_USERS_BASICS}>
                            <Button className="mt-3" label="Update" severity="warning" onClick={updateUserBasics} loading={updating} />
                        </HasRequiredAuthority>
                    </div>
                ) : (
                    <NoContent error={"No Inquiries Found"} />
                )}
            </div>
        </div>
    );
}
