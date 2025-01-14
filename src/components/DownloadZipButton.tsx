import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
const DownloadZipButton = ({ zipName, files }: { zipName: any; files: { name: string; content: string }[] }) => {
    const handleDownloadZip = async () => {
        const zip = new JSZip();

        // Add files to the ZIP
        files.forEach((file) => {
            zip.file(file.name, file.content);
        });

        // Generate the ZIP file
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        // Trigger the download
        saveAs(zipBlob, `${zipName}.zip`);
    };

    return (
        <button onClick={handleDownloadZip} style={{
            padding: '3px 5px',
            backgroundColor: '#b37400',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1em',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease-in-out',
            margin: '10px 10px'
        }}
            title='Download Files as ZIP'>

            <DownloadIcon style={{ marginLeft: '5px' }} />
        </button>
    );
};

export default DownloadZipButton;
