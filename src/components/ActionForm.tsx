import React, { useState } from 'react';
import SliceCodeBox from './SliceCodeBox.tsx';
import ApiActionCodeBox from './ApiActionCodeBox.tsx';
import TypeCodeBox from './TypeCodeBox.tsx';
import ApiCodeBox from './ApiCodeBox.tsx';
import DownloadZipButton from './DownloadZipButton.tsx';

const ActionForm = () => {

    const [panelName, setPanelName] = useState('');
    const [sliceCode, setSliceCode] = useState('');
    const [typeCode, setTypeCode] = useState('');
    const [apiActionCode, setApiActionCode] = useState('');
    const [apiCode, setApiCode] = useState('');
    const camelCase = (str: string): string => {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                index === 0 ? word.toLowerCase() : word.toUpperCase()
            )
            .replace(/\s+/g, ''); // Remove all spaces
    };



    // const handleChange = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    // ) => {
    //     const { name, value, type, checked } = e.target;

    //     // Handle Payload Body auto-setting for POST and PATCH
    //     if (name === 'requestType' && (value === 'post' || value === 'patch')) {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             requestType: value,
    //             payloadBody: true, // Automatically set payloadBody to true
    //         }));
    //     } else {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [name]: type === 'checkbox' ? checked : value,
    //         }));
    //     }
    // };

    const files = [

        {
            name: `${camelCase(panelName)}ApiSlice.ts`,
            content: sliceCode,
        },
        {
            name: `${camelCase(panelName)}ApiTypes.ts`,
            content: typeCode,
        },
        {
            name: `${camelCase(panelName)}Api.ts`,
            content: apiCode,
        },
        {
            name: `${camelCase(panelName)}ApiAction.ts`,
            content: apiActionCode,
        },
    ];
    const [forms, setForms] = useState([
        {
            id: Date.now(),
            reducer: '',
            endpoint: '',
            apiFunctionName: '',
            requestType: 'get', // Default to GET
            dynamicUrl: false, // Default to false
            payloadBody: false, // Default to false
        },
    ]);
    const [expandedForm, setExpandedForm] = useState<number | null>(null); // To manage accordion state

    // const camelCase = (str: string): string => {
    //     return str
    //         .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
    //             index === 0 ? word.toLowerCase() : word.toUpperCase()
    //         )
    //         .replace(/\s+/g, ''); // Remove all spaces
    // };

    const handleChange = (
        id: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setForms((prevForms) =>
            prevForms.map((form) =>
                form.id === id
                    ? {
                        ...form,
                        [name]: type === 'checkbox' ? checked : value,
                        ...(name === 'requestType' &&
                            (value === 'post' || value === 'patch')
                            ? { payloadBody: true } // Automatically set payloadBody to true for POST and PATCH
                            : {}),
                    }
                    : form
            )
        );
    };

    const handleAddForm = () => {
        setForms((prevForms) => [
            ...prevForms,
            {
                id: Date.now(),
                panelName: '',
                reducer: '',
                endpoint: '',
                apiFunctionName: '',
                requestType: 'get',
                dynamicUrl: false,
                payloadBody: false,
            },
        ]);
    };

    const handleRemoveForm = (id: number) => {
        setForms((prevForms) => prevForms.filter((form) => form.id !== id));
    };

    const toggleAccordion = (id: number) => {
        setExpandedForm((prev) => (prev === id ? null : id));
    };
    console.log(forms, '---+++')

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
                <h2 style={{ textAlign: 'center', color: '#007acc' }}>Generated Code
                    <DownloadZipButton zipName={`${panelName}-converted`} files={files} />
                </h2>

                {/* <ApiCodeBox
                        panelName={panelName}
                        forms={forms}
                        apiCode={apiCode}
                        setApiCode={setApiCode}
                    /> */}


                <ApiActionCodeBox
                    panelName={panelName}
                    forms={forms}
                    apiActionCode={apiActionCode}
                    setApiActionCode={setApiActionCode}
                />


                {/* <SliceCodeBox
                       forms={forms}
                        sliceCode={sliceCode}
                        setSliceCode={setSliceCode}
                    /> */}



                {/* <TypeCodeBox
                        forms={forms}
                        typeCode={typeCode}
                        setTypeCode={setTypeCode}
                    /> */}


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
                <div style={{ padding: '20px' }}>
                    <h2 style={{ textAlign: 'center', color: '#007acc' }}>⚡ Convert to Toolkit ⚡ </h2>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        {/* Input Field */}
                        <input
                            placeholder="Panel Name"
                            value={panelName}
                            onChange={(e: any) => setPanelName(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                fontSize: '1em',
                                marginRight: '10px', // Space between input and button
                            }}
                        />

                        {/* Add Button */}
                        <button
                            onClick={handleAddForm}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#188f18',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                fontSize: '1em',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.2s ease-in-out',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            + Add Panel
                        </button>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '20px',
                        overflow: 'auto',
                        maxHeight: '60vh',
                    }}>
                        {forms.map((form) => (
                            <div
                                key={form.id}
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    marginBottom: '10px',
                                    backgroundColor: '#f9f9f9',
                                }}
                            >
                                <div
                                    style={{
                                        padding: '15px',
                                        cursor: 'pointer',
                                        backgroundColor: '#007acc',
                                        color: 'white',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderRadius: '5px',
                                    }}
                                    onClick={() => toggleAccordion(form.id)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {/* Request Type Label */}
                                        <span
                                            style={{
                                                padding: '5px 10px',
                                                backgroundColor: '#ffcc00',
                                                color: '#000',
                                                borderRadius: '5px',
                                                fontWeight: 'bold',
                                                marginRight: '10px',
                                            }}
                                        >
                                            {form.requestType.toUpperCase()}
                                        </span>
                                        {/* API Function Name */}
                                        <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                                            {form.apiFunctionName || 'New API Form'}
                                        </span>
                                    </div>
                                    {/* Chevron Icon */}
                                    <div>
                                        {expandedForm === form.id ? (
                                            <span style={{ fontSize: '1.5em' }}>▲</span> // Open icon
                                        ) : (
                                            <span style={{ fontSize: '1.5em' }}>▼</span> // Closed icon
                                        )}
                                    </div>
                                </div>
                                {expandedForm === form.id && (
                                    <div style={{ padding: '10px' }}>
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor={`panelName-${form.id}`}>Panel Name:</label>
                                                <input
                                                    type="text"
                                                    id={`panelName-${form.id}`}
                                                    name="panelName"
                                                    value={form.panelName}
                                                    onChange={(e) => handleChange(form.id, e)}
                                                    placeholder="Enter panel name"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor={`endpoint-${form.id}`}>Endpoint:</label>
                                                <input
                                                    type="text"
                                                    id={`endpoint-${form.id}`}
                                                    name="endpoint"
                                                    value={form.endpoint}
                                                    onChange={(e) => handleChange(form.id, e)}
                                                    placeholder="Enter API endpoint"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor={`apiFunctionName-${form.id}`}>API Function Name:</label>
                                                <input
                                                    type="text"
                                                    id={`apiFunctionName-${form.id}`}
                                                    name="apiFunctionName"
                                                    value={form.apiFunctionName}
                                                    onChange={(e) => handleChange(form.id, e)}
                                                    placeholder="Enter API function name"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor={`reducer-${form.id}`}>Reducer:</label>
                                                <input
                                                    type="text"
                                                    id={`reducer-${form.id}`}
                                                    name="reducer"
                                                    value={form.reducer}
                                                    onChange={(e) => handleChange(form.id, e)}
                                                    placeholder="Enter reducer name"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor={`requestType-${form.id}`}>Request Type:</label>
                                                <select
                                                    id={`requestType-${form.id}`}
                                                    name="requestType"
                                                    value={form.requestType}
                                                    onChange={(e) => handleChange(form.id, e)}
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
                                                <input
                                                    type="checkbox"
                                                    name="dynamicUrl"
                                                    checked={form.dynamicUrl}
                                                    onChange={(e) => handleChange(form.id, e)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Payload Body:</label>
                                                <input
                                                    type="checkbox"
                                                    name="payloadBody"
                                                    checked={form.payloadBody}
                                                    onChange={(e) => handleChange(form.id, e)}
                                                    disabled={
                                                        form.requestType === 'post' || form.requestType === 'patch'
                                                    }
                                                />
                                            </div>
                                        </form>
                                        <button
                                            onClick={() => handleRemoveForm(form.id)}
                                            style={{ marginTop: '10px', color: 'red' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>


                </div>
            </div>


        </div>
    );
};

export default ActionForm;
