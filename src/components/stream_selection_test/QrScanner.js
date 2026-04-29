import { Button } from "primereact/button";
import { useCallback, useEffect, useRef, useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import { BrowserMultiFormatReader } from "@zxing/library";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../redux/sliceUser";
import { TEXT_NORMAL, TEXT_SMALL } from "../../style";

function decodedTextFromScan(result) {
    if (result == null) return null;
    if (typeof result === "string") return result;
    if (typeof result.getText === "function") return result.getText();
    return null;
}

export default function QrScanner({ scanningQR, setScanningQR }) {
    const [scanResult, setScanResult] = useState();
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const attendStreamSelectionTestByInviteId = useCallback(
        (id) => {
            requestAPI({
                requestPath: `stream-selection-test-invites/${id}/attend`,
                requestMethod: "GET",
                setLoading: setLoading,
                parseResponseBody: false,
                onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Scan QR Invite !", life: 2000 }),
                onResponseReceieved: (_, responseCode) => {
                    if (responseCode === 200) {
                        showToast({
                            severity: "success",
                            summary: "Updated",
                            detail: `QR Invite Verified`,
                            life: 1000,
                        });
                        dispatch(updateCurrentUser({ stream_selection_test_allowed: true }));
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "You are Not Allowed To Scan Now !", life: 2000 });
                    }
                },
            });
        },
        [dispatch, requestAPI, showToast],
    );

    const onGalleryFileChange = useCallback(
        async (event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (!file) return;

            const objectUrl = URL.createObjectURL(file);
            const img = new Image();
            img.decoding = "async";

            try {
                await new Promise((resolve, reject) => {
                    img.onload = () => resolve();
                    img.onerror = () => reject(new Error("load"));
                    img.src = objectUrl;
                });

                const reader = new BrowserMultiFormatReader();
                const result = await reader.decodeFromImageElement(img);
                const text = decodedTextFromScan(result);
                if (text) {
                    setScanResult(text);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Could not read QR from this image.", life: 2000 });
                }
            } catch {
                showToast({
                    severity: "error",
                    summary: "Failed",
                    detail: "No QR code found in this image.",
                    life: 2000,
                });
            } finally {
                URL.revokeObjectURL(objectUrl);
            }
        },
        [showToast],
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
    }, [attendStreamSelectionTestByInviteId, scanResult, scanningQR, setScanningQR, showToast]);

    if (loading) {
        return <Loading message={"Verifying QR"} />;
    }

    return (
        <div className="flex flex-column align-items-center justify-content-center p-2 text-center">
            {!!scanningQR ? <div className="border-1 border-round border-gray-300 ">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onGalleryFileChange} />
                
                <span className={`font-semibold text-center ${TEXT_SMALL}`}>Align Camera With QR Code</span>
                <BarcodeScanner
                    onUpdate={(error, result) => {
                        const text = decodedTextFromScan(result);
                        if (text) setScanResult(text);
                    }}
                />
            </div> : <img src="/images/scan_qr.png" alt="forbidden" className="w-6rem lg:w-8rem" />}
            <p className={`${TEXT_NORMAL} font-bold`}>Scan QR to Start</p>
            <p className={`${TEXT_SMALL} text-color-secondary text-center px-4`}>
                Scan QR Code For Psychometric Test Invite, Validate Invite Will Start Test.Check Camera Permission Berfore Scanning QR !
            </p>
            {!!scanningQR ? <div className="flex justify-content-between gap-2">
                <Button type="button" outlined label="Choose from gallery" icon="pi pi-image" onClick={() => fileInputRef.current?.click()} />
                <Button severity="danger" icon="pi pi-times" label="Cancel" onClick={() => setScanningQR(false)} />
            </div> : <Button icon="pi pi-qrcode" label="Scan QR" outlined onClick={() => setScanningQR(true)} />}


        </div>
    );

    // return (
    //     <div className="flex flex-column p-4 border-1 border-gray-300 border-round w-10 gap-2">
    //         <span className={`font-semibold text-center ${TEXT_SMALL}`}>Scan QR Code for Psychometric Test Invite</span>
    //         <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onGalleryFileChange} />

    //         

    //     </div>
    // );
}




// <div className="flex flex-column align-items-center justify-content-center p-2 text-center">
// <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onGalleryFileChange} />
// {scanningQR ? <BarcodeScanner
//     onUpdate={(error, result) => {
//         const text = decodedTextFromScan(result);
//         if (text) setScanResult(text);
//     }}
// /> : <img src="/images/scan_qr.png" alt="forbidden" className="w-6rem lg:w-8rem" />}
// <p className={`${TEXT_NORMAL} font-bold`}>Scan QR to Start</p>
// <p className={`${TEXT_SMALL} text-color-secondary text-center px-4`}>
//     Scan QR Code For Psychometric Test Invite, Validate Invite Will Start Test.Check Camera Permission Berfore Scanning QR !
// </p>
// <Button icon="pi pi-qrcode" label="Choose from gallery" outlined onClick={() => setScanningQR(true)} />
// </div>