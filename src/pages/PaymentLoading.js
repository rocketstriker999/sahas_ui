import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { classNames } from 'primereact/utils';

export default function PaymentLoading() {
    return (
        <Card
            className="flex align-items-center justify-content-center text-center min-h-screen"
            pt={{
                body:classNames("shadow-5")
            }}
        >
            <ProgressSpinner
                style={{ width: '50px', height: '50px' }}
                strokeWidth="4"
                animationDuration=".7s"
            />
            <p className="mt-4 font-semibold text-base">
                Validating your payment status
            </p>
        </Card>
    );
}
