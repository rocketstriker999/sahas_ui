import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import TabHeader from "../common/TabHeader";
import { Button } from "primereact/button";
import DialogAddCategory from "./DialogAddCategory";
import Category from "./Category";
import { Divider } from "primereact/divider";
import OrderManager from "../common/OrderManager";

export default function Categories() {
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState();
    const [repositioning, setRepositioning] = useState();

    const [error, setError] = useState();
    const { requestAPI, showToast } = useAppContext();

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
        <div className="flex-1 overflow-hidden flex flex-column">
            <TabHeader
                className={"px-3 pt-3"}
                title="Enrollments & Courses"
                highlights={["New Enrollments Can be Happen Here", "Enrolled Courses Can Be Explored"]}
                actionItems={[
                    <Button
                        onClick={() => setDialogAddCategory((prev) => ({ ...prev, visible: true, closeDialog: closeDialogAddCategory }))}
                        icon="pi pi-plus"
                        severity="warning"
                    />,
                    <Button
                        disabled={!categories?.length}
                        onClick={() => {
                            showToast({
                                severity: "info",
                                summary: "Repositioning",
                                detail: `Repositioning Mode ${!repositioning ? "Enabled" : "Disabled"}`,
                                life: 1000,
                            });
                            setRepositioning((prev) => !prev);
                        }}
                        icon="pi pi-list"
                    />,
                ]}
            />

            <Divider />

            {loading ? (
                <Loading message="Loading Categories" />
            ) : error ? (
                <NoContent error={error} />
            ) : categories?.length ? (
                repositioning ? (
                    <OrderManager items={categories} setItems={setCategories} itemTemplate={Category} />
                ) : (
                    <div className="flex-1 flex flex-column gap-2 p-2 overflow-y-scroll ">
                        {categories?.map((category) => (
                            <Category key={category?.id} {...category} />
                        ))}
                    </div>
                )
            ) : (
                <NoContent error={"No Categories Found"} />
            )}

            <DialogAddCategory {...dialogAddCategory} setCategories={setCategories} />
        </div>
    );
}
