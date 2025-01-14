import React, { useEffect } from 'react';

const SliceCodeBox = ({
  panelName,
  forms,
  sliceCode,
  setSliceCode,
}: {
  panelName: string;
  forms: any[];
  sliceCode: any;
  setSliceCode: any;
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
      // Generate slice code for all forms
      const reducersList = forms
        .map(
          (form) => `
      .addCase(${camelCase(form.apiFunctionName)}.pending, (state) => {
        state.loading = true;
      })
      .addCase(${camelCase(form.apiFunctionName)}.fulfilled, (state, action) => {
        state.loading = false;
        state.${form.reducer} = action.payload;
      })
      .addCase(${camelCase(form.apiFunctionName)}.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      `
        )
        .join('');

      const dynamicCode = `
import { createSlice } from '@reduxjs/toolkit';
import { ${forms
        .map((form) => camelCase(form.apiFunctionName))
        .join(', ')} } from './${camelCase(panelName)}ApiActions';
import { ${panelName}State } from './${camelCase(panelName)}ApiTypes';

const initialState: ${panelName}State = {
  ${forms
    .map((form) => `${form.reducer}: [],`)
    .join('\n  ')}  
  loading: false,
  error: null,
};

const ${camelCase(panelName)}ApiSlice = createSlice({
  name: '${camelCase(panelName)}',
  initialState,
  reducers: {
    clear${panelName}State: (state) => {
      ${forms
        .map(
          (form) => `
      state.${form.reducer} = [];
      `
        )
        .join('')}
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      ${reducersList}
  },
});

export const { clear${panelName}State } = ${camelCase(panelName)}ApiSlice.actions;
export default ${camelCase(panelName)}ApiSlice.reducer;
      `;
      setSliceCode(dynamicCode);
    }
  }, [panelName, forms]);

  return (
    <div>
      <h3>{camelCase(panelName)}ApiSlice.ts</h3>
      <textarea
        value={sliceCode}
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

export default SliceCodeBox;
