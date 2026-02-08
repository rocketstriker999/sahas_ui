import { useCallback, useState } from "react";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";

import Editor from "./DialogDashboard/Editor";
import Footer from "./DialogDashboard/Footer";
import Header from "./DialogDashboard/Header";
import Body from "./DialogDashboard/Body";

import { useDispatch } from "react-redux";
import { updateDashboardDialog } from "../../redux/sliceTemplateConfig";
import NoContent from "../common/NoContent";

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
                <Editor dialogDashboard={dialogDashboard} dialog={dialog} setDialog={setDialog} />
            ) : dialog ? (
                <Body {...dialogDashboard} />
            ) : (
                <NoContent error={"Click Edit To Start"} />
            )}
        </Dialog>
    );
};
