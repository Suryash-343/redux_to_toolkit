import React, { useState, useEffect } from 'react';

const ApiActionCodeBox = ({ panelName, 
  forms, 
apiActionCode, 
setApiActionCode }: { 
  panelName: string;
  forms:any;
  apiActionCode:any; 
setApiActionCode:any;
 }) => {

  const camelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, ''); // Remove all spaces
  };
  useEffect(() => {
    if (forms) {

      // Dynamically generate the API Action code
      const dynamicCode = `
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ${camelCase(forms[0]?.apiFunctionName)}Api } from '../../api/${camelCase(panelName)}Api';  

export const ${camelCase(forms[0]?.apiFunctionName)} = createAsyncThunk(
  '${forms[0]?.endpoint}',  
  async (${forms[0]?.dynamicUrl ? 'url: string': ''}${forms[0]?.payloadBody ? 'body: any': ''}) => {
    const response = await ${camelCase(forms[0]?.apiFunctionName)}Api(${forms[0]?.dynamicUrl ? 'url' : ''}${forms[0]?.payloadBody ? 'body': ''});  
    return response;
  }
);
`;

      setApiActionCode(dynamicCode); // Set the code to display in the textbox
    }
  }, [panelName, forms]);
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
