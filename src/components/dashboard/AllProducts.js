import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import Product from "./Product";
import NoContent from "../common/NoContent";
import { Badge } from "primereact/badge";
import { useAppContext } from "../../providers/ProviderApp";

export default function AllProducts() {
    const { catelogue } = useAppContext();

    if (catelogue?.categories?.length > 0 && catelogue?.products?.length > 0) {
        return (
            <Accordion className="m-3">
                {catelogue.categories.map((category) => {
                    const associatedProducts = catelogue.products.filter((product) => product.category_id === category.id);
                    return (
                        <AccordionTab
                            key={category.id}
                            className="m-0"
                            header={
                                <div className="flex align-items-center justify-content-between">
                                    <span>{category.title}</span>
                                    <Badge value={category.products_count} className="ml-2 bg-primary" />
                                </div>
                            }
                            pt={{
                                root: { className: classNames("mb-2") },
                                content: { className: classNames("p-0") },
                            }}
                        >
                            {associatedProducts.length > 0 ? (
                                associatedProducts.map((product, index) => (
                                    <div key={product.id}>
                                        {index !== 0 && <Divider className="p-0 m-0" />}
                                        <Product product={product} />
                                    </div>
                                ))
                            ) : (
                                <NoContent />
                            )}
                        </AccordionTab>
                    );
                })}
            </Accordion>
        );
    }

    return <NoContent />;
}
