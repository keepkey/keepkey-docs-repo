import { useState } from 'react';
import { Primitive } from '@radix-ui/react-primitive';
import CustomButton from './CustomButton';
import Confetti from 'react-confetti';

const MayachainSendTransaction = () => {
    const [address, setAddress] = useState('maya10vv88dr88r5llfxr7sxa2wv74sfx5lscql3hxt');
    const [amount, setAmount] = useState('0.01');
    const [loading, setLoading] = useState(false);
    const [txId, setTxId] = useState(null);
    const [error, setError] = useState(null);

    const handleSend = async () => {
        setLoading(true);
        setError(null);
        setTxId(null);

        const txParams = {
            amount: {
                amount: amount,
                decimals: 8,
            },
            asset: {
                chain: 'mayachain',
                symbol: 'CACAO',
                ticker: 'CACAO',
            },
            memo: '',
            recipient: address,
        };

        try {
            const signedTx = await window.keepkey.mayachain.request({
                method: 'transfer',
                params: [txParams],
            });
            setTxId(signedTx.txId); // Assume txId is part of the response
            setLoading(false);
        } catch (err) {
            setError('Transaction failed: ' + err.message);
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#1D4ED8' }}>Send Bitcoin</h1>
            <p style={{ marginBottom: '1rem', color: '#6B7280' }}>Transfer Bitcoin securely using KeepKey</p>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>
                    Recipient Address
                </label>
                <Primitive.input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Bitcoin Cash Address"
                    style={{
                        padding: '0.5rem 1rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '0.375rem',
                        width: '100%',
                        maxWidth: '400px',
                        marginBottom: '1rem',
                    }}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>
                    Amount (CACAO)
                </label>
                <Primitive.input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount (CACAO)"
                    style={{
                        padding: '0.5rem 1rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '0.375rem',
                        width: '100%',
                        maxWidth: '400px',
                        marginBottom: '1rem',
                    }}
                />
            </div>

            <CustomButton onClick={handleSend} disabled={loading || !address || !amount}>
                {loading ? 'Sending...' : 'Send Transaction'}
            </CustomButton>

            {loading && (
                <div style={{ marginTop: '1rem' }}>
                    <p style={{ color: '#1D4ED8' }}>Transaction is being processed...</p>
                    {/* Add any spinner or loading animation here */}
                    <div className="spinner" style={{ margin: 'auto', width: '50px', height: '50px', border: '5px solid #ccc', borderTop: '5px solid #1D4ED8', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                </div>
            )}

            {txId && (
                <>
                    <Confetti />
                    <div style={{ marginTop: '1rem' }}>
                        <p style={{ fontWeight: 'bold', color: '#10B981' }}>Transaction Successful!</p>
                        <p style={{ color: '#374151' }}>Transaction ID: {txId}</p>
                    </div>
                </>
            )}

            {error && <p style={{ color: '#DC2626', marginTop: '1rem' }}>{error}</p>}
        </div>
    );
};

export default MayachainSendTransaction;
