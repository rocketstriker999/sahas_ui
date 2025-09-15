import { OrderList } from "primereact/orderlist";
import { classNames } from "primereact/utils";

export default function OrderManager({ items, setItems, itemTemplate }) {
    return (
        <OrderList
            pt={{
                root: classNames("flex flex-1 flex-column overflow-hidden gap-2"),
                controls: classNames("flex flex-row gap-2 p-0"),
                container: classNames("px-2 overflow-y-scroll"),
                list: {
                    style: { maxHeight: "none", minHeight: "none" },
                    className: "border-0 p-0   ",
                },
                item: classNames("p-0"),
            }}
            dataKey="id"
            value={items}
            onChange={(e) => setItems(e.value)}
            itemTemplate={itemTemplate}
            dragdrop
        />
    );
}
