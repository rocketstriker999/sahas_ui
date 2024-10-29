import { TabMenu } from 'primereact/tabmenu';
import React, { useState } from 'react';
import useAPI from '../../hooks/useAPI';
import { DataView } from 'primereact/dataview';
import Product from '..//product/Product';

export default function Courses() {

    const [activeIndex, setActiveIndex] = useState(0);

    const [showCaseProducts, isLoadingShowCaseProducts, errorShowCaseProducts] = useAPI({ requestPath: "template-details/showcase-products" });

    const listTemplate = (products) => {

        if (!products || products.length === 0) {
            return <p className='text-color-secondary text-center m-6 font-bold'>No Content Found !</p>
        }

        return (
            <div className="grid grid-nogutter">
                {products.map((product, index) =>
                    <Product price={product.productPrice} buyers={188} ratings={4} publisher="Bhavin Shah" title={product.productName} imageURL={"https://placehold.co/100x50"} className="p-2 col-12 sm:col-4 lg:col-3 xl:col-3 " key={product.productId} />)}
            </div>
        );
    };

    return (
        <div>
            <header>
                <h1 className="font-bold">All Courses You Need at One Place</h1>
                <p>Empower your learning journey with a wide range of courses tailored for your success.</p>
            </header>

            <TabMenu
                className='mb-3'
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
                pt={{
                    action: {
                        style: { backgroundColor: "transparent", },
                    },
                    menu: {
                        style: { backgroundColor: "transparent", },
                    },

                }} model={showCaseProducts.map((showCaseProduct) => {
                    return { label: showCaseProduct.categoryName }
                })} />

            <DataView
                unstyled={true}
                value={showCaseProducts.length > 0 ? showCaseProducts[activeIndex].modelProducts : []}
                listTemplate={listTemplate}
                layout='grid'
            />

            

        </div>);


}