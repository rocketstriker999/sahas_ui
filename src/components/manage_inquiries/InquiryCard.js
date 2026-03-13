import { Tag } from "primereact/tag";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Detail from "../common/Detail";
import { Divider } from "primereact/divider";
import { getReadableDate } from "../../utils";

export default function InquiryCard({ id, user_id, email, full_name, phone, active, course_id, branch_id, created_by_full_name, created_at }) {
    const navigate = useNavigate();
    const { courses = [] } = useSelector((state) => state.stateTemplateConfig?.global);
    const { branches = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const course = courses?.find(({ id }) => id === course_id);
    const branch = branches?.find(({ id }) => id === branch_id);

    return (
        <div onClick={() => navigate(`/manage-users/${user_id}/inquiries`)} className="bg-white border-round-md shadow-3 mb-2  p-3  " key={id}>
            <div className="flex justify-content-between align-items-center">
                <div className="flex flex-column gap-2">
                    <span>
                        {id}. {email}
                    </span>
                    <div className="flex align-items-center text-xs gap-1">
                        <span className="pi pi-calendar" />
                        <span>{getReadableDate({ date: created_at })}</span>
                    </div>
                    <div className="flex align-items-center text-xs gap-1">
                        <span className="pi pi-pen-to-square" />
                        <span>Created By {created_by_full_name}</span>
                    </div>
                </div>

                <div>{!!active ? <Tag severity="success" value="Open" /> : <Tag severity="danger" value="Closed" />}</div>
            </div>

            <Divider />

            <div className="flex mt-2 align-items-center  flex-wrap">
                {full_name && <Detail className={"flex-1"} title="Name" value={full_name} icon="pi pi-user" />}
                {phone && <Detail className={"flex-1"} title="Contact" value={phone} icon="pi pi-phone" />}
            </div>

            <div className="flex mt-2 align-items-center  ">
                <Detail className={"flex-1"} title="Branch" value={branch?.title} icon="pi pi-building" />
                <Detail className={"flex-1"} title="Course" value={course?.title} icon="pi pi-building" />
            </div>
        </div>
    );
}
