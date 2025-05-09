import React from 'react';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const ProductAccess = () => {
    const navigate = useNavigate();

    const userId = 123; // Dummy user ID

    const myProducts = [
        {
            id: 1,
            title: 'First Year B Com Sem 1',
            access_validity: '1/05/2026',
            has_access: true,
        },
        {
            id: 2,
            title: 'First Year B Com Sem 3 and 4 Combo',
            access_validity: '1/05/2026',
            has_access: false,
        },
        {
            id: 3,
            title: 'Third Year TYBCom Sem 3',
            access_validity: '1/05/2026',
            has_access: true,
        },
    ];

    const handleTransactionClick = (product) => {
        setTimeout(() => {
            const dummyTransaction = {
                transaction_id: 123,
                product_id: product.id,
                product_title: product.title,
                total_pay: 5000,
                course_price: 4100,
                sgst: 450,
                cgst: 450,
                invoice: 'ef00156ff55d11ef8c24bc2411608874.pdf',
                product_access_validity: '2025-03-22 16:10:38'
            };

            navigate(`transaction-details/${userId}/${product.id}`, { state: { transaction: dummyTransaction } });
        }, 1000);
    };
    return (
        <div className="flex flex-column gap-4 p-4">
            <h2 className="text-xl md:text-2xl font-bold border-bottom-1 surface-border pb-2 m-0">
                Course Details
            </h2>
            {myProducts.map((product) => (
                <Card title={product.title} className="shadow-3 border-round-xl"
                    pt={{
                        title: classNames('text-base md:text-lg font-bold'),
                        content:classNames('p-0')
                    }}>
                    <div className="text-xs sm:text-sm mb-2">
                        <span className="font-semibold">Subscription Duration: </span>
                        {product.access_validity}
                    </div>
                    <div className="text-xs sm:text-sm">
                        <span className="font-semibold">Course Access: </span>
                        {product.has_access ? 'Yes' : 'No'}
                    </div>
                    <Button label="Transaction Details" severity="info" raised icon="pi pi-external-link" className="text-xs md:text-sm mt-3" onClick={() => handleTransactionClick(product)} />
                </Card>
            ))}
        </div>

    );
};

export default ProductAccess;




// import React from 'react';
// import { Divider } from 'primereact/divider';
// import { useAppContext } from "../../providers/ProviderAppContainer";
// import { getResource } from "../../utils";
// import { Button } from 'primereact/button';

// const ProductAccess = () => {
//     // Get the catalogue data from the context
//     const { catelogue } = useAppContext();

//     // Filter products with access
//     const myProducts = catelogue?.products?.filter((product) => product.has_access);

//     return (
//         <div className="flex flex-column">
//             {myProducts?.map((product, index) => (
//                 <div key={product.id} className="p-2">
//                     <div className="mb-2 text-color-secondary text-xs sm:text-sm">
//                         Course Name - <span className="text-color font-semibold">{product.title}</span>
//                     </div>
//                     <div className="mb-2 text-color-secondary text-xs sm:text-sm">
//                         Course Validity - <span className="text-color font-semibold">{product.access_validity || 'Not specified'}</span>
//                     </div>
//                     <div className="mb-2 text-color-secondary text-xs sm:text-sm">
//                         Course Price - <span className="text-color font-semibold">₹{product.price}</span>
//                     </div>
//                     <Button
//                         label="Download Fee Receipt"
//                         severity="info"
//                         className="p-2 text-xs sm:text-sm"
//                         raised
//                         disabled={!product?.invoice}
//                         onClick={() => window.open(getResource(product?.invoice))}
//                     />
//                     {index !== myProducts.length - 1 && <Divider />}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ProductAccess;
