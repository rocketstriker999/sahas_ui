import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Image } from 'primereact/image';
import { classNames } from 'primereact/utils';
import src from "./greenTick.png";

export default function PaymentLoading() {
    const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPaymentSuccessful(true);
        }, 3000);
        }, []);
    return (
        <Card
            className="flex align-items-center justify-content-center text-center min-h-screen"
            pt={{
                body:classNames("shadow-5")
            }}
        >
              {isPaymentSuccessful ? (
                <Image
                    src={src}
                    alt="Payment Successful"
                    width="100"
                    height="100"
                />
            ) : (
            <ProgressSpinner
                style={{ width: '50px', height: '50px' }}
                strokeWidth="4"
                animationDuration=".7s"
            />
            )}
            <p className="font-semibold text-base w-15rem">
                {isPaymentSuccessful
                    ? "Payment Successful"
                    : "Validating your payment status"}
            </p>
        </Card>
    );
}
