import { Button } from "primereact/button";
import PageTitle from "../components/common/PageTitle";
import TabHeader from "../components/common/TabHeader";
import { Divider } from "primereact/divider";
import { Outlet } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import DialogAddCouponCode from "../components/manage_coupon_codes/DialogAddCouponCode";

export default function ManageCouponCodes() {
    const { requestAPI } = useAppContext();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [couponCodes, setCouponCodes] = useState();

    const [dialogAddCouponCode, setDialogAddCouponCode] = useState({
        visible: false,
    });

    const closeDialogAddCouponCode = useCallback(() => {
        setDialogAddCouponCode((prev) => ({ ...prev, visible: false }));
    }, []);

    useEffect(() => {
        requestAPI({
            requestPath: `coupon-codes`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,
            onResponseReceieved: (couponCodes, responseCode) => {
                if (couponCodes && responseCode === 200) {
                    setCouponCodes(couponCodes);
                } else {
                    setError("Couldn't load Coupon Codes");
                }
            },
        });
    }, [requestAPI]);

    return (
        <div className="flex flex-column h-full ">
            <PageTitle title={`Coupon Codes`} />
            <TabHeader
                className={"px-3 pt-3"}
                title="Manage Coupon Codes"
                highlights={[`Add/Remove Coupon Code`, `Red & Green Indicates The Status`]}
                actionItems={[
                    <Button
                        icon="pi pi-plus"
                        severity="warning"
                        onClick={() => setDialogAddCouponCode((prev) => ({ ...prev, setCouponCodes, visible: true, closeDialog: closeDialogAddCouponCode }))}
                    />,
                ]}
            />
            <Divider />
            {loading ? <Loading /> : error ? <NoContent error={error} /> : <Outlet context={{ couponCodes, setCouponCodes }} />}

            <DialogAddCouponCode {...dialogAddCouponCode} />
        </div>
    );
}
