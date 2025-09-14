import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import { OrderList } from "primereact/orderlist";
import TabHeader from "../common/TabHeader";
import { Button } from "primereact/button";
import DialogAddCategory from "./DialogAddCategory";
import Category from "./Category";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";

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
        <div className="flex-1    overflow-hidden flex flex-column">
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
                ]}
            />

            <Divider />

            {loading ? (
                <Loading message="Loading Categories" />
            ) : error ? (
                <NoContent error={error} />
            ) : categories?.length ? (
                <OrderList
                    pt={{
                        root: classNames("flex flex-1 flex-column overflow-hidden gap-2"),
                        controls: classNames("flex flex-row gap-2 p-0"),
                        container: classNames("mx-2 overflow-y-scroll"),
                        list: {
                            style: { maxHeight: "none", minHeight: "none" },
                            className: "border-0 p-0   ",
                        },
                        item: classNames("p-0"),
                    }}
                    dataKey="id"
                    value={categories}
                    onChange={(e) => setCategories(e.value)}
                    itemTemplate={Category}
                    dragdrop
                />
            ) : (
                // <div className="border-2   bg-red-100 overflow-scroll">
                //     <br />
                //     <p>d \n \n \n \n\n\n\n\n\n\n\n\n\n\n\n\ /n /n nwa daw daw d er er er v5 rv4 e5m4m5 b 5r65 65 yu5 y5 5 6h 56 5 h</p>
                //     <br />
                //     <p>d \n \n \n \n\n\n\n\n\n\n\n\n\n\n\n\ /n /n nwa daw daw d er er er v5 rv4 e5m4m5 b 5r65 65 yu5 y5 5 6h 56 5 h</p>
                //     <br />
                //     <p>d \n \n \n \n\n\n\n\n\n\n\n\n\n\n\n\ /n /n nwa daw daw d er er er v5 rv4 e5m4m5 b 5r65 65 yu5 y5 5 6h 56 5 h</p>
                //     <br />
                //     <p>d \n \n \n \n\n\n\n\n\n\n\n\n\n\n\n\ /n /n nwa daw daw d er er er v5 rv4 e5m4m5 b 5r65 65 yu5 y5 5 6h 56 5 h</p>
                //     <br />
                //     <p>d \n \n \n \n\n\n\n\n\n\n\n\n\n\n\n\ /n /n nwa daw daw d er er er v5 rv4 e5m4m5 b 5r65 65 yu5 y5 5 6h 56 5 h</p>
                //     <br />
                //     <p>d \n \n \n \n\n\n\n\n\n\n\n\n\n\n\n\ /n /n nwa daw daw d er er er v5 rv4 e5m4m5 b 5r65 65 yu5 y5 5 6h 56 5 h</p>
                //     <br />
                //     <p>d \n \n \n \n\n\n\n\n\n\n\n\n\n\n\n\ /n /n nwa daw daw d er er er v5 rv4 e5m4m5 b 5r65 65 yu5 y5 5 6h 56 5 h</p>
                //     <br />
                //     <p>d \n \n \n \n\n\n\n\n\n\n\n\n\n\n\n\ /n /n nwa daw daw d er er er v5 rv4 e5m4m5 b 5r65 65 yu5 y5 5 6h 56 5 h</p>
                // </div>
                <NoContent error={"No Categories Found"} />
            )}

            <DialogAddCategory {...dialogAddCategory} setCategories={setCategories} />
        </div>
    );
}

// <OrderList dataKey="id" value={products} onChange={(e) => setProducts(e.value)} itemTemplate={itemTemplate} header="Products" dragdrop></OrderList>;

//categories?.map((category) => <Category key={category?.id} {...category} />);
