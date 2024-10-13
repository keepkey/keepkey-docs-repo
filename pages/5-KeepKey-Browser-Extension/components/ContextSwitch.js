import { useState } from 'react';
import CustomButton from './CustomButton';

const ContextSwitch = () => {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const changeContext = async () => {
        if (!window.keepkey || !window.keepkey.bitcoin) {
            setError('KeepKey extension is not available.');
            return;
        }

        try {
            const asset = {
                caip: 'bip122:000000000019d6689c085ae165831e93/slip44:0',
            };

            window.keepkey.sendMessage(
                {
                    action: 'SET_ASSET_CONTEXT',
                    asset,
                },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.error('Error sending message:', chrome.runtime.lastError);
                        setError('Error sending message: ' + chrome.runtime.lastError.message);
                        return;
                    }
                    console.log('SET_ASSET_CONTEXT response:', response);

                    if (response && response.error) {
                        console.error('Error setting asset context:', response.error);
                        setError('Error setting asset context: ' + response.error);
                    } else {
                        console.log('Asset context set successfully:', response);
                        setMessage('Asset context set successfully.');
                    }
                },
            );
        } catch (err) {
            setError('Error changing context: ' + err.message);
        }
    };

    return (
        <div className="container">
            <h1>Set Asset Context</h1>
            <CustomButton onClick={changeContext}>Set Bitcoin Context</CustomButton>

            {message && (
                <div className="message-box">
                    <p>{message}</p>
                </div>
            )}

            {error && (
                <div className="error-box">
                    <p className="error">{error}</p>
                </div>
            )}
        </div>
    );
};

export default ContextSwitch;
