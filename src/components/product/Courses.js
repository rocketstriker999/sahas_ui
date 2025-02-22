import { Fragment } from "react";
import NoContent from "../common/NoContent";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";

export default function Courses() {
    const navigate = useNavigate();
    const { productId } = useParams();

    const { catelogue } = useAppContext();

    const product = catelogue?.products?.find((product) => product.id == productId);

    const courses = catelogue.courses?.filter((course) => course.product_id == productId);

    return courses?.length > 0 ? (
        <Fragment>
            <div className="flex justify-content-between align-items-center px-3 text-sm font-bold text-primary">
                <p onClick={() => navigate(-1)}>
                    <i className="pi pi-arrow-left mr-1 text-xs"></i> Back
                </p>
                <p>{`( ${courses?.length} Courses )`}</p>
            </div>
            {courses.map((course, index) => (
                <div
                    key={course.id}
                    onClick={() => navigate(`courses/${course.id}`)}
                    className="p-3 border-round shadow-3 mb-3 mx-3 flex align-items-center justify-content-between relative overflow-hidden"
                >
                    <Ripple
                        pt={{
                            root: { style: { background: "rgba(102, 189, 240, 0.4)" } },
                        }}
                    />
                    <div className="flex flex-column">
                        <p className="text-sm font-bold m-0 mb-2">
                            {index + 1}. {course.title}
                        </p>
                        <div className="flex align-items-center  ">
                            <i className="pi pi-book mr-1 text-primary"></i>
                            <span className="text-xs text-gray-800">{course.subjects_count} Subjects</span>
                        </div>
                        {course?.whatsapp_group && product?.has_access && (
                            <Button
                                icon="pi pi-whatsapp"
                                label="Join WhatsApp Group"
                                className="p-button-success text-xs p-2 mt-2"
                                onClick={() => window.open(`https://chat.whatsapp.com/${course.whatsapp_group}`, "_blank")}
                            />
                        )}
                    </div>
                    <i className="pi pi-angle-right text-primary"></i>
                </div>
            ))}
        </Fragment>
    ) : (
        <NoContent error="No Courses Found" />
    );
}
