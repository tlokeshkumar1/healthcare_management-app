//download.js 
import React, { useState } from 'react';
import axios from 'axios';
import './TopRightButtons.css';
import { Link } from 'react-router-dom';
import "./Footer.css";

const IPFSDownloader = () => {
  const [ipfshash, setIpfshash] = useState('');
  const [downloadedFileName, setDownloadedFileName] = useState('');
  const [FN, setFilename] = useState('');
  const [username, setUsername] = useState('');
  const [filename, setfileName] = useState('');
  const [error, setError] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');

  const checkUsernameExists = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/download?username=${username}`);
  
      if (Array.isArray(response.data) && response.data.length > 0) {
        // If response contains multiple ipfsHash and filename pairs
        const ipfsHashes = response.data.map(item => item.ipfsHash);
        const filenames = response.data.map(item => item.filename);
  
        setIpfsHash(ipfsHashes.join(', '));
        setfileName(filenames.join(', '));
      } else if (response.data && response.data.ipfsHash && response.data.filename) {
        // If response contains a single ipfsHash and filename pair
        setIpfsHash(response.data.ipfsHash);
        setfileName(response.data.filename);
      } else {
        alert("Username does not exist");
      }
    } catch (error) {
      console.error('Error checking username:', error);
      alert("An error occurred while checking username existence.");
    }
  };

  const downloadFromIPFS = async () => {
    try {
      const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfshash}`, {
        responseType: 'arraybuffer',
      });

      // Determine file extension based on content
      const contentType = response.headers['content-type'];
      const contentTypeMap = {
        'application/pdf': 'pdf',
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'video/mp4': 'mp4',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/msword': 'doc',
        'text/plain': 'txt',
        'text/csv': 'csv',
      };
      const fileExtension = contentTypeMap[contentType] || 'txt';

      const fileName = `${FN}.${fileExtension}`;

      // Save the file locally
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setDownloadedFileName(fileName);
      setError('');
    } 
    catch (error) {
      setError(`Error downloading from IPFS: ${error.message}`);
    }
  };

  const backgroundColor = '#da5024';
  return (
    <div style={{ backgroundColor }}>
      <footer className="footer">
        <div className="links-container">
        <Link className="link" to="/home">Home</Link>
        <Link className="link" to="/upload">Upload</Link>
        <Link className="link" to="/">Logout</Link>
        </div>
      </footer>
      <br />
      <center>
        <h1>Download files</h1>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label><br/><br/>
        <button onClick={checkUsernameExists}>check</button>
        {filename && <p>filename: {filename}</p>}
        {ipfsHash && <p>ipfsHash: {ipfsHash}</p>}
        <br /><br />
        <label>
          Assign Filename for save as:
          <input type="text" value={FN} onChange={(e) => setFilename(e.target.value)} />
        </label>
        <br /><br />
        <label>
          IPFS Hash:
          <input type="text" value={ipfshash} onChange={(e) => setIpfshash(e.target.value)} />
        </label>
        <br /><br />
        <button onClick={downloadFromIPFS}>Download from IPFS</button>
        <p style={{ color: 'white' }}>After tapping the "Download" button, wait 10 seconds for the process to complete.</p>
        {downloadedFileName && <p>File downloaded and saved as: {downloadedFileName}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </center>
    </div>
  );
};

export default IPFSDownloader;