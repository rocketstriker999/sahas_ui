import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useDispatch, useSelector } from "react-redux";

import { classNames } from "primereact/utils";

export default function ProductsSearch({ config }) {
    const dispatch = useDispatch();

    return (
        <div className="p-inputgroup flex">
            <Dropdown
                options={config.product_categories}
                placeholder="Category"
                className="w-5 md:w-4 lg:w-3 flex-none text-xs sm:text-base"
                pt={{
                    input: classNames("text-sm md:text-base"),
                }}
            />
            <InputText
                placeholder="Search"
                className="flex-grow-1"
                pt={{
                    root: classNames("text-sm md:text-base"),
                }}
            />
            <Button icon="pi pi-search" />
        </div>
    );
}
