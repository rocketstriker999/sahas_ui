import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { getReadableDate } from "../../utils";
import ProgressiveControl from "../common/ProgressiveControl";

export default function CouponCode({ id, code, updated_at, setCouponCodes }) {
    const { requestAPI, showToast } = useAppContext();

    const [deleting, setDeleting] = useState();

    const [dialogEditChapterType, setDialogEditChapterType] = useState({
        visible: false,
    });

    const closeDialogEditChapterType = useCallback(() => {
        setDialogEditChapterType((prev) => ({ ...prev, visible: false }));
    }, []);

    const deleteCouponCode = useCallback(() => {
        requestAPI({
            requestPath: `coupon-codes/${id}`,
            requestMethod: "DELETE",
            setLoading: setDeleting,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({
                        severity: "success",
                        summary: "Deleted",
                        detail: `Coupon Code Deleted`,
                        life: 1000,
                    });
                    setCouponCodes((prev) => prev?.filter((couponCode) => couponCode?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Coupon Code !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setCouponCodes, showToast]);

    return (
        <div className={`flex gap-3 align-items-center border-1 border-gray-300 border-round py-2 px-3 overflow-hidden `}>
            <div className="flex flex-column flex-1 gap-2">
                <span className={`text-sm font-semibold `}>
                    {id}. {code}
                </span>
                <div className={`flex align-items-center gap-1 `}>
                    <i className="pi pi-book text-sm"></i>
                    <span className="m-0 p-0 text-xs">{`Last Updated At ${getReadableDate({ date: updated_at })}`}</span>
                </div>
            </div>

            <i
                className={`pi pi-pencil `}
                onClick={() =>
                    setDialogEditChapterType((prev) => ({
                        ...prev,
                        visible: true,
                        setCouponCodes,
                        id,
                        code,
                        closeDialog: closeDialogEditChapterType,
                    }))
                }
            ></i>
            {<ProgressiveControl loading={deleting} control={<i className={`pi pi-trash `} onClick={deleteCouponCode}></i>} />}
            {/* {dialogEditChapterType?.visible && <DialogEditChapterType {...dialogEditChapterType} />} */}
        </div>
    );
}
