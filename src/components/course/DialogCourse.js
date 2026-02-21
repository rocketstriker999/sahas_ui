import { useCallback, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";

import Editor from "./DialogCourse/Editor";
import Footer from "./DialogCourse/Footer";
import Header from "./DialogCourse/Header";
import Body from "./DialogCourse/Body";

export const DialogCourse = ({ dialogCourse, setCourse }) => {
    const [dialog, setDialog] = useState();

    const closeDialog = useCallback(() => setCourse((prev) => ({ ...prev, dialog: { ...prev?.dialog, active: false } })), [setCourse]);

    return (
        <Dialog
            modal
            header={() => <Header dialogCourse={dialogCourse} dialog={dialog} setDialog={setDialog} />}
            visible={dialogCourse?.active}
            style={{ width: "40vw" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            footer={() => <Footer setCourse={setCourse} dialogCourse={dialogCourse} dialog={dialog} closeDialog={closeDialog} />}
            onHide={closeDialog}
            draggable={false}
            resizable={false}
            pt={{
                header: classNames("py-3"),
                content: classNames("py-3"),
                footer: classNames("py-3"),
            }}
        >
            {dialogCourse?.editing ? <Editor dialogCourse={dialogCourse} dialog={dialog} setDialog={setDialog} /> : <Body {...dialogCourse} />}
        </Dialog>
    );
};
