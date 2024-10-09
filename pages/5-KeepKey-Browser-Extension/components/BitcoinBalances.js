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
        <div style={{
            padding: '1rem',
            textAlign: 'center',
            backgroundColor: 'black',
            minHeight: '100vh',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Centers content vertically
            alignItems: 'center' // Centers content horizontally
        }}>
            <h1 style={{ color: '#1D4ED8', marginBottom: '0.5rem' }}>Bitcoin Balance Checker</h1>
            <p style={{ marginBottom: '1rem', maxWidth: '400px' }}>Get your Bitcoin account balance instantly using KeepKey</p>
            <CustomButton onClick={requestBitcoinBalance}>
                Request Bitcoin Balance
            </CustomButton>

            {account && (
                <CustomCard style={{
                    backgroundColor: '#1E293B',
                    color: 'white',
                    padding: '1rem',
                    marginTop: '1rem',
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '0.5rem'
                }}>
                    <img
                        src="https://pioneers.dev/coins/bitcoin.png"
                        alt="Bitcoin Logo"
                        style={{ width: '40px', height: '40px', marginBottom: '1rem' }}
                    />
                    {balance !== null && (
                        <>
                            <p style={{ fontWeight: 'bold', color: '#FBBF24', marginBottom: '0.5rem' }}>Balance:</p>
                            <p style={{ marginBottom: '0.5rem' }}>{formatBalance(balance)} BTC</p>
                            <p style={{ fontWeight: 'bold', color: '#FBBF24', marginBottom: '0.5rem' }}>USD Value:</p>
                            <p>${calculateUSDValue(balance)}</p>
                        </>
                    )}
                </CustomCard>
            )}

            {data && (
                <CustomCard style={{
                    backgroundColor: '#1E293B',
                    color: 'white',
                    padding: '1rem',
                    marginTop: '1rem',
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '0.5rem'
                }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Full Account Data (JSON):</h3>
                    <pre style={{
                        padding: '0.5rem',
                        backgroundColor: '#0F172A',
                        textAlign: 'left',
                        overflowX: 'auto',
                        color: 'white',
                        whiteSpace: 'pre-wrap',
                        borderRadius: '0.375rem'
                    }}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </CustomCard>
            )}

            {error && <p style={{ color: '#DC2626', marginTop: '1rem' }}>{error}</p>}
        </div>
    );
};

export default BitcoinBalance;
