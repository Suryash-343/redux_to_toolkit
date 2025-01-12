import React, { useState, useEffect } from 'react';
import SliceCodeBox from './SliceCodeBox.tsx';
import ApiActionCodeBox from './ApiActionCodeBox.tsx';
import TypeCodeBox from './TypeCodeBox.tsx';
import ApiCodeBox from './ApiCodeBox.tsx';

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        alert('Form submitted successfully!');
    };

    const { panelName, apiFunctionName, reducer, endpoint, dynamicUrl, payloadBody, requestType } = formData;

    return (
        <>
        <div className="form-container">
            <h2>Create a New Panel</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
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
                        />
                    </div>
                    <div className="form-row">
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
                            />
                        </div>
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
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="requestType">Request Type:</label>
                            <select
                                id="requestType"
                                name="requestType"
                                value={formData.requestType}
                                onChange={handleChange}
                                required
                            >
                                <option value="get">GET</option>
                                <option value="post">POST</option>
                                <option value="patch">PATCH</option>
                                <option value="put">PUT</option>
                                <option value="delete">DELETE</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Dynamic URL:</label>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    name="dynamicUrl"
                                    checked={formData.dynamicUrl}
                                    onChange={handleChange}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>

                </div>


                <div className="form-row">
                    <div className="form-group">
                        <label>Payload Body:</label>
                        <label className="switch">
                            <input
                                type="checkbox"
                                name="payloadBody"
                                checked={formData.payloadBody}
                                onChange={handleChange}
                                disabled={formData.requestType === 'post' || formData.requestType === 'patch'}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
                {/* <button type="submit" className="submit-button">
          Submit
        </button> */}
            </form>
           
            {/* Pass the panel name and API function name to SliceCodeBox */}
            {panelName && apiFunctionName && reducer && (
                <SliceCodeBox panelName={panelName} apiFunctionName={apiFunctionName} reducer={reducer} />
            )}
            {panelName && apiFunctionName && endpoint && (
                <ApiActionCodeBox
                    panelName={panelName}
                    apiFunctionName={apiFunctionName}
                    endpoint={endpoint}
                    dynamicUrl={dynamicUrl}
                    payloadBody={payloadBody} />
            )}
            {panelName  && endpoint && (
                <TypeCodeBox
                    panelName={panelName}
                    reducer={reducer}
                    />
            )}
            {panelName  && endpoint && (
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
         {/* <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            minHeight: '50vh'
        }}> */}

        {/* </div> */}
        </>
    );
};

export default ActionForm;
