import React, { useState } from 'react';
import SliceCodeBox from './SliceCodeBox.tsx';
import ApiActionCodeBox from './ApiActionCodeBox.tsx';
import TypeCodeBox from './TypeCodeBox.tsx';
import ApiCodeBox from './ApiCodeBox.tsx';
import DownloadZipButton from './DownloadZipButton.tsx';

const ActionForm = () => {
    const [formData, setFormData] = useState({
        panelName: '',
        reducer: '',
        endpoint: '',
        apiFunctionName: '',
        requestType: 'get', // Default to GET
        dynamicUrl: false, // Default to false
        payloadBody: false, // Default to false
    });
    const files = [
        {
            name: 'SliceCodeBox.ts',
            content: `// Content of SliceCodeBox.ts\nexport const exampleSlice = {};`,
        },
        {
            name: 'ApiActionCodeBox.ts',
            content: `// Content of ApiActionCodeBox.ts\nexport const apiAction = {};`,
        },
        {
            name: '<Panel>Api.ts',
            content: `// Content of <Panel>Api.ts\nexport const panelApi = {};`,
        },
        {
            name: '<Panel>ApiAction.ts',
            content: `// Content of <Panel>ApiAction.ts\nexport const panelApiAction = {};`,
        },
    ];
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target;

        // Handle Payload Body auto-setting for POST and PATCH
        if (name === 'requestType' && (value === 'post' || value === 'patch')) {
            setFormData((prevData) => ({
                ...prevData,
                requestType: value,
                payloadBody: true, // Automatically set payloadBody to true
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const { panelName, apiFunctionName, reducer, endpoint, dynamicUrl, payloadBody, requestType } = formData;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            {/* Left Side: Code Components */}
            <div
                style={{
                    flex: 2,
                    overflowY: 'auto',
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRight: '1px solid #ddd',
                }}
            >
                <h2 style={{ textAlign: 'center', color: '#007acc' }}>Generated Code <DownloadZipButton files={files}/></h2>
                {panelName && apiFunctionName && reducer && (
                    <SliceCodeBox panelName={panelName} apiFunctionName={apiFunctionName} reducer={reducer} />
                )}
                {panelName && apiFunctionName && endpoint && (
                    <ApiActionCodeBox
                        panelName={panelName}
                        apiFunctionName={apiFunctionName}
                        endpoint={endpoint}
                        dynamicUrl={dynamicUrl}
                        payloadBody={payloadBody}
                    />
                )}
                {panelName && endpoint && (
                    <TypeCodeBox panelName={panelName} reducer={reducer} />
                )}
                {panelName && endpoint && (
                    <ApiCodeBox
                        panelName={panelName}
                        endpoint={endpoint}
                        requestType={requestType}
                        apiFunctionName={apiFunctionName}
                        dynamicUrl={dynamicUrl}
                        payloadBody={payloadBody}
                    />
                )}
            </div>
            {/* Right Side: Form */}
            <div
                style={{
                    flex: 1,
                    // padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    zIndex: 1,
                }}
            >
                <h2 style={{ textAlign: 'center', color: '#007acc' }}>⚡ Convert to Toolkit ⚡</h2>
                <form style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="form-group">
                        <label htmlFor="panelName">Panel Name:</label>
                        <input
                            type="text"
                            id="panelName"
                            name="panelName"
                            value={formData.panelName}
                            onChange={handleChange}
                            placeholder="Enter panel name"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '15px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endpoint">Endpoint:</label>
                        <input
                            type="text"
                            id="endpoint"
                            name="endpoint"
                            value={formData.endpoint}
                            onChange={handleChange}
                            placeholder="Enter API endpoint"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '15px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apiFunctionName">API Function Name:</label>
                        <input
                            type="text"
                            id="apiFunctionName"
                            name="apiFunctionName"
                            value={formData.apiFunctionName}
                            onChange={handleChange}
                            placeholder="Enter API function name"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '15px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reducer">Reducer:</label>
                        <input
                            type="text"
                            id="reducer"
                            name="reducer"
                            value={formData.reducer}
                            onChange={handleChange}
                            placeholder="Enter reducer name"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '15px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="requestType">Request Type:</label>
                        <select
                            id="requestType"
                            name="requestType"
                            value={formData.requestType}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '15px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        >
                            <option value="get">GET</option>
                            <option value="post">POST</option>
                            <option value="patch">PATCH</option>
                            <option value="put">PUT</option>
                            <option value="delete">DELETE</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label>Dynamic URL:</label>
                        <input type="checkbox" name="dynamicUrl" checked={dynamicUrl} onChange={handleChange} />
                    </div>
                    <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label>Payload Body:</label>
                        <input
                            type="checkbox"
                            name="payloadBody"
                            checked={payloadBody}
                            onChange={handleChange}
                            disabled={requestType === 'post' || requestType === 'patch'}
                        />
                    </div>
                </form>
            </div>


        </div>
    );
};

export default ActionForm;
