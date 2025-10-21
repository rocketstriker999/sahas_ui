import { Dialog } from "primereact/dialog";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import Authority from "./Authority";
import SearchBar from "../manage_authorities/SearchBar";
import { TITLE_TEXT } from "../../style";

export default function DialogManageRoleAuthorities({ visible, roleId, closeDialog }) {
    const { requestAPI } = useAppContext();
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
            requestPath: `roles/${roleId}/authorities`,
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
    }, [requestAPI, roleId]);

    return (
        <Dialog header={`Manage Role Authorities`} visible={visible} className="w-11" onHide={closeDialog}
            pt={{
                headertitle: { className: TITLE_TEXT },
            }}>
            <TabHeader
                className="pt-3 "
                title={`Manage Authorities - ${roles?.find((role) => role?.id === roleId)?.title}`}
                highlights={["Authority Can Be Mapped To Role", "Impact Will be Immidiate"]}
            />
            {loading ? (
                <Loading message="Loading Role Authorities" />
            ) : error ? (
                <NoContent error={error} />
            ) : (
                <div className="flex flex-column gap-3 mt-3">
                    <SearchBar search={search} setSearch={setSearch} />
                    {searchedRoleAuthorities?.length ? (
                        searchedRoleAuthorities
                            ?.map(({ id, ...rest }) => ({ authority_id: id, ...rest }))
                            ?.map((searchedRoleAuthority) => (
                                <Authority
                                    key={searchedRoleAuthority?.authority_id}
                                    {...(roleAuthorities?.find(({ authority_id }) => authority_id === searchedRoleAuthority?.authority_id) ||
                                        searchedRoleAuthority)}
                                    roleId={roleId}
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
