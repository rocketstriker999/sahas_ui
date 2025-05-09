import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { getResource } from '../../utils';
import { useLocation } from 'react-router-dom';

const TransactionDetails = () => {
    const { state } = useLocation();
    const transaction = state?.transaction;

    return (
        <div className="flex flex-column gap-4 p-4">
            <h2 className="text-xl md:text-2xl font-bold border-bottom-1 surface-border pb-2 m-0">
                Transaction Details
            </h2>

            {transaction ? (
                <Card title={`Transaction for: ${transaction.product_title}`} className="shadow-3 border-round-xl" pt={{
                    title: classNames('text-sm md:text-base font-bold'),
                }}>
                    <div className="text-xs md:text-sm mb-2">
                        <span className="font-semibold">Transaction ID: </span> {transaction.transaction_id}
                    </div>
                    <div className="text-xs md:text-sm mb-2">
                        <span className="font-semibold">Course Price: </span> ₹{transaction.course_price}
                    </div>
                    <div className="text-xs md:text-sm mb-2">
                        <span className="font-semibold">SGST: </span> {transaction.sgst}
                    </div>
                    <div className="text-xs md:text-sm mb-2">
                        <span className="font-semibold">CGST:  </span> {transaction.cgst}
                    </div>
                    <div className="text-xs md:text-sm mb-2">
                        <span className="font-semibold">Total Paid: </span> ₹{transaction.total_pay}
                    </div>
                    <div className="text-xs md:text-sm mb-2">
                        <span className="font-semibold">Access Validity: </span> {transaction.product_access_validity}
                    </div>
                    <Button label="Download Receipt" icon="pi pi-download" severity="info" raised className="text-xs md:text-sm mt-3" disabled={!transaction?.invoice}
                        onClick={() => window.open(getResource(transaction?.invoice))} />
                </Card>
            ) : (
                <div>No transaction details available.</div>
            )}
        </div>
    );
};

export default TransactionDetails;
