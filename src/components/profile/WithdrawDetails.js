import React from 'react';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { useLocation } from 'react-router-dom';

const WithdrawDetails = () => {

    const location = useLocation();
    const walletAmount = location.state?.walletAmount;
    return (
        <div className="flex flex-column p-4 w-full">
            <h2 className="text-xl md:text-2xl font-bold border-bottom-1 surface-border pb-2 m-0">
                Withdraw Details
            </h2>

            <div className="text-center mb-3">
                <p className="text-xs md:text-sm line-height-3">
                    In order to withdraw your wallet money to your bank account, fill the details below.
                    It may take a few business days to transfer the funds.
                </p>
                <p className="text-pink-500 text-xs md:text-sm font-bold">Available Amount : ₹ {walletAmount}</p>
           

            <div className="mb-3">
                <IconField iconPosition="left" className="w-full">
                    <InputIcon className="pi pi-user" />
                    <InputText className="w-full text-xs md:text-sm" placeholder="Account Holder's Name" />
                </IconField>
            </div>

            <div className="mb-3">
                <IconField iconPosition="left" className="w-full">
                    <InputIcon className="pi pi-building" />
                    <InputText className="w-full text-xs md:text-sm" placeholder="Account Number" />
                </IconField>
            </div>

            <div className="mb-3">
                <IconField iconPosition="left" className="w-full">
                    <InputIcon className="pi pi-credit-card" />
                    <InputText className="w-full text-xs md:text-sm" placeholder="IFSC Code" />
                </IconField>
            </div>

            <div className="mb-4">
                <IconField iconPosition="left" className="w-full">
                    <InputIcon className="pi pi-dollar" />
                    <InputText className="w-full text-xs md:text-sm" placeholder="Withdraw Amount" />
                </IconField>
            </div>

                <Button
                    label="Request Withdraw"
                    icon="pi pi-arrow-up"
                    className="text-xs md:text-sm"
                />
             </div>
        </div>
    );
};

export default WithdrawDetails;
