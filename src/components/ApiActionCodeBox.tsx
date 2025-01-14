import React, { useState, useEffect } from 'react';

const ApiActionCodeBox = ({
  panelName,
  forms,
  apiActionCode,
  setApiActionCode,
}: {
  panelName: string;
  forms: any;
  apiActionCode: any;
  setApiActionCode: any;
}) => {
  const camelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, ''); // Remove all spaces
  };

  useEffect(() => {
    if (forms?.length > 0) {
      // Dynamically generate the API Action code for all forms
      const dynamicCode = forms
        .map((form: any) => {
          const functionName = camelCase(form.apiFunctionName);
          return `
export const ${functionName} = createAsyncThunk(
  '${form.endpoint}',
  async (${form.dynamicUrl ? 'url: string' : ''}${
            form.dynamicUrl && form.payloadBody ? ', ' : ''
          }${form.payloadBody ? 'body: any' : ''}) => {
    const response = await ${functionName}Api(${
            form.dynamicUrl ? 'url' : ''
          }${form.dynamicUrl && form.payloadBody ? ', ' : ''}${
            form.payloadBody ? 'body' : ''
          });
    return response;
  }
);
`;
        })
        .join('\n'); // Join all code snippets with a newline

      const completeCode = `
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ${forms
        .map((form: any) => camelCase(form.apiFunctionName))
        .join(', ')}Api } from '../../api/${camelCase(panelName)}Api';

${dynamicCode}
`;
      setApiActionCode(completeCode); // Set the code to display in the textbox
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
  );
};

export default ApiActionCodeBox;
