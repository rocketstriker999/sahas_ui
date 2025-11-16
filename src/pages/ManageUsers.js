import { useCallback, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import { Outlet } from "react-router-dom";
import DialogAddUser from "../components/manage_users/DialogAddUser";

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
                    <span
                        onClick={() => setDialogAddUser((prev) => ({ ...prev, visible: true, closeDialog: closeDialogAddUser }))}
                        className="pi pi-plus"
                    ></span>
                }
            />
            <div className="flex-1 min-h-0 overflow-hidden">
                <Outlet />
            </div>
            <DialogAddUser {...dialogAddUser} />
        </div>
    );
}
