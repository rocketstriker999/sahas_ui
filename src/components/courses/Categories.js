import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import Category from "./Category";
import TabHeader from "../common/TabHeader";
import { Button } from "primereact/button";
import DialogAddCategory from "./DialogAddCategory";

export default function Categories() {
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState();

    const [error, setError] = useState();
    const { requestAPI } = useAppContext();

    const [dialogAddCategory, setDialogAddCategory] = useState({
        visible: false,
    });

    const closeDialogAddCategory = useCallback(() => {
        setDialogAddCategory((prev) => ({ ...prev, visible: false }));
    }, []);

    useEffect(() => {
        requestAPI({
            requestPath: `product-categories`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,
            onResponseReceieved: (categories, responseCode) => {
                if (categories && responseCode === 200) {
                    setCategories(categories);
                } else {
                    setError("Couldn't load Product Categories");
                }
            },
        });
    }, [requestAPI]);

    return (
        <div className="px-3 flex flex-column gap-3">
            <TabHeader
                className="pt-3"
                title="Enrollments & Courses"
                highlights={["New Enrollments Can be Happen Here", "Enrolled Courses Can Be Explored"]}
                actionItems={[
                    <Button
                        onClick={() => setDialogAddCategory((prev) => ({ ...prev, visible: true, closeDialog: closeDialogAddCategory }))}
                        icon="pi pi-plus"
                        severity="warning"
                    />,
                ]}
            />

            {loading ? (
                <Loading message="Loading Categories" />
            ) : error ? (
                <NoContent error={error} />
            ) : categories?.length ? (
                categories?.map((category) => <Category key={category?.id} {...category} />)
            ) : (
                <NoContent error={"No Categories Found"} />
            )}

            <DialogAddCategory {...dialogAddCategory} />
        </div>
    );
}
