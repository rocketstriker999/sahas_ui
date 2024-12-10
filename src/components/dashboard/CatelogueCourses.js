import React, { Fragment, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import Product from "./Product";

export default function DynamicDemo() {
    const [tabs] = useState([
        {
            category_name: "10th",
            products: [
                {
                    id: 1,
                    name: "ChatGPT Complete Guide: Learn actionable",
                    image: "https://placehold.co/100x100/yellow/000000/png",
                    price: 99,
                    discount: 10,
                    totalHours: 12,
                    lectures: 50,
                },
                {
                    id: 1,
                    name: "This Would Be Any Product 2",
                    image: "https://placehold.co/100x100/green/FFFFFF/png",
                    price: 99,
                    discount: 10,
                    totalHours: 12,
                    lectures: 50,
                },
                {
                    id: 1,
                    name: "ChatGPT Complete Guide: Learn actionable",
                    image: "https://placehold.co/100x100/yellow/000000/png",
                    price: 99,
                    discount: 10,
                    totalHours: 12,
                    lectures: 50,
                },
                {
                    id: 1,
                    name: "This Would Be Any Product 2",
                    image: "https://placehold.co/100x100/green/FFFFFF/png",
                    price: 99,
                    discount: 10,
                    totalHours: 12,
                    lectures: 50,
                },
                {
                    id: 1,
                    name: "ChatGPT Complete Guide: Learn actionable",
                    image: "https://placehold.co/100x100/yellow/000000/png",
                    price: 99,
                    discount: 10,
                    totalHours: 12,
                    lectures: 50,
                },
                {
                    id: 1,
                    name: "This Would Be Any Product 2",
                    image: "https://placehold.co/100x100/green/FFFFFF/png",
                    price: 99,
                    discount: 10,
                    totalHours: 12,
                    lectures: 50,
                },
            ],
        },
        {
            category_name: "11th",
            products: [
                {
                    id: 1,
                    name: "ChatGPT Complete Guide: Learn actionable",
                    image: "https://placehold.co/100x100/blue/FFFFFF/png",
                    price: 99,
                    discount: 10,
                    totalHours: 12,
                    lectures: 50,
                },
                {
                    id: 1,
                    name: "This Would Be Any Product 2",
                    image: "https://placehold.co/100x100/yellow/FFFFFF/png",
                    price: 99,
                    discount: 10,
                    totalHours: 12,
                    lectures: 50,
                },
            ],
        },
    ]);

    const createDynamicTabs = () => {
        return tabs.map((tab) => (
            <AccordionTab
                className="m-0"
                header={tab.category_name}
                pt={{
                    root: { className: classNames("mb-2"), key: tab.category_name },
                    content: { className: classNames("p-0") },
                }}
            >
                {tab.products.map((product, position) => (
                    <Fragment>
                        {position !== 0 && <Divider className="p-0 m-0" />}
                        <Product product={product} />
                    </Fragment>
                ))}
            </AccordionTab>
        ));
    };

    return <Accordion>{createDynamicTabs()}</Accordion>;
}
