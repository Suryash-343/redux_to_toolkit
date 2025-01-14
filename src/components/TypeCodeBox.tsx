import React, { useEffect } from 'react';

const TypeCodeBox = ({
  panelName,
  forms,
  typeCode,
  setTypeCode,
}: {
  panelName: string;
  forms: any[];
  typeCode: string;
  setTypeCode: any;
}) => {
  const camelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, ''); // Remove all spaces
  };

  useEffect(() => {
    // Generate dynamic type code
    if (panelName && forms?.length > 0) {
      const dynamicCode = `
export interface ${camelCase(panelName)}State {
${forms
  .map(
    (form) => `
  ${form.reducer}: any;`
  )
  .join('')}
  loading: boolean;
  error: string | null;
}
      `;
      setTypeCode(dynamicCode);
    }
  }, [panelName, forms]);

  return (
    <div>
      <h3>{camelCase(panelName)}ApiTypes.ts</h3>
      <textarea
        value={typeCode}
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

export default TypeCodeBox;
