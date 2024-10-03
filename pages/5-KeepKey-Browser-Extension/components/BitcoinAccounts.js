import { useState } from 'react';
import CustomButton from './CustomButton';

const BitcoinAccounts = () => {
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);

    const requestAccount = async () => {
        if (!window.keepkey || !window.keepkey.bitcoin) {
            setError('KeepKey extension is not available.');
            return;
        }

        try {
            const accounts = await window.keepkey.bitcoin.request({
                method: 'request_accounts',
            });
            setAccount(accounts[0]);
            setError(null);
        } catch (err) {
            setError('Error fetching accounts: ' + err.message);
        }
    };

    return (
        <div className="container">
            <h1>Get Bitcoin Account</h1>
            <CustomButton onClick={requestAccount}>
                Request Bitcoin Account
            </CustomButton>

            {account && (
                <div className="account-box">
                    <p>Account Address:</p>
                    <p>{account}</p>
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default BitcoinAccounts;
