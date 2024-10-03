import { useState } from 'react';
import CustomButton from './CustomButton';
import CustomCard from './CustomCard';

const BitcoinBalance = () => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [data, setData] = useState(null); // For full JSON response
    const [error, setError] = useState(null);
    const BTC_TO_USD = 65000; // Placeholder for USD conversion

    const requestBitcoinBalance = async () => {
        if (!window.keepkey || !window.keepkey.bitcoin) {
            setError('KeepKey extension is not available.');
            return;
        }

        try {
            const balance = await window.keepkey.bitcoin.request({
                method: "request_balance",
            });
            console.log('balance', balance);
            setBalance(balance[0].balance);
            setData(balance[0]); // Store full data
            setError(null);
        } catch (err) {
            setError('Error fetching accounts: ' + err.message);
        }
    };

    const formatBalance = (btc) => {
        return parseFloat(btc).toFixed(8); // Format BTC to 8 decimal places
    };

    const calculateUSDValue = (btc) => {
        return (btc * BTC_TO_USD).toFixed(2); // Calculate USD value based on BTC price
    };

    return (
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#1D4ED8' }}>Bitcoin Balance Checker</h1>
            <p style={{ marginBottom: '1rem', color: '#6B7280' }}>Get your Bitcoin account balance instantly using KeepKey</p>
            <CustomButton onClick={requestBitcoinBalance}>
                Request Bitcoin Account
            </CustomButton>

            {account && (
                <CustomCard>
                    <img
                        src="https://pioneers.dev/coins/bitcoin.png"
                        alt="Bitcoin Logo"
                        style={{ width: '40px', height: '40px', marginBottom: '1rem' }}
                    />
                    {balance !== null && (
                        <>
                            <p style={{ fontWeight: 'bold', color: '#374151' }}>Balance:</p>
                            <p style={{ color: '#1F2937' }}>{formatBalance(balance)} BTC</p>
                            <p style={{ fontWeight: 'bold', color: '#374151' }}>USD Value:</p>
                            <p style={{ color: '#1F2937' }}>${calculateUSDValue(balance)}</p>
                        </>
                    )}
                </CustomCard>
            )}

            {data && (
                <CustomCard>
                    <h3 style={{ fontSize: '1.25rem', color: '#111827', marginBottom: '0.5rem' }}>Full Account Data (JSON):</h3>
                    <pre style={{
                        backgroundColor: '#F9FAFB',
                        padding: '1rem',
                        borderRadius: '0.375rem',
                        textAlign: 'left',
                        overflowX: 'auto',
                        color: '#374151',
                        maxHeight: '200px',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </CustomCard>
            )}

            {error && <p style={{ color: '#DC2626' }}>{error}</p>}
        </div>
    );
};

export default BitcoinBalance;
