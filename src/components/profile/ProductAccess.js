import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { requestAPI } from "../../utils";

const ProductAccess = () => {
    const navigate = useNavigate();
    const [myProducts, setMyProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const loggedInUser = useSelector((state) => state.stateUser.user);

    useEffect(() => {
        requestAPI({
            requestMethod: 'GET',
            requestPath: `access/${loggedInUser?.id}/getProfileUserProductAccess`,
            setLoading: setLoading,
            onResponseReceieved: (data, responseCode) => {
                if (responseCode === 200) {
                    setMyProducts(data);
                }
            }
        });
    }, [loggedInUser?.id]);

    const handleTransactionClick = (product) => {
        navigate(`transaction-details/${product.transaction_id}/${product.product_title}`);
    };

    return (
        <div className="flex flex-column gap-4 p-4">
            <h2 className="text-xl md:text-2xl font-bold border-bottom-1 surface-border pb-2 m-0">
                Course Details
            </h2>
            {myProducts?.length > 0 ? (
                myProducts.map((product) => (
                    <Card
                        key={product.id}
                        title={product.product_title}
                        className="shadow-3 border-round-xl"
                        pt={{
                            title: classNames('text-base md:text-lg font-bold'),
                            content: classNames('p-0')
                        }}
                    >
                        <div className="text-xs sm:text-sm mb-2">
                            <span className="font-semibold">Subscription Duration: </span>
                            {product.validity}
                        </div>
                        <div className="text-xs sm:text-sm">
                            <span className="font-semibold">Course Access: </span>
                            {product.active ? 'Yes' : 'No'}
                        </div>
                        <Button
                            label="Transaction Details"
                            severity="info"
                            raised
                            icon="pi pi-external-link"
                            className="text-xs md:text-sm mt-3"
                            onClick={() => handleTransactionClick(product)}
                        />
                    </Card>
                ))
            ) : (
                <p className="text-center text-color-secondary">
                    {loading ? 'Loading products...' : 'No products found'}
                </p>
            )}
        </div>
    );
};

export default ProductAccess;