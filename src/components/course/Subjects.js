import { useOutletContext } from "react-router-dom";

import { useState } from "react";
import OrderManager from "../common/OrderManager";
import Subject from "./Subject";
import SubjectsHead from "./SubjectsHead";

export default function Subjects() {
    const { id, image, enrollment, ...props } = useOutletContext();

    const [subjects, setSubjects] = useState(props?.subjects);

    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    return (
        <div className="flex-1 overflow-hidden flex flex-column">
            <SubjectsHead {...{ courseId: id, subjects, setSubjects, updatingViewIndex, setUpdatingViewIndex }} />
            <OrderManager
                updatingViewIndex={updatingViewIndex}
                items={subjects}
                setItems={setSubjects}
                entity="Subjects"
                itemTemplate={(item) => <Subject setSubjects={setSubjects} {...item} updatingViewIndex={updatingViewIndex} />}
            />
        </div>
    );
}
