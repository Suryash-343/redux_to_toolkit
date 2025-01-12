import React, { useState, useEffect } from 'react';

const SliceCodeBox = ({ panelName, apiFunctionName, reducer }: { panelName: string; apiFunctionName: string; reducer: string;}) => {
  const [sliceCode, setSliceCode] = useState('');
  const camelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, ''); // Remove all spaces
  }
  
  useEffect(() => {
    // Generate dynamic slice code
    if (panelName && apiFunctionName) {
      const dynamicCode = `
import { createSlice } from '@reduxjs/toolkit';
import { ${apiFunctionName} } from './${camelCase(panelName)}ApiActions';
import { ${panelName}State } from './${camelCase(panelName)}ApiTypes';

const initialState: ${panelName}State = {
  ${reducer}: [],
  loading: false,
  error: null,
};

const ${camelCase(panelName)}ApiSlice = createSlice({
  name: '${camelCase(panelName)}',
  initialState,
  reducers: {
    clear${panelName}State: (state) => {
      state.${reducer} = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(${apiFunctionName}.pending, (state) => {
        state.loading = true;
      })
      .addCase(${apiFunctionName}.fulfilled, (state, action) => {
        state.loading = false;
        state.${reducer} = action.payload;
      })
      .addCase(${apiFunctionName}.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Type assertion
      });
  },
});

export const { clear${panelName}State } = ${camelCase(panelName)}ApiSlice.actions;
export default ${camelCase(panelName)}ApiSlice.reducer;
      `;
      setSliceCode(dynamicCode);
    }
  }, [panelName, apiFunctionName, reducer]);

  return (
    <div>
      <h3>{panelName}ApiSlice.ts</h3>
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
