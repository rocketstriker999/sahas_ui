import { Dialog } from "primereact/dialog";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import Authority from "./Authority";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function DialogManageRoleAuthorities({ managingRoleAuthorities, setManagingRoleAuthorities }) {
    const { requestAPI, showToast } = useAppContext();
    const { roles = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const [roleAuthorities, setRoleAuthorities] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [search, setSearch] = useState("");

    const searchedRoleAuthorities = useMemo(
        () => roleAuthorities?.filter((roleAuthority) => roleAuthority?.title?.toLowerCase()?.includes(search.toLowerCase())),
        [roleAuthorities, search]
    );

    useEffect(() => {
        requestAPI({
            requestPath: `roles/${managingRoleAuthorities}/authorities`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,
            onResponseReceieved: (roleAuthorities, responseCode) => {
                if (roleAuthorities && responseCode === 200) {
                    setRoleAuthorities(roleAuthorities);
                } else {
                    setError("Couldn't load Authorities");
                }
            },
        });
    }, [requestAPI, managingRoleAuthorities]);

    return (
        <Dialog header={`Manage Role Authorities`} visible={managingRoleAuthorities} className="w-11" onHide={() => setManagingRoleAuthorities(false)}>
            <TabHeader
                className="pt-3 "
                title={`Manage Authorities - ${roles?.find((role) => role?.id === managingRoleAuthorities)?.title}`}
                highlights={["Authority Can Be Mapped To Role", "Impact Will be Immidiate"]}
            />
            {loading ? (
                <Loading message="Loading Role Authorities" />
            ) : error ? (
                <NoContent error={error} />
            ) : (
                <div className="flex flex-column gap-3 mt-3">
                    <div className="p-inputgroup  ">
                        <InputText value={search} placeholder="Search By Authority" onChange={(e) => setSearch(e.target.value)} />
                        <Button icon="pi pi-times" className="p-button-danger " disabled={!search} onClick={() => setSearch("")} />
                    </div>
                    {searchedRoleAuthorities?.length ? (
                        searchedRoleAuthorities?.map((searchedRoleAuthority) => (
                            <Authority
                                key={searchedRoleAuthority?.id}
                                roleId={managingRoleAuthorities}
                                {...searchedRoleAuthority}
                                setRoleAuthorities={setRoleAuthorities}
                            />
                        ))
                    ) : (
                        <NoContent error={"Failed To Load Role Authorities"} />
                    )}
                </div>
            )}
        </Dialog>
    );
}
