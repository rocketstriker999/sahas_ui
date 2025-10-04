import { Badge } from "primereact/badge";

export function ChaptersHead({ onClick, selected, totalCourses = 2 }) {
    return (
        <div
            className={`flex justify-content-center align-items-center gap-2 p-3 ${selected && "border-bottom-2 bg-gray-100 border-round-top"} `}
            style={{ cursor: "pointer" }}
            onClick={onClick}
        >
            <Badge value={totalCourses} />
            <span className="font-bold white-space-nowrap">Courses</span>
            <i className="pi pi-book"></i>
        </div>
    );
}
