import { useCallback, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import { Outlet } from "react-router-dom";
import DialogAddUser from "../components/manage_users/DialogAddUser";
import { AUTHORITIES } from "../constants";
import HasRequiredAuthority from "../components/dependencies/HasRequiredAuthority";

export default function ManageUsers() {
    const [dialogAddUser, setDialogAddUser] = useState({
        visible: false,
    });

    const closeDialogAddUser = useCallback(() => {
        setDialogAddUser((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <div className="flex flex-column h-full overflow-hidden">
            <PageTitle
                title={"Manage Users"}
                action={
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_OTHER_USERS}>
                        <span
                            onClick={() => setDialogAddUser((prev) => ({ ...prev, visible: true, closeDialog: closeDialogAddUser }))}
                            className="pi pi-plus"
                        ></span>
                    </HasRequiredAuthority>
                }
            />
            <div className="flex-1 min-h-0 overflow-hidden">
                <Outlet />
            </div>
            <DialogAddUser {...dialogAddUser} />
        </div>
    );
}
