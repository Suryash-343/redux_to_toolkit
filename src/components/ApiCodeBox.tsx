import React, { useEffect } from 'react';

const ApiCodeBox = ({
  panelName,
  forms,
  apiCode,
  setApiCode,
}: {
  panelName: string;
  forms: any[];
  apiCode: string;
  setApiCode: any;
}) => {
  const camelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, ''); // Remove all spaces
  };

  useEffect(() => {
    if (panelName && forms?.length > 0) {
      const dynamicCode = `
import { AxiosError } from 'axios';
import AXIOS from '../config/Axios';
import Prefix from '../config/ApiPrefix';

${forms
  .map(
    (form) => `
export const ${camelCase(form.apiFunctionName)}Api = async (${form.dynamicUrl ? 'url: string' : ''}${
            form.dynamicUrl && form.payloadBody ? ', ' : ''
          }${form.payloadBody ? 'body: any' : ''}) => {
  try {
      const response = await AXIOS.${form.requestType}(\`\${Prefix.api}/${
      form.endpoint
    }${form.dynamicUrl ? `\${url ? url : ''}` : ''}\`${
      form.payloadBody ? ', body' : ''
    });
    return response.data;
  } catch (error: unknown) {
    console.log('error', error);
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Error fetching data',
      );
    }
    throw new Error('An unexpected error occurred');
  }
};
`
  )
  .join('\n')}
      `;
      setApiCode(dynamicCode);
    }
  }, [panelName, forms]);

  return (
    <div>
      <h3>{camelCase(panelName)}Api.ts</h3>
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
