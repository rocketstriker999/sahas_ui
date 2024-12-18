import React, { useEffect, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import Product from "./Product";
import { requestProxy } from "../../utils";
import NoContent from "../common/NoContent";
import { Badge } from "primereact/badge";
import Loading from "../common/Loading";

export default function AllProducts() {
    const [catelogue, setCatelogue] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        //hit API Once
        requestProxy({
            requestPath: "/api/products/catelogue",
            setLoading: setLoading,
            setError: setError,
            onResponseReceieved: (catelogue, responseCode) => {
                if (catelogue && responseCode === 200) {
                    setCatelogue(catelogue);
                }
            },
        });
    }, []);

    if (loading) return <Loading />;

    if (error) return <NoContent error />;

    if (catelogue) {
        return catelogue.length > 0 ? (
            <Accordion className="m-3">
                {catelogue.map((category) => (
                    <AccordionTab
                        key={"dawda"}
                        className="m-0"
                        header={
                            <div className="flex align-items-center justify-content-between">
                                <span>{category.title}</span>
                                <Badge value={category.products.length} className="ml-2 bg-primary" />
                            </div>
                        }
                        pt={{
                            root: { className: classNames("mb-2") },
                            content: { className: classNames("p-0") },
                        }}
                    >
                        {category.products?.length > 0 ? (
                            category.products.map((product, position) => (
                                <div key={product.id}>
                                    {position !== 0 && <Divider className="p-0 m-0" />}
                                    <Product product={product} />
                                </div>
                            ))
                        ) : (
                            <NoContent />
                        )}
                    </AccordionTab>
                ))}
            </Accordion>
        ) : (
            <NoContent />
        );
    }
}
