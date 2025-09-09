import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import Category from "./Category";
import TabHeader from "../common/TabHeader";
import { Button } from "primereact/button";

export default function Categories() {
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState();
    const [adding, setAdding] = useState();

    const [error, setError] = useState();
    const { requestAPI, showToast } = useAppContext();

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

    const addProductCategory = useCallback(() => {
        requestAPI({
            requestPath: `product-categories`,
            requestMethod: "POST",
            requestPostBody: { image: "dawdawda", title: "dawdawd" },
            setLoading: setAdding,
            onResponseReceieved: (productCategory, responseCode) => {
                if (productCategory && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Category Added", life: 1000 });
                    setCategories((prev) => [productCategory, ...prev]);
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Category !", life: 2000 });
            },
        });
    }, [requestAPI, showToast]);

    return (
        <div className="px-3 flex flex-column gap-3">
            <TabHeader
                className="pt-3"
                title="Enrollments & Courses"
                highlights={["New Enrollments Can be Happen Here", "Enrolled Courses Can Be Explored"]}
                actionItems={[<Button onClick={addProductCategory} loading={adding} icon="pi pi-plus" severity="warning" />]}
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
        </div>
    );
}
