import React, { useState } from 'react';
import Loading from './loadingComponent';
import '../styles/fileUpload.css'; 

function Upload() {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCalculate = async () => {
  const formData = new FormData();
  formData.append('xlsxFile', file);

  const apiUrl = process.env.REACT_APP_API_URL 

    try {
      setIsLoading(true);      
      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setDownloadLink(data.downloadLink);

        // Refresh the page after a delay
        setTimeout(() => {
          window.location.reload();
        }, 10000); // Delayed refresh (e.g., 10 seconds) after the setting the download link
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button className="calculate-button" onClick={handleCalculate}>Calculate</button>
      
      {isLoading && <Loading />}

      {downloadLink && (
        <p>
          <a href={downloadLink} download className="download-link">
            Download Calculated File
          </a>
        </p>
      )}
    </div>
  );
}

export default Upload;