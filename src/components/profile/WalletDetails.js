import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { requestAPI } from '../../utils';

const WalletDetails = () => {
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.stateUser.user);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loggedInUser?.id) {
            requestAPI({
                requestMethod: "GET",
                requestPath: `users/profile/${loggedInUser.id}/get-details`,
                setLoading: setLoading,
                onResponseReceieved: (userData, responseCode) => {
                    if (userData && responseCode === 200) {
                        setUser(userData);
                    }
                }
            });
        }
    }, [loggedInUser]);

    const handleWithdraw = () => {
    navigate('withdraw-details', {
        state: { walletAmount: user?.wallet ?? 0 }
    });
};

    return (
        <div className="p-4">
            <h2 className="text-xl md:text-2xl font-bold border-bottom-1 surface-border pb-2 m-0">
                Wallet Details
            </h2>

            <div className="w-full p-4 text-center">
                <i className="pi pi-wallet text-4xl text-primary mb-3"></i>
                <div className="text-2xl font-bold text-900 mb-3">
                    ₹ {user?.wallet ?? 0}
                </div>
                <Button
                    label="Withdraw"
                    icon="pi pi-arrow-up"
                    className="text-xs md:text-sm mt-3"
                    onClick={handleWithdraw}
                    disabled={!user || user.wallet <= 0}
                />
            </div>
        </div>
    );
};

export default WalletDetails;
