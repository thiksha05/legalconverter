import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css';
import Navbar from './Navbar';
const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);

    setLoading(true); // Set loading state to true before making the request

    try {
      const response = await axios.post('http://localhost:9000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('PDF document uploaded and text extracted successfully.');
      setExtractedText(response.data.text); // Store the extracted text
      setDownloadReady(true); // Enable the download button
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while uploading the PDF.');
    } finally {
      setLoading(false); // Set loading state to false after the request completes
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([extractedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'extracted_text.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
     <div className="upload-container">

        <div className="upload-content ">
          <h2 className="title ">Upload PDF</h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input" />
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
            {loading && <video className="spinner" src="Images\Animation - 1717937230894 (1).mp4" autoPlay loop />}
            {message && <p className="message">{message}</p>}
          </form>
          {downloadReady && (
            <button onClick={handleDownload} className="download-button">
              Download Pdf
            </button>
          )}
        </div>
      </div>
   
  );
};

export default Upload;
