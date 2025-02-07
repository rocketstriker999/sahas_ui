import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Message } from 'primereact/message';

const AdminUserProductAccess = () => {
    const [email, setEmail] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [validityDate, setValidityDate] = useState(null);
    const [transactionId, setTransactionId] = useState('');
    const [error, setError] = useState(false);

    const products = [
        { name: '11th Commerce English Medium - GSEB', code: '1' },
        { name: '12th Commerce English Medium - GSEB', code: '2' },
        { name: 'First Year BCOM - Sem 1', code: '3' },
        { name: 'First Year BCOM - Sem 2', code: '4' },
        { name: 'First Year BCOM - Sem 1 & 2 Combo', code: '5' },
        { name: 'Second Year BCOM - Sem 3', code: '6' },
        { name: 'Second Year BCOM - Sem 4', code: '7' },
        { name: 'Second Year BCOM - Sem 3 & 4 Combo', code: '8' },
        { name: 'Third Year BCOM - Sem 5', code: '9' },
        { name: 'Third Year BCOM - Sem 6', code: '10' },
        { name: 'Third Year BCOM - Sem 5 & 6 Combo', code: '11' },
        { name: 'CS Executive Module 1', code: '12' },
        { name: 'CS Executive Module 2', code: '13' },
        { name: 'ગુજરાતીમાં વાંચન માટે સ્પેશિયલ Course', code: '14' },
        { name: 'CBSE 11th Commerce', code: '15' },
        { name: 'CSEET [ C.S. 1st Level ]', code: '16' },
        { name: '૧૨ કોર્સીસ [ગુજરાતી માધ્યમ]', code: '17' }
    ];
    const validateEmail = (value) => {
        const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|icloud\.com)$/;
        if (!regex.test(value)) {
            setError(true);
        } else {
            setError(false);
        }
        setEmail(value);
    };

    const handleAddAccess = () => {
        console.log({
            email,
            selectedProduct,
            validityDate,
            transactionId
        });
    };

    const handleCancel = () => {
        setEmail('');
        setSelectedProduct(null);
        setValidityDate(null);
        setTransactionId('');
    };

    return (
        <div className="flex justify-content-center align-items-center p-4">
            <Card title="Add User Product Access">
                <div className="grid gap-2">

                    <div className="col-12">
                        <label htmlFor="email" className="block mb-2">User Email</label>
                        <InputText
                            id="email"
                            type="email"
                            value={email}
                            className={`w-full ${error ? 'p-invalid' : ''}`}
                            onChange={(e) => validateEmail(e.target.value)}
                            placeholder="Enter user email"
                        />
                        {error && (
                            <Message severity="error" text="Please enter a valid email from gmail.com, yahoo.com, hotmail.com, or icloud.com." className="mt-2" />
                        )}
                    </div>

                    <div className="col-12">
                        <label htmlFor="product" className="block mb-2">Product</label>
                        <Dropdown
                            id="product"
                            value={selectedProduct}
                            options={products}
                            onChange={(e) => setSelectedProduct(e.value)}
                            optionLabel="name"
                            placeholder="Select a Product"
                            className="inputtext-sm w-full"
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="validity" className="block mb-2">Validity Date</label>
                        <Calendar
                            id="validity"
                            value={validityDate}
                            onChange={(e) => setValidityDate(e.value)}
                            showIcon
                            dateFormat="yy/mm/dd"
                            placeholder="Select validity date"
                            className="inputtext-sm w-full"
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="transaction" className="block mb-2">Transaction ID</label>
                        <InputText
                            id="transaction"
                            keyfilter="num"
                            className="w-full"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Enter transaction ID"
                        />
                    </div>

                    <div className="flex justify-content-end  mt-4 gap-2">
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            className="p-button-text p-button-danger"
                            onClick={handleCancel}
                        />
                        <Button
                            label="Add Access"
                            icon="pi pi-check"
                            className="p-button-success"
                            onClick={handleAddAccess}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AdminUserProductAccess;
