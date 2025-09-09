import { RUPEE } from "../../constants";
import { Button } from "primereact/button";

import { Tag } from "primereact/tag";

export default function Course({ title, image, price, subject_count, enrolled }) {
    return (
        <div className="flex border-1 border-gray-300  border-round overflow-hidden gap-3">
            <img src={image} alt={title} />
            <div className="flex flex-column gap-2 py-3">
                <span className="font-semibold">{title}</span>

                <div className="flex align-items-center gap-1 ">
                    <i className="pi pi-book text-sm"></i>
                    <p className="m-0 p-0  text-xs ">{`${subject_count} Subjects`}</p>
                </div>

                <div className="flex align-items-center gap-2 ">
                    <span className="text-sm font-bold text-sm">
                        {price} {RUPEE}
                    </span>

                    {enrolled ? (
                        <Tag icon="pi pi-info-circle" value="Enrolled" severity="success" rounded />
                    ) : (
                        <Button iconPos="right" icon="pi pi-info-circle" outlined label="Enroll Now" className="py-1 px-2 text-xs" />
                    )}
                </div>
            </div>
        </div>
    );
}
