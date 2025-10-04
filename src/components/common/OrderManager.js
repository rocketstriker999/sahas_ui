import { OrderList } from "primereact/orderlist";
import { classNames } from "primereact/utils";
import NoContent from "./NoContent";

export default function OrderManager({ items, emptyItemsError, setItems, itemTemplate, updatingViewIndex }) {
    if (!items?.length) {
        return <NoContent error={emptyItemsError} />;
    }
    return (
        <OrderList
            pt={{
                root: classNames("flex flex-1 flex-column overflow-hidden gap-2"),
                controls: classNames(!!updatingViewIndex ? `flex flex-row gap-2 p-0` : "hidden"),
                container: classNames("px-2 pb-2 overflow-y-scroll"),
                list: {
                    style: { maxHeight: "none", minHeight: "none" },
                    className: `border-0 p-0 flex flex-column `,
                },
                item: classNames("p-0"),
            }}
            dataKey="id"
            value={items}
            onChange={(e) => {
                if (!!updatingViewIndex) setItems(e.value);
            }}
            itemTemplate={itemTemplate}
            dragdrop={true}
        />
    );
}
