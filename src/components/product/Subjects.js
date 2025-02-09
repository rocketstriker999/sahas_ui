import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoContent from "../common/NoContent";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Ripple } from "primereact/ripple";

export default function Subjects() {
    const navigate = useNavigate();
    const { courseId } = useParams();

    const { catelogue } = useAppContext();

    const subjects = catelogue?.subjects?.filter((subject) => subject.course_id == courseId);

    return subjects?.length > 0 ? (
        <Fragment>
            <div className="flex justify-content-between align-items-center px-3 text-sm font-bold text-primary">
                <p onClick={() => navigate(-1)}>
                    <i className="pi pi-arrow-left mr-1 text-xs"></i> Back
                </p>
                <p>{`( ${subjects.length} Subjects )`}</p>
            </div>
            {subjects.map((subject, index) => (
                <div
                    key={subject.id}
                    onClick={() => navigate(`subjects/${subject.id}`)}
                    className="p-3 border-round shadow-3 mb-3 mx-3 flex align-items-center justify-content-between relative overflow-hidden"
                >
                    <Ripple
                        pt={{
                            root: { style: { background: "rgba(102, 189, 240, 0.4)" } },
                        }}
                    />
                    <div className="flex flex-column">
                        <p className="text-sm font-bold m-0 mb-2">
                            {index + 1}. {subject.title}
                        </p>
                        <div className="flex align-items-center">
                            <i className="pi pi-file mr-1 text-primary"></i>
                            <span className="text-xs text-gray-800">{subject.chapters_count} Chapters</span>
                        </div>
                    </div>
                    <i className="pi pi-angle-right text-primary"></i>
                </div>
            ))}
        </Fragment>
    ) : (
        <NoContent />
    );
}
