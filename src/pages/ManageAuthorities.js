import PageTitle from "../components/common/PageTitle";
import TabHeader from "../components/common/TabHeader";
import { useCallback, useMemo, useState } from "react";

import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import NoContent from "../components/common/NoContent";
import { useSelector } from "react-redux";

import Authority from "../components/manage_authorities/Authority";
import DialogAddAuthority from "../components/manage_authorities/DialogAddAuthority";
import SearchBar from "../components/manage_authorities/SearchBar";

export default function ManageAuthorities() {
    const { authorities = [] } = useSelector((state) => state.stateTemplateConfig?.global);
    const [search, setSearch] = useState("");

    const [dialogAddAuthority, setDialogAddAuthority] = useState({
        visible: false,
    });

    const searchedAuthorities = useMemo(
        () => authorities?.filter((authority) => authority?.title?.toLowerCase()?.includes(search.toLowerCase())),
        [authorities, search]
    );

    const closeDialogAddCourse = useCallback(() => {
        setDialogAddAuthority((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <div className="flex flex-column h-full overflow-hidden">
            <PageTitle title={"Manage Authorities"} />
            <TabHeader
                className={"px-3 pt-3"}
                title="Authorities"
                highlights={[`Total - ${authorities?.length} Authorities`]}
                actionItems={[
                    <Button
                        icon="pi pi-plus"
                        severity="warning"
                        onClick={() =>
                            setDialogAddAuthority((prev) => ({
                                ...prev,
                                visible: true,
                                closeDialog: closeDialogAddCourse,
                            }))
                        }
                    />,
                ]}
            />
            <Divider />

            <SearchBar className={"px-3"} search={search} setSearch={setSearch} />

            <div className="flex-1 mt-2 px-3 py-2 overflow-y-scroll gap-3 flex flex-column">
                {searchedAuthorities?.length ? (
                    searchedAuthorities?.map((authority) => <Authority key={authority?.id} {...authority} />)
                ) : (
                    <NoContent error={"No Authorities Found"} />
                )}
            </div>
            <DialogAddAuthority {...dialogAddAuthority} />
        </div>
    );
}
