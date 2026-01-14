import { useCallback, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import Editor from "./DialogDashboard/Editor";

import Footer from "./DialogDashboard/Footer";
import Header from "./DialogDashboard/Header";
import { useDispatch } from "react-redux";
import { updateDashboardDialog } from "../../redux/sliceTemplateConfig";

export const DialogDashboard = ({ dialogDashboard }) => {
    const [dialog, setDialog] = useState(dialogDashboard);

    const dispatch = useDispatch();

    const closeDialog = useCallback(() => {
        dispatch(updateDashboardDialog({ active: false }));
    }, [dispatch]);

    return (
        <Dialog
            modal
            header={() => <Header dialogDashboard={dialogDashboard} dialog={dialog} setDialog={setDialog} />}
            visible={dialogDashboard?.active}
            style={{ width: "40vw" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            footer={() => <Footer dialogDashboard={dialogDashboard} dialog={dialog} closeDialog={closeDialog} />}
            onHide={closeDialog}
            draggable={false}
            resizable={false}
            pt={{
                header: classNames("py-3"),
                content: classNames("py-3"),
                footer: classNames("py-3"),
            }}
        >
            {dialogDashboard?.editing ? (
                <Editor dialog={dialog} setDialog={setDialog} />
            ) : (
                <div className="flex flex-column align-items-center gap-3">
                    <div className="w-full border-round overflow-hidden shadow-2">
                        <img src={dialogDashboard?.media_url} alt="News Update" className="w-full block" style={{ maxHeight: "200px", objectFit: "cover" }} />
                    </div>

                    <div className="text-center">
                        <h2 className="m-0 text-900 font-bold">{dialogDashboard?.heading}</h2>
                        <p className="mt-2 text-600 line-height-3">{dialogDashboard?.description}</p>
                    </div>
                    <div className="surface-100 border-round p-2 flex align-items-center gap-2 w-full">
                        <i className="pi pi-info-circle text-blue-500"></i>
                        <span className="text-sm text-700">{dialogDashboard?.note}</span>
                    </div>
                </div>
            )}
        </Dialog>
    );
};
