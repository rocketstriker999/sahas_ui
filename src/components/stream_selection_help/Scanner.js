import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../redux/sliceUser";
import { TEXT_SIZE_NORMAL, TEXT_SIZE_SMALL } from "../../style";

export default function Scanner() {
    const [scanningQR, setScanningQR] = useState();
    const [scanResult, setScanResult] = useState();
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();

    const attendStreamSelectionTestByInviteId = useCallback(
        (id) => {
            requestAPI({
                requestPath: `stream-selection-test-invites/${id}/attend`,
                requestMethod: "GET",
                setLoading: setLoading,
                parseResponseBody: false,
                onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Check QR Invite !", life: 2000 }),
                onResponseReceieved: (_, responseCode) => {
                    if (responseCode === 200) {
                        showToast({
                            severity: "success",
                            summary: "Updated",
                            detail: `QR Invite Verified`,
                            life: 1000,
                        });
                        dispatch(updateCurrentUser({ stream_selection_test_taken: true }));
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Check QR Invite !", life: 2000 });
                    }
                },
            });
        },
        [dispatch, requestAPI, showToast],
    );

    useEffect(() => {
        if (scanningQR && scanResult) {
            try {
                const qrPayload = JSON.parse(scanResult);
                if (qrPayload?.id) {
                    attendStreamSelectionTestByInviteId(qrPayload?.id);
                } else {
                    throw new Error("Invalid QR");
                }
            } catch (e) {
                showToast({ severity: "error", summary: "Failed", detail: "Invalid Scanner !", life: 2000 });
            } finally {
                setScanningQR(false);
            }
        }
    }, [attendStreamSelectionTestByInviteId, scanResult, scanningQR, showToast]);

    if (loading) {
        return <Loading message={"Verifying QR"} />;
    }

    if (!scanningQR) {
        return (
            <div className="flex flex-column align-items-center justify-content-center p-2 text-center">
                <img src="/images/form_submit.png" alt="forbidden" className="w-6rem lg:w-8rem" />
                <p className={`${TEXT_SIZE_NORMAL} font-bold`}>C.S.A.T. Test Already Given</p>
                <p className={`${TEXT_SIZE_SMALL} text-color-secondary`}>
                    OOPS ! Your Result For C.S.A.T. is already published Or You Are Not Allowed To Attend Test
                </p>
                <Button icon="pi pi-qrcode" label="Scan Invite QR" severity="warning" onClick={() => setScanningQR(true)} />
            </div>
        );
        return;
    }

    return (
        <div className="w-full px-4 flex flex-column">
            <BarcodeScanner
                height={128}
                onUpdate={(error, result) => {
                    if (result) setScanResult(result);
                }}
            />
            <Button severity="danger" label="Cancel" onClick={() => setScanningQR(false)} />
        </div>
    );
}
