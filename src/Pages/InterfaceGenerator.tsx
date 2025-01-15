import React from 'react'

const InterfaceGenerator = () => {
    const generateInterface= (interfaceName: string, json: any): string=> {
        const processObject = (obj: any, indent: number = 2): string => {
          const spaces = ' '.repeat(indent);
          return Object.entries(obj)
            .map(([key, value]) => {
              const valueType = determineType(value, indent);
              return `${spaces}${key}: ${valueType};`;
            })
            .join('\n');
        };
      
        const determineType = (value: any, indent: number = 2): string => {
          if (Array.isArray(value)) {
            if (value.length > 0) {
              return `${determineType(value[0], indent)}[]`; // Infer type of the first element
            } else {
              return 'any[]'; // Fallback for empty arrays
            }
          } else if (typeof value === 'object' && value !== null) {
            return `{\n${processObject(value, indent + 2)}\n${' '.repeat(indent)}}`;
          } else if (typeof value === 'string') {
            return 'string';
          } else if (typeof value === 'number') {
            return 'number';
          } else if (typeof value === 'boolean') {
            return 'boolean';
          } else {
            return 'any'; // Fallback for unsupported or null types
          }
        };
      
        const interfaceBody = processObject(json);
      
        return `export interface ${interfaceName} {\n${interfaceBody}\n}`;
      }
      const jsonResponse= [
        {
            "agent_id": "70004772",
            "session_id": "6c20e7f4ddff",
            "client_name": " Rakshak Smart plan is?"
        },
        {
            "agent_id": "70004772",
            "session_id": "ba282c85f3f9",
            "client_name": "what is the paid-up oPolicy Termion?"
        },
        {
            "agent_id": "70004772",
            "session_id": "c13ed8e4100e",
            "client_name": "Compare Super Investment Plan with Smart Wealth Plus in tabular format"
        },
        {
            "agent_id": "70004772",
            "session_id": "c491c8fb1d7d",
            "client_name": "Prepare a sales pitch for a 30 year old male to sell Rakshak Smart Plan"
        }
    ]
    const data= generateInterface("UserResponse", jsonResponse)
    console.log(data)
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
            backgroundColor: '#f5f5f5',

            padding: '20px',
            borderRight: '1px solid #ddd',
        }}
    >
        <h2 style={{ textAlign: 'center', color: '#007acc' }}>Generated Interface
        </h2>

       
    </div>
    {/* Right Side: Form */}
    <div
        style={{
            flex: 1,
            // padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#032353',

            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: 1,
        }}
    >
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', color: '#007acc' }}>⚡ Generate Interface from API ⚡ </h2>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <input
                    placeholder="Panel Name"
                    // value={panelName}
                    // onChange={(e: any) => setPanelName(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '1em',
                        marginRight: '10px', 
                    }}
                />

                <button
                    // onClick={handleAddForm}
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
            {/* <DownloadZipButton zipName={`${panelName}-converted`} files={files} /> */}

            </div>

           


        </div>
    </div>


</div>
  )
}

export default InterfaceGenerator