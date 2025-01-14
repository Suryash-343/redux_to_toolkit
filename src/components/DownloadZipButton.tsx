import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const DownloadZipButton = ({ files }: { files: { name: string; content: string }[] }) => {
    const handleDownloadZip = async () => {
        const zip = new JSZip();

        // Add files to the ZIP
        files.forEach((file) => {
            zip.file(file.name, file.content);
        });

        // Generate the ZIP file
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        // Trigger the download
        saveAs(zipBlob, 'project-files.zip');
    };

    return (
        <button onClick={handleDownloadZip} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Download Files as ZIP
        </button>
    );
};

export default DownloadZipButton;
