import React, { useState, useEffect } from 'react';

const ApiActionCodeBox = ({ panelName, apiFunctionName, endpoint, dynamicUrl, payloadBody }: { 
  panelName: string; 
  apiFunctionName: string; 
  endpoint:string; 
  dynamicUrl:any;
  payloadBody:any;
 }) => {
  const [apiActionCode, setApiActionCode] = useState('');

  const camelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, ''); // Remove all spaces
  };
  useEffect(() => {
    if (panelName && apiFunctionName) {

      // Dynamically generate the API Action code
      const dynamicCode = `
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ${camelCase(apiFunctionName)}Api } from '../../api/${camelCase(panelName)}Api';  

export const ${camelCase(apiFunctionName)} = createAsyncThunk(
  '${endpoint}',  
  async (${dynamicUrl ? 'url: string': ''}${payloadBody ? 'body: any': ''}) => {
    const response = await ${camelCase(apiFunctionName)}Api(${dynamicUrl ? 'url' : ''}${payloadBody ? 'body': ''});  
    return response;
  }
);
`;

      setApiActionCode(dynamicCode); // Set the code to display in the textbox
    }
  }, [panelName, apiFunctionName, endpoint, dynamicUrl, payloadBody]);
  return (
    <div>
      <h3>{camelCase(panelName)}ApiAction.ts</h3>
      <textarea
        value={apiActionCode}
        readOnly
        rows={15}
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
  )
}
export default ApiActionCodeBox;
