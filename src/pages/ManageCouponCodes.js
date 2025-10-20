import { Button } from "primereact/button";
import PageTitle from "../components/common/PageTitle";
import TabHeader from "../components/common/TabHeader";
import { Divider } from "primereact/divider";
import { Outlet } from "react-router-dom";

export default function ManageCouponCodes() {
    return (
        <div className="flex flex-column h-full ">
            <PageTitle title={`Coupon Codes`} />
            <TabHeader
                className={"px-3 pt-3"}
                title="Manage Coupon Codes"
                highlights={[`Add/Remove Coupon Code`]}
                actionItems={[
                    <Button
                        icon="pi pi-plus"
                        severity="warning"
                        // onClick={() => setDialogAddChapterType((prev) => ({ ...prev, setChapterTypes, visible: true, closeDialog: closeDialogAddChapterType }))}
                    />,
                ]}
            />
            <Divider />
            <Outlet />
        </div>
    );
}
