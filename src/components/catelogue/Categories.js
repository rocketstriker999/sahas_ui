import { useState } from "react";

import Category from "./Category";
import { Divider } from "primereact/divider";
import OrderManager from "../common/OrderManager";
import { useOutletContext } from "react-router-dom";
import CategoriesHeader from "./CategoriesHeader";

export default function Categories() {
    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    const { categories, setCategories } = useOutletContext();

    return (
        <div className="flex-1 overflow-hidden flex flex-column">
            <CategoriesHeader {...{ categories, updatingViewIndex, setUpdatingViewIndex }} />

            <Divider />

            <OrderManager
                updatingViewIndex={updatingViewIndex}
                items={categories}
                setItems={setCategories}
                entity={"Categories"}
                itemTemplate={(item) => <Category {...item} updatingViewIndex={updatingViewIndex} />}
            />
        </div>
    );
}
