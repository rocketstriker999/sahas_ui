import { useOutletContext } from "react-router-dom";

import { useCallback, useState } from "react";
import OrderManager from "../common/OrderManager";
import Subject from "./Subject";
import SubjectsHead from "./SubjectsHead";
import DialogEditSubject from "./DialogEditSubject";

export default function Subjects() {
    const { course } = useOutletContext();

    const [subjects, setSubjects] = useState(course?.subjects);

    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    const [dialogEditSubject, setDialogEditSubject] = useState({
        visible: false,
    });

    const closeDialogEditSubject = useCallback(() => {
        setDialogEditSubject((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <div className="flex-1 overflow-hidden flex flex-column">
            <SubjectsHead {...{ course, subjects, setSubjects, updatingViewIndex, setUpdatingViewIndex }} />
            <OrderManager
                updatingViewIndex={updatingViewIndex}
                items={subjects}
                setItems={setSubjects}
                entity="Subjects"
                itemTemplate={(item) => (
                    <Subject setSubjects={setSubjects} {...item} setDialogEditSubject={setDialogEditSubject} updatingViewIndex={updatingViewIndex} />
                )}
            />
            {dialogEditSubject?.visible && <DialogEditSubject {...dialogEditSubject} closeDialog={closeDialogEditSubject} />}
        </div>
    );
}
