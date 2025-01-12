import React, { useState, useEffect } from 'react';

const ApiCodeBox = ({
    panelName,
    endpoint,
    requestType,
    apiFunctionName,
    dynamicUrl,
    payloadBody
}: {
    panelName: string;
    endpoint: string;
    requestType: string;
    apiFunctionName: string;
    dynamicUrl: boolean;
    payloadBody: boolean;
}) => {
    const [apiCode, setApiCode] = useState('');

    useEffect(() => {
        if (panelName && endpoint) {
            const dynamicCode = `
import { AxiosError } from 'axios';
import AXIOS from '../config/Axios';
import Prefix from '../config/ApiPrefix';

export const ${apiFunctionName}Api = async (${dynamicUrl ? 'url: string' : ''} ${payloadBody ? 'body: any' : ''}) => {
  try {
      const response = await AXIOS.${requestType}(\`\${Prefix.api}/${endpoint}${dynamicUrl ?`\${url ? url : ''}` : ""}\`);
    return response.data;
  } catch (error: unknown) {
    // Type guard for AxiosError
    console.log('error', error)
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Error fetching data',
      );
    }
    throw new Error('An unexpected error occurred');
  }
};
            `;
            setApiCode(dynamicCode);
        }
    }, [panelName, endpoint, dynamicUrl, apiFunctionName]);

    return (
        <div>
            <h3>{panelName}Api.ts</h3>
            <textarea
                value={apiCode}
                readOnly
                rows={20}
                style={{
                    width: '100%',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
            />
        </div>
    );
};

export default ApiCodeBox;
